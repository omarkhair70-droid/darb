"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback,useEffect,useRef,useState } from "react";
import { gsap } from "gsap";
import type { Locale } from "@/lib/locale";
import type { ReadingPath } from "@/lib/reading-paths";

type Selection={pathId:string;step:number};
type Props={
  lang:Locale;
  paths:ReadingPath[];
  initial:Selection;
};

export function ExperienceAtlas({lang,paths,initial}:Props){
  const [selection,setSelection]=useState<Selection>(initial);
  const panel=useRef<HTMLDivElement>(null);
  const current=paths.find(x=>x.id===selection.pathId)||paths[0];
  const step=Math.max(0,Math.min(selection.step,(current?.steps.length||1)-1));
  const beat=current?.steps[step];
  const ar=lang==="ar";

  const syncAddress=useCallback(()=>{
    const url=new URL(window.location.href);
    const candidate=paths.find(x=>x.id===url.searchParams.get("path"))||paths[0];
    const input=url.searchParams.get("step")||"0";
    const numeric=/^\d+$/.test(input)?Number(input):0;
    const index=Math.max(0,Math.min(Number.isSafeInteger(numeric)?numeric:0,candidate?.steps.length-1||0));
    setSelection({pathId:candidate?.id||"",step:index});
  },[paths]);

  useEffect(()=>{
    window.addEventListener("popstate",syncAddress);
    return ()=>window.removeEventListener("popstate",syncAddress);
  },[syncAddress]);

  const go=useCallback((pathId:string,index:number)=>{
    const path=paths.find(x=>x.id===pathId);
    if(!path)return;
    const selected=Math.max(0,Math.min(index,path.steps.length-1));
    const url=new URL(window.location.href);
    url.searchParams.set("path",path.id);
    url.searchParams.set("step",String(selected));
    window.history.pushState({darbExperience:true},"",url.pathname+url.search);
    window.dispatchEvent(new Event("darb:route-change"));
    setSelection({pathId:path.id,step:selected});
  },[paths]);

  useEffect(()=>{
    const target=panel.current;
    if(!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const ctx=gsap.context(()=>{
      gsap.fromTo("[data-enter]",{autoAlpha:0,y:18},{
        autoAlpha:1,y:0,duration:.48,stagger:.065,ease:"power2.out",overwrite:"auto",
      });
    },target);
    return ()=>ctx.revert();
  },[selection.pathId,selection.step]);

  if(!current||!beat)return <p>{ar?"لا توجد سجلات متاحة.":"No records available."}</p>;
  const {project,insight}=beat;
  const storyBase="/"+lang+"/projects/";
  const currentNumber=String(step+1).padStart(2,"0");
  const totalNumber=String(current.steps.length).padStart(2,"0");

  return <section className="reading-atlas" aria-label={ar?"رحلات قراءة أعمال درب":"Darb reading paths"}>
    <div className="reading-path-selector" role="group" aria-label={ar?"اختر زاوية قراءة":"Choose a reading lens"}>
      {paths.map((path,i)=><button type="button" key={path.id}
        className={path.id===current.id?"reading-path-active":""}
        aria-pressed={path.id===current.id}
        onClick={()=>go(path.id,0)}>
        <small>{String(i+1).padStart(2,"0")}</small>
        <strong>{path.label[lang]}</strong>
      </button>)}
    </div>

    <div className="reading-stage" ref={panel} key={current.id+"-"+step} aria-live="polite" aria-atomic="true">
      <div className="reading-image" data-enter>
        {project.image?
          <Image src={"/media/"+project.image} alt={project.imageAlt?.[lang]||project.title[lang]} fill
            sizes="(max-width: 800px) 100vw, 60vw" priority={step===0}/>:(
          <div className="reading-no-image" role="img" aria-label={project.title[lang]}>
            <span>{ar?"بدون صورة منشورة":"NO PUBLISHED IMAGE"}</span>
            <strong>{project.title[lang]}</strong>
          </div>
        )}
        <div className="reading-source">
          <span>{ar?"المصدر: ملف درب ٢٠٢٦":"SOURCE: DARB 2026 OVERVIEW"}</span>
          <span>{ar?"صفحة":"PAGE"} {project.sourcePage}</span>
        </div>
      </div>
      <div className="reading-narrative">
        <div className="reading-sequence" data-enter>
          <span>{currentNumber} / {totalNumber}</span>
          <span>{project.year}</span>
        </div>
        <p className="reading-proposition" data-enter>{current.proposition[lang]}</p>
        <h2 data-enter>{project.title[lang]}</h2>
        <p className="reading-insight" data-enter>{insight[lang]}</p>
        <p className="reading-context" data-enter>{current.summary[lang]}</p>
        <div className="reading-actions" data-enter>
          <Link href={storyBase+project.slug}>{ar?"افتح السجل الكامل":"Open the full record"} ↗</Link>
          <Link href={"/"+lang+"/archive"}>{ar?"انتقل للفهرس":"Switch to index"} ↗</Link>
        </div>
      </div>
    </div>

    <div className="reading-controls">
      <button type="button" disabled={step===0} onClick={()=>go(current.id,step-1)}>
        <span aria-hidden="true">←</span> {ar?"السابق":"Previous"}
      </button>
      <ol aria-label={ar?"محطات القراءة":"Reading scenes"}>
        {current.steps.map((item,index)=><li key={item.project.slug}>
          <button type="button" aria-current={step===index?"step":undefined}
            aria-label={(ar?"انتقل إلى":"Go to")+" "+item.project.title[lang]}
            onClick={()=>go(current.id,index)}>
            {String(index+1).padStart(2,"0")}
          </button>
        </li>)}
      </ol>
      <button type="button" disabled={step===current.steps.length-1} onClick={()=>go(current.id,step+1)}>
        {ar?"التالي":"Next"} <span aria-hidden="true">→</span>
      </button>
    </div>
    <p className="reading-ethics">
      {ar?"دي مقارنات تحريرية بين برامج مستقلة؛ مش دليل على تعاون بين الفنانين أو تسلسل موحّد للأحداث. الصور والأسماء قيد مراجعة الحقوق والاعتمادات.":
      "These are editorial comparisons between separate programmes, not claims of shared authorship or chronological continuity. Individual artwork and photography credits remain under review."}
    </p>
  </section>;
}
