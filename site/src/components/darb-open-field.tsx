"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect,useRef} from "react";
import {gsap} from "gsap";
import type {Locale} from "@/lib/locale";
import type {Project} from "@/lib/records";

const positions=[
 {slot:"fustat",slug:"tales-of-fustat",no:"01",code:"MAKING"},
 {slot:"inbetween",slug:"inbetween-2025",no:"02",code:"EXHIBITION"},
 {slot:"cinema",slug:"jusoor",no:"03",code:"FILM"},
 {slot:"residency",slug:"natalia-ossef-residency",no:"04",code:"RESIDENCY"},
 {slot:"something",slug:"something-else-2023",no:"05",code:"CONTEMPORARY ART"},
] as const;

export function DarbOpenField({lang,projects}:{lang:Locale;projects:Project[]}){
 const ar=lang==="ar";
 const stage=useRef<HTMLElement>(null);
 useEffect(()=>{
  if(!stage.current)return;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced)return;
  const ctx=gsap.context(()=>{
   gsap.fromTo(".field-piece",
     {y:28,opacity:0,scale:.96},
     {y:0,opacity:1,scale:1,duration:1.15,stagger:{each:.1,from:"random"},ease:"power3.out",clearProps:"transform,opacity"});
   gsap.fromTo(".field-main-signature",
     {yPercent:8,opacity:.1},
     {yPercent:0,opacity:1,duration:1.2,ease:"power2.out"});
  },stage);
  return()=>ctx.revert();
 },[]);
 const move=(event:React.PointerEvent<HTMLElement>)=>{
  if(!stage.current||event.pointerType==="touch"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const rect=stage.current.getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width-.5;
  const y=(event.clientY-rect.top)/rect.height-.5;
  stage.current.style.setProperty("--field-x",String((x*2).toFixed(3)));
  stage.current.style.setProperty("--field-y",String((y*2).toFixed(3)));
 };
 const reset=()=>{stage.current?.style.setProperty("--field-x","0");stage.current?.style.setProperty("--field-y","0");};
 return <section className="darb-open-field" ref={stage} onPointerMove={move} onPointerLeave={reset}
      aria-labelledby="field-name">
   <div className="field-technical-top" aria-hidden="true"><span>CAIRO / 2008 — {ar?"الآن":"PRESENT"}</span><span>{ar?"٥ مداخل / من الأرشيف":"FIVE ENTRIES / THE ARCHIVE"}</span></div>
   <h1 id="field-name" className="field-main-signature" aria-label={ar?"درب ١٧١٨ — فن معاصر وتجارب حية":"Darb 1718 — contemporary art and living practices"}>
      <span className="field-name-ghost">{ar?"درب":"DARB"}</span>
      <span className="field-digits-ghost" dir="ltr">17·18</span>
   </h1>
   <div className="field-orbit" aria-label={ar?"خمسة مسارات لأعمال وبرامج موثقة":"Five documented programmes to enter through"}>
    {positions.map((position,index)=>{
     const project=projects.find(p=>p.slug===position.slug);
     if(!project)return null;
     return <Link key={position.slot} href={"/"+lang+"/projects/"+project.slug}
        className={"field-piece field-piece-"+position.slot}
        aria-label={(ar?"افتح ":"Open ")+project.title[lang]+" — "+project.year}>
       <span className="field-piece-media">
        {project.image?<Image src={"/media/"+project.image} alt={project.imageAlt?.[lang]||project.title[lang]}
          fill priority={index<2} sizes="(max-width:700px) 65vw, (max-width:1100px) 32vw, 33vw"/>:
          <span className="field-no-image">{project.title[lang]}</span>}
       </span>
       <span className="field-piece-index" dir="ltr">{position.no} / {position.code}</span>
       <span className="field-piece-name">{project.title[lang]} <span aria-hidden="true">↗</span></span>
       <span className="field-piece-provenance">DARB / {project.year} · PDF {String(project.sourcePage).padStart(2,"0")}</span>
      </Link>;
    })}
   </div>
   <div className="field-axis field-axis-vertical" aria-hidden="true">EXPERIMENT / FILM / MATERIAL / PEOPLE</div>
   <div className="field-end">
     <div className="field-end-intro">
      <span className="field-tick" aria-hidden="true">✳</span>
      <p>{ar?"الفن مش صورة واحدة. ومش طريق واحد.":"Not one image. Not one way in."}</p>
     </div>
     <a href="#practice" className="field-descend">{ar?"انزل جوّا درب":"MOVE THROUGH DARB"} <span aria-hidden="true">↓</span></a>
     <span className="field-source-label">{ar?"وثائق أصلية / ملف المؤسسة ٢٠٢٦":"ORIGINAL MATERIAL / OVERVIEW 2026"}</span>
   </div>
 </section>;
}
