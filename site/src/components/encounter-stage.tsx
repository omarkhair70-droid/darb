"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useRef,useState } from "react";
import {gsap} from "gsap";
import type {Locale} from "@/lib/locale";
import {encounters} from "@/content/encounter-material";

type Encounter = (typeof encounters)[number];

export function EncounterStage({lang}:{lang:Locale}) {
 const ar=lang==="ar";
 const [active,setActive]=useState(0);
 const pane=useRef<HTMLDivElement>(null);
 const ready=useRef(false);
 const material:Encounter=encounters[active];

 useEffect(()=>{
   if(!ready.current){ready.current=true;return;}
   if(!pane.current||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
   const ctx=gsap.context(()=>{
     gsap.fromTo(".encounter-object,.encounter-inscription",
       {autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:0.32,ease:"power2.out",stagger:0.05});
   },pane);
   return ()=>ctx.revert();
 },[active]);

 const advance=(index:number)=>setActive(Math.max(0,Math.min(index,encounters.length-1)));
 return <section className="encounter-shell" aria-label={ar?"أعمال ومشاهد من أرشيف درب":"Darb archive encounters"}>
   <div className="encounter-orientation">
     <div className="encounter-current"><span className="meta-label">DARB / SOURCE ROOM</span>
       <h1>{ar?"مساحة للأعمال، مش مجرد صور.":"An encounter with Darb."}</h1>
       <p>{ar?"ابدأ من المادة نفسها. اختار مشهدًا، شوف مصدره، وافتح سياقه.":"Begin with the material. Select a scene, look, then enter its documented context."}</p>
     </div>
     <div className="encounter-choice" role="group" aria-label={ar?"اختيار مشهد":"Select an encounter"}>
       {encounters.map((item,i)=><button type="button" key={item.id}
         className={active===i?"encounter-choice-active":""} aria-pressed={active===i}
         onClick={()=>advance(i)}>
         <span className="encounter-num">{String(i+1).padStart(2,"0")}</span>
         <span className="encounter-choice-name">{item.title[lang]}</span>
         <span className="encounter-choice-type">{item.context}</span>
       </button>)}
     </div>
   </div>
   <div className="encounter-stage" ref={pane} aria-live="polite" aria-atomic="true">
      <div className="encounter-object" key={material.id}>
        <Image src={"/media/"+material.image} alt={material.alt[lang]}
           fill priority={active===0} sizes="(max-width: 800px) 100vw, 70vw"
           className="encounter-object-image"/>
      </div>
      <aside className="encounter-inscription" key={"meta-"+material.id}>
        <div className="encounter-index"><span>{String(active+1).padStart(2,"0")} / 03</span><span>{material.context}</span></div>
        <div className="encounter-words">
           <p className="encounter-medium">{material.medium[lang]}</p>
           <h2>{material.title[lang]}</h2>
           <p>{material.note[lang]}</p>
        </div>
        <div className="encounter-provenance">
          <p>{ar?"ملف درب ٢٠٢٦":"DARB OVERVIEW 2026"} · {ar?"ص":"P."}{material.page}</p>
          <p>{material.dimensions} px</p>
          <p>{ar?"نسب الصور والأعمال قيد المراجعة":"PHOTO / ART CREDITS UNDER REVIEW"}</p>
          {material.slug?
            <Link href={"/"+lang+"/projects/"+material.slug}>{ar?"استكشف المعرض والسياق":"Enter exhibition context"} ↗</Link>:
            <Link href={"/"+lang+"/archive"}>{ar?"ابحث عن مشاريع درب":"Explore the indexed programmes"} ↗</Link>}
        </div>
      </aside>
   </div>
   <div className="encounter-footer">
      <div className="encounter-counter">{ar?"المشاهد":"SCENES"} <span>0{active+1} / 03</span></div>
      <div className="encounter-stepper">
        <button type="button" disabled={active===0} onClick={()=>advance(active-1)}>{ar?"السابق":"Previous"} <span aria-hidden="true">←</span></button>
        <button type="button" disabled={active===encounters.length-1} onClick={()=>advance(active+1)}>{ar?"التالي":"Next"} <span aria-hidden="true">→</span></button>
      </div>
      <Link href={"/"+lang+"/archive"} className="encounter-index-link">{ar?"افتح الفهرس كامل":"Open the index"} ↗</Link>
   </div>
 </section>;
}
