"use client";
import Link from "next/link";
import Image from "next/image";
import {useCallback,useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {referenceObjects} from "@/content/reference-lab-objects";
import type {Locale} from "@/lib/locale";

type Mode="explore"|"research";
type Item=(typeof referenceObjects)[number];
type Props={lang:Locale};

function validMode(v:string|null):Mode{return v==="research"?"research":"explore";}
function initialId(v:string|null):string{return referenceObjects.some(o=>o.id===v)?v!:referenceObjects[0].id;}
export function OculiMethodLab({lang}:Props){
 const ar=lang==="ar";
 const [mode,setMode]=useState<Mode>("explore");
 const [focus,setFocus]=useState<string>(referenceObjects[0].id);
 const [filter,setFilter]=useState("");
 const [opened,setOpened]=useState(false);
 const [reduced,setReduced]=useState(false);
 const stage=useRef<HTMLDivElement>(null);
 const camera=useRef<HTMLDivElement>(null);
 const previous=useRef<{mode:Mode;focus:string}>({mode:"explore",focus:referenceObjects[0].id});
 const lastWheel=useRef(0);
 const selected=referenceObjects.find(x=>x.id===focus)||referenceObjects[0];
 const selectedIndex=referenceObjects.findIndex(x=>x.id===selected.id);

 useEffect(()=>{
  const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateMotion=()=>setReduced(mq.matches);
  updateMotion(); mq.addEventListener("change",updateMotion);
  return ()=>mq.removeEventListener("change",updateMotion);
 },[]);

 const sync=useCallback(()=>{
   const p=new URLSearchParams(window.location.search);
   setMode(validMode(p.get("mode")));
   setFocus(initialId(p.get("object")));
   setOpened(p.get("open")==="1");
 },[]);
 useEffect(()=>{
  sync();
  window.addEventListener("popstate",sync);
  return ()=>window.removeEventListener("popstate",sync);
 },[sync]);

 const route=useCallback((target:Mode,id:string,open:boolean=false)=>{
   const u=new URL(window.location.href);
   u.searchParams.set("mode",target);
   u.searchParams.set("object",id);
   if(open)u.searchParams.set("open","1");else u.searchParams.delete("open");
   window.history.pushState({lab:"spatial"},"",u.pathname+u.search);
   setMode(target);setFocus(id);setOpened(open);
 },[]);

 const step=useCallback((n:number)=>{
   const i=(selectedIndex+n+referenceObjects.length)%referenceObjects.length;
   route(mode,referenceObjects[i].id,false);
 },[selectedIndex,mode,route]);

 useEffect(()=>{
   if(previous.current.mode===mode && previous.current.focus===focus)return;
   if(!camera.current || reduced){previous.current={mode,focus};return;}
   const ctx=gsap.context(()=>{
     gsap.fromTo("[data-lab-enter]",{autoAlpha:0,y:15},{
       autoAlpha:1,y:0,duration:.45,stagger:.07,ease:"power2.out",overwrite:"auto"
     });
   },stage);
   previous.current={mode,focus};
   return ()=>ctx.revert();
 },[focus,mode,reduced]);

 const onMove=(e:React.PointerEvent<HTMLDivElement>)=>{
   if(reduced||!camera.current||e.pointerType==="touch")return;
   const rect=e.currentTarget.getBoundingClientRect();
   const px=((e.clientX-rect.left)/rect.width-.5)*2;
   const py=((e.clientY-rect.top)/rect.height-.5)*2;
   camera.current.style.setProperty("--px",String(px));
   camera.current.style.setProperty("--py",String(py));
 };
 const onWheel=(e:React.WheelEvent<HTMLDivElement>)=>{
  if(mode!=="explore"||opened||Math.abs(e.deltaY)<14)return;
  const now=Date.now();
  if(now-lastWheel.current<750)return;
  lastWheel.current=now;
  step(e.deltaY>0?1:-1);
 };
 const visible=referenceObjects.filter(o=>
   [o.title.ar,o.title.en,o.kind,String(o.page)].some(v=>v.toLowerCase().includes(filter.toLowerCase()))
 );

 return <div className="ref-lab" ref={stage}>
  <div className="lab-instructions" aria-label={ar?"معلومات الدراسة":"Study identification"}>
   <Link className="lab-exit" href={"/"+lang+"/lab"}>{ar?"← كل المختبرات":"← All research labs"}</Link>
   <div className="lab-identity"><span>R&D / REFERENCE LAB 01</span><strong>{ar?"دراسة التنقّل المكاني":"Spatial navigation study"}</strong></div>
   <span className="lab-disclaimer">{ar?"مختبر داخلي — مش تصميم درب":"INTERNAL STUDY / NOT DARB DESIGN"}</span>
  </div>

  <div className="lab-modes" role="group" aria-label={ar?"طريقة العرض":"View mode"}>
   <button type="button" aria-pressed={mode==="explore"} onClick={()=>route("explore",selected.id,false)}>
     <span>01</span>{ar?"استكشف":"Explore"}
   </button>
   <button type="button" aria-pressed={mode==="research"} onClick={()=>route("research",selected.id,false)}>
     <span>02</span>{ar?"ابحث":"Research"}
   </button>
  </div>

  {mode==="explore"?<section className="lab-viewport" aria-label={ar?"فضاء الوثائق":"Spatial archive field"} tabIndex={0}
      onPointerMove={onMove} onPointerLeave={()=>{camera.current?.style.setProperty("--px","0");camera.current?.style.setProperty("--py","0");}}
      onWheel={onWheel} onKeyDown={e=>{if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();step(1);}
       if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();step(-1);}
       if(e.key==="Enter"){e.preventDefault();route(mode,selected.id,true);}}}>
    <div className="lab-viewport-horizon" aria-hidden="true"/>
    <div className="lab-atmosphere" aria-hidden="true"/>
    <div className="lab-camera" ref={camera}>
       {referenceObjects.map((obj,i)=>{
         const x=obj.x-selected.x;
         const y=obj.y-selected.y;
         const z=obj.z-selected.z-(obj.id===focus?0:160);
         const distant= Math.abs(i-selectedIndex)>3;
         const visual={transform:"translate3d(calc(-50% + "+x+"px),calc(-50% + "+y+"px),"+z+"px) rotateY("+obj.turn+"deg)",
           zIndex:obj.id===focus?12:referenceObjects.length-i} as React.CSSProperties;
         return <button key={obj.id} type="button" className={"lab-object"+(obj.id===focus?" lab-object-focus":"")}
           aria-pressed={obj.id===focus} aria-label={(ar?"اختر ":"Select ")+obj.title[lang]}
           style={visual} onClick={()=>obj.id===focus?route("explore",obj.id,true):route("explore",obj.id,false)}>
           <span className="lab-object-frame">
             <Image src={"/media/"+obj.image} alt="" fill sizes="(max-width:650px) 40vw, 420px" priority={i===0}/>
           </span>
           <span className="lab-object-identity"><small>{String(i+1).padStart(2,"0")} / {obj.kind}</small><strong>{obj.title[lang]}</strong></span>
         </button>;
       })}
    </div>
    <div className="lab-position" data-lab-enter>
      <span>{String(selectedIndex+1).padStart(2,"0")} — {String(referenceObjects.length).padStart(2,"0")}</span>
      <strong>{selected.title[lang]}</strong>
      <p>{ar?"اختار صورة في الفضاء، أو استخدم الأسهم والتمرير. اضغط المختارة لفتح سياقها.":"Select any object in space, use arrow keys or wheel. Click the focused object for its source."}</p>
      <div className="lab-position-actions">
       <button type="button" onClick={()=>step(-1)} aria-label={ar?"المادة السابقة":"Previous object"}>←</button>
       <button type="button" onClick={()=>route("explore",selected.id,true)}>{ar?"المصدر والسياق":"Context & source"} ↗</button>
       <button type="button" onClick={()=>step(1)} aria-label={ar?"المادة التالية":"Next object"}>→</button>
      </div>
    </div>
    <div className="lab-axis" aria-hidden="true">{selected.kind} / PDF {selected.page}</div>
   </section>:
   <section className="lab-research" aria-label={ar?"فهرس بحث":"Research index"}>
    <div className="lab-research-head"><div><span>RESEARCH / SAME SOURCE OBJECTS</span>
      <h1>{ar?"نفس المواد. طريقة ثانية.":"Same objects. Different mode."}</h1>
      <p>{ar?"جرّب تبديل وضع العرض: هوية كل مادة ورابطها بيظلوا ثابتين.":"Switch back to Explore: objects share IDs, source labels, and URLs."}</p></div>
      <label>{ar?"ابحث":"Search"}<input value={filter} onChange={e=>setFilter(e.target.value)} placeholder={ar?"اسم / نوع / صفحة":"Title / kind / page"} /></label>
    </div>
    <ol className="lab-research-list">{visible.map(obj=><li key={obj.id}>
      <button type="button" onClick={()=>route("explore",obj.id,true)}>
        <span>{String(referenceObjects.indexOf(obj)+1).padStart(2,"0")}</span>
        <span className="lab-research-thumb"><Image src={"/media/"+obj.image} alt="" fill sizes="110px"/></span>
        <strong>{obj.title[lang]}</strong><small>PDF {obj.page} / {obj.kind}</small><span aria-hidden="true">↗</span>
      </button>
    </li>)}</ol>
    {!visible.length&&<p role="status">{ar?"لا توجد نتائج":"No matching objects"}</p>}
   </section>}
  {opened&&<div className="lab-overlay" role="dialog" aria-modal="true" aria-label={ar?"سجل المصدر":"Source context"}>
   <div className="lab-overlay-backdrop" onClick={()=>route(mode,selected.id,false)} />
   <div className="lab-overlay-panel" data-lab-enter>
    <button type="button" className="lab-close" onClick={()=>route(mode,selected.id,false)}>{ar?"إغلاق":"Close"} ×</button>
    <span>{selected.kind} · PDF P.{selected.page}</span>
    <h2>{selected.title[lang]}</h2>
    <figure><Image src={"/media/"+selected.image} alt="" width={500} height={340} style={{objectFit:"contain"}}/></figure>
    <p>{selected.context[lang]}</p>
    <p className="lab-rights">{ar?"حقوق واعتمادات الصور الفردية قيد المراجعة. دي مواد بحثية من ملف المؤسسة.":"Individual photo/art rights and credits await verification. These are source-document excerpts."}</p>
    {selected.slug?<Link href={"/"+lang+"/projects/"+selected.slug}>{ar?"اذهب للسجل الموثق":"Open documented record"} ↗</Link>:<Link href={"/"+lang+"/archive"}>{ar?"افتح فهرس البرامج":"Open archive index"} ↗</Link>}
   </div>
  </div>}
  <div className="lab-bottom-line"><span>MECHANIC: CSS PERSPECTIVE + DOM + URL STATE</span>
    <span>{ar?"العلاقة بالمراجع: Oculi Mundi / Fabrique × Q42":"REFERENCE METHOD: OCULI MUNDI / FABRIQUE × Q42"}</span>
    <a target="_blank" rel="noopener noreferrer" href="https://engineering.q42.nl/oculi-mundi/">{ar?"كيف بنوها":"Maker's engineering notes"} ↗</a>
  </div>
 </div>;
}
