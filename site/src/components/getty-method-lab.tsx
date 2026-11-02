"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {gettyTraces} from "@/content/getty-method-traces";
import type {Locale} from "@/lib/locale";

const traceIds=gettyTraces.map(x=>x.id);
type TraceId=(typeof traceIds)[number];
const curve="M 84 534 C 263 657 380 170 534 233 S 784 588 913 188";
const spots=[{x:11,y:68},{x:42,y:29},{x:68,y:66},{x:88,y:23}];
function clamp(v:number){return Math.min(1,Math.max(0,v));}

export function GettyMethodLab({lang}:{lang:Locale}){
 const ar=lang==="ar";
 const root=useRef<HTMLDivElement>(null);
 const path=useRef<SVGPathElement>(null);
 const field=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const [motion,setMotion]=useState(false);
 const progress=useRef(0);
 const activeRef=useRef(0);
 const itemRefs=useRef<Array<HTMLDivElement|null>>([]);
 const scroller=useRef<ScrollTrigger|null>(null);
 const chosen=gettyTraces[active];

 useEffect(()=>{
   gsap.registerPlugin(ScrollTrigger);
   const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
   const setReduced=()=>setMotion(reduced.matches);
   setReduced();
   reduced.addEventListener("change",setReduced);
   return ()=>reduced.removeEventListener("change",setReduced);
 },[]);

 useEffect(()=>{
   const container=root.current;
   if(!container)return;
   let frame=0;
   const tick=(p:number)=>{
      const fraction=clamp(p);
      progress.current=fraction;
      const idx=Math.min(3,Math.floor(fraction*4+0.02));
      if(activeRef.current!==idx){
         activeRef.current=idx;setActive(idx);
      }
      if(path.current){
         const len=path.current.getTotalLength();
         gsap.set(path.current,{strokeDasharray:len,strokeDashoffset:len*(1-fraction)});
      }
      // Each object has a different weight. The meaning progresses through
      // the known film -> filmmaker -> Jusoor -> institution PDF relation.
      itemRefs.current.forEach((node,i)=>{
       if(!node)return;
       const distance=Math.abs(i-fraction*3);
       gsap.set(node,{
         x:Math.sin(fraction*Math.PI*1.8+i*.6)*18,
         y:(i-fraction*3)*-8,
         scale:1.11-.16*Math.min(distance,2),
         opacity:Math.max(.33,1-distance*.21),
         rotation:(i%2===0?-1:1)*Math.min(distance,3)*2,
       });
      });
      if(field.current)field.current.style.setProperty("--phase",String(fraction));
   };
   tick(0);
   const context=gsap.context(()=>{
     const st=ScrollTrigger.create({
       trigger:container,
       start:"top top",end:"bottom bottom",scrub:.65,
       onUpdate:self=>{if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>tick(self.progress));},
       onRefresh:self=>tick(self.progress)
     });
     scroller.current=st;
   },container);
   const refresh=()=>ScrollTrigger.refresh();
   window.addEventListener("load",refresh);
   const timeout=window.setTimeout(refresh,200);
   return ()=>{
     if(frame)cancelAnimationFrame(frame);
     window.clearTimeout(timeout);
     window.removeEventListener("load",refresh);
     scroller.current=null;
     context.revert();
   };
 },[]);

 const seek=(id:TraceId)=>{
   const target=document.getElementById("getty-beat-"+id);
   if(!target)return;
   const u=new URL(window.location.href);
   u.hash=id;
   window.history.pushState({gettyLab:id},"",u.pathname+u.search+u.hash);
   target.scrollIntoView({behavior:motion?"instant":"smooth",block:"start"});
 };
 // The documents are accessible without any JS-driven scroll or images.
 // A fragment link always points to the real semantic section.
 return <div className="gt-lab" ref={root}>
   <div className="gt-reading-head">
     <Link href={"/"+lang+"/lab"}>{ar?"← كل المختبرات":"← All research labs"}</Link>
     <span>RESEARCH / LAB 02 <b>GETTY METHOD</b></span>
     <Link href={"/"+lang+"/archive"}>{ar?"فهرس درب":"Darb index"} ↗</Link>
   </div>
   <div className="gt-story">
    <div className="gt-sticky">
      <div className="gt-wordmark" aria-hidden="true">DARB / R&D</div>
      <div className="gt-guide">
        <span>02 / REFERENCE ANATOMY</span>
        <p>{ar?"من الفيلم لصاحبته، للبرنامج، للمصدر. التمرير يوضح العلاقة؛ مش بيخترعها.":"From the film to its maker, programme and source. The movement follows evidence — it doesn't invent it."}</p>
      </div>
      <div className="gt-spline" ref={field} aria-hidden="true">
        <svg viewBox="0 0 1000 740" preserveAspectRatio="xMidYMid meet">
          <path d={curve} stroke="#dedfdc" strokeWidth="2" fill="none" opacity=".58"/>
          <path ref={path} d={curve} stroke="#413d3a" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
        </svg>
        {gettyTraces.map((t,i)=><div
            key={t.id}
            ref={el=>{itemRefs.current[i]=el;}}
            className={"gt-artifact gt-artifact-"+t.id+(active===i?" gt-artifact-selected":"")}
            style={{left:spots[i].x+"%",top:spots[i].y+"%"}}>
           {t.id==="film"?<div className="gt-artifact-film"><span>DOCUMENTARY / <b>01</b></span><strong>{t.title[lang]}</strong><small>{ar?"الحرفة والهوية":"CRAFT / IDENTITY"}</small></div>:null}
           {t.id==="maker"?<div className="gt-artifact-maker"><span>BY /</span><strong>{t.title[lang]}</strong><small>FILMMAKER · RESEARCHER</small></div>:null}
           {t.id==="programme"?<div className="gt-artifact-programme">
              <span>JUSOOR / DARB</span>
              <div className="gt-artifact-mark"><Image src="/media/pdf_image_0379.png" width={250} height={250} alt="" sizes="(max-width:700px) 115px, 205px"/></div>
              <small>ORIGINAL PROGRAMME PDF · 09</small>
            </div>:null}
           {t.id==="source"?<div className="gt-artifact-source">
             <span>DOCUMENT / 2026</span><strong>09</strong><small>INSTITUTIONAL OVERVIEW</small>
            </div>:null}
          </div>)}
        <span className="gt-path-caption">FILM → PERSON → PROGRAMME → SOURCE</span>
      </div>
      <nav className="gt-rail" aria-label={ar?"محطات المسار":"Story chapters"}>
       {gettyTraces.map((t,i)=><a key={t.id} href={"#"+t.id}
          aria-current={active===i?"step":undefined}
          onClick={e=>{e.preventDefault();seek(t.id);}}>
         <span>{t.number}</span>
         <span className="gt-rail-name">{t.label[lang]}</span>
       </a>)}
      </nav>
      <div className="gt-counter" aria-live="polite"><span>{chosen.number} / 04</span><strong>{chosen.label[lang]}</strong></div>
      <div className="gt-scroll-cue">↓ {ar?"مرّر لاكتشاف العلاقة":"SCROLL TO FOLLOW THE RECORD"}</div>
    </div>
    <div className="gt-beats">
      {gettyTraces.map((t,i)=><section
          key={t.id}
          className="gt-beat"
          id={"getty-beat-"+t.id}
          aria-labelledby={"getty-heading-"+t.id}
          data-graph-edge={t.id}>
        <div className="gt-beat-copy">
         <span className="gt-beat-label">{t.number} / {t.kind} — {t.evidence}</span>
         <h1 id={"getty-heading-"+t.id} className={i===0?"gt-opening":undefined}>{t.title[lang]}</h1>
         <p className="gt-beat-deck">{t.intro[lang]}</p>
         <div className="gt-beat-edge">
           <span>{t.relationship[lang]}</span>
           {i<3?<strong>{gettyTraces[i+1].title[lang]}</strong>:<strong>{ar?"نهاية السجل المتحقق":"No further factual edge"}</strong>}
         </div>
         <Link href={"/"+lang+t.link}>{t.linkLabel[lang]} ↗</Link>
         <p className="gt-beat-caution">{t.kindHint[lang]}</p>
        </div>
      </section>)}
    </div>
   </div>
   <footer className="gt-notes">
    <strong>{ar?"مختبر لتقنية السرد، مش التصميم المعتمد لدرب":"A motion-research reconstruction, not Darb's approved website"}</strong>
    <p>{ar?"الصور الأصلية لGetty مش مستخدمة هنا. المسار والأرقام والحركة من تنفيذنا، مستلهمين من شرح Getty/Resn، مش نسخة من كودهم.":"No Getty artwork is reused. Motion measurements and visual path are our own reconstruction from publicly described principles, not their source code."}</p>
    <a href="https://www.commarts.com/project/38649/tracing-art" target="_blank" rel="noopener noreferrer">GETTY / RESN — MAKER CASE STUDY ↗</a>
   </footer>
 </div>;
}
