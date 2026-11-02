"use client";
import Image from "next/image";
import Link from "next/link";
import {useCallback,useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import type {Locale} from "@/lib/locale";

type Stage="threshold"|"look"|"context";
type Mode="guided"|"free";
type Focus={x:number;y:number};

const prompts=[
 {ar:"إيه أول تفصيلة عينك وقفت عندها؟ جرّب تلاحظها قبل ما تقرأ أي شرح.",en:"Where does your eye settle first? Notice it before reading any explanation."},
 {ar:"الصورة دي وثيقة لمعرض. إيه اللي شايفه من الأعمال، وإيه اللي جاي من طريقة تصويرها وعرضها؟",en:"This is an exhibition photograph. What can you see of the works, and what comes from their display or documentation?"},
 {ar:"الصورة لا تخبرنا بكل شيء. إيه المعلومات اللي محتاجها قبل ما تنسب عملًا لفنان أو تستنتج حجمه ومعناه؟",en:"This photograph cannot tell the full story. What evidence would you need to attribute a work, understand its scale or interpret its meaning?"}
] as const;

function readStage(s:string|null):Stage{return s==="look"||s==="context"?s:"threshold";}
function readMode(s:string|null):Mode{return s==="free"?"free":"guided";}
function cap(n:number,min:number,max:number){return Math.min(max,Math.max(min,n));}

export function ImaginariumMethodLab({lang}:{lang:Locale}){
 const ar=lang==="ar";
 const root=useRef<HTMLDivElement>(null);
 const viewer=useRef<HTMLDivElement>(null);
 const [stage,setStage]=useState<Stage>("threshold");
 const [mode,setMode]=useState<Mode>("guided");
 const [index,setIndex]=useState(0);
 const [scale,setScale]=useState(1);
 const [origin,setOrigin]=useState<Focus>({x:50,y:50});
 const [reduce,setReduce]=useState(false);
 const [compare,setCompare]=useState(false);
 const [hydrated,setHydrated]=useState(false);

 const readURL=useCallback(()=>{
   const q=new URLSearchParams(window.location.search);
   setStage(readStage(q.get("stage")));
   setMode(readMode(q.get("mode")));
   setIndex(cap(Number(q.get("prompt"))||0,0,prompts.length-1));
   setHydrated(true);
 },[]);
 useEffect(()=>{
   readURL();
   window.addEventListener("popstate",readURL);
   return ()=>window.removeEventListener("popstate",readURL);
 },[readURL]);
 useEffect(()=>{
   const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
   const sync=()=>setReduce(mq.matches);
   sync(); mq.addEventListener("change",sync);
   return()=>mq.removeEventListener("change",sync);
 },[]);
 const navigate=useCallback((s:Stage,m:Mode=mode,p:number=index)=>{
   const url=new URL(window.location.href);
   url.searchParams.set("stage",s);
   url.searchParams.set("mode",m);
   url.searchParams.set("prompt",String(cap(p,0,prompts.length-1)));
   window.history.pushState({lab:"imaginarium",stage:s},"",url.pathname+url.search);
   setStage(s);setMode(m);setIndex(cap(p,0,prompts.length-1));
 },[index,mode]);

 useEffect(()=>{
   if(!hydrated||reduce||!root.current)return;
   const ctx=gsap.context(()=>{
     gsap.fromTo(".ig-active-copy",{autoAlpha:.88,y:10},{
       autoAlpha:1,y:0,duration:.55,ease:"power2.out",stagger:.06,overwrite:"auto"
     });
   },root);
   return()=>ctx.revert();
 },[stage,index,reduce,hydrated]);

 const zoom=(next:number)=>setScale(cap(Math.round(next*10)/10,1,1.6));
 const point=(event:React.MouseEvent<HTMLDivElement>)=>{
   if(stage!=="look"||scale===1)return;
   const r=event.currentTarget.getBoundingClientRect();
   setOrigin({x:cap(100*(event.clientX-r.left)/r.width,5,95),y:cap(100*(event.clientY-r.top)/r.height,5,95)});
 };
 const keyView=(event:React.KeyboardEvent<HTMLDivElement>)=>{
   if(stage!=="look")return;
   if(event.key==="+"||event.key==="="){event.preventDefault();zoom(scale+.2);}
   if(event.key==="-"){event.preventDefault();zoom(scale-.2);}
   if(event.key==="ArrowRight"){event.preventDefault();setOrigin(o=>({...o,x:cap(o.x+10,5,95)}));}
   if(event.key==="ArrowLeft"){event.preventDefault();setOrigin(o=>({...o,x:cap(o.x-10,5,95)}));}
 };
 const sourceImage="/media/pdf_image_0360.jpeg";
 const contextImage="/media/pdf_image_0359.jpeg";
 return <div className={"ig-lab ig-stage-"+stage} ref={root}>
   <nav className="ig-nav" aria-label={ar?"التنقل داخل المختبر":"Laboratory navigation"}>
     <Link href={"/"+lang+"/lab/getty-method"}>{ar?"← المختبر السابق":"← Previous study"}</Link>
     <span className="ig-lab-brand">DARB <b>/ R&D 03</b></span>
     <Link href={"/"+lang+"/archive"}>{ar?"أرشيف درب":"Darb archive"} ↗</Link>
   </nav>

   {stage==="threshold"&&<section className="ig-threshold" aria-labelledby="ig-entry-title">
     <div className="ig-ambient ig-ambient-a" aria-hidden="true"/>
     <div className="ig-ambient ig-ambient-b" aria-hidden="true"/>
     <div className="ig-ambient ig-ambient-c" aria-hidden="true"/>
     <div className="ig-entry-meta ig-active-copy"><span>03 / SLOW LOOKING</span><span>INBETWEEN · PDF 07 · 2025</span></div>
     <div className="ig-portal" aria-hidden="true">
       <div className="ig-portal-shape"><Image src={sourceImage} alt="" fill priority sizes="(max-width:700px) 60vw, 450px"/></div>
       <div className="ig-portal-shadow"/>
     </div>
     <div className="ig-threshold-copy ig-active-copy">
       <p className="ig-eyebrow">{ar?"دراسة لقربنا من صورة حقيقية":"AN EXPERIMENT IN ATTENTION"}</p>
       <h1 id="ig-entry-title">{ar?"لما نقرّب، إيه اللي بيتغيّر؟":"What changes when we look closer?"}</h1>
       <p>{ar?"دي صورة توثيقية من معرض INBETWEEN، مش لوحة منسوبة لفنان محدد. هنجرب نشوفها بتركيز، ونفهم حدود اللي نقدر نستنتجه منها.":"This is a documentary image from INBETWEEN, not a separately catalogued artist work. Enter, look deliberately and discover what the source can—and cannot—tell us."}</p>
       <div className="ig-entry-actions">
        <button type="button" onClick={()=>navigate("look","guided",0)}>{ar?"ابدأ الملاحظة الموجّهة":"Enter guided looking"} <span>↗</span></button>
        <button type="button" onClick={()=>navigate("look","free",0)}>{ar?"ادخل بحرية":"Explore freely"}</button>
       </div>
     </div>
     <p className="ig-threshold-foot">{ar?"فضاء تجريبي مجرد، مش إعادة بناء لمكان درب":"ABSTRACT STUDY SPACE / NOT A RECONSTRUCTION OF DARB"}</p>
   </section>}

   {stage==="look"&&<section className="ig-study" aria-label={ar?"دراسة الصورة":"Looking study"}>
     <div className="ig-study-top ig-active-copy">
       <div><span className="ig-label">SOURCE 01 / 1920×1080</span>
         <h1>{ar?"شوف الصورة نفسها":"Look at the image itself"}</h1></div>
       <button type="button" onClick={()=>navigate("threshold")}>{ar?"الرجوع للبداية":"Back to threshold"} ↖</button>
     </div>
     <div className="ig-workbench">
       <div className="ig-canvas-wrap">
         <div className="ig-image-window" ref={viewer} role="group"
            tabIndex={0} onClick={point} onKeyDown={keyView}
            aria-label={ar?"صورة توثيق INBETWEEN. استخدم زائد وناقص للتكبير وأسهم اليمين واليسار للتحكم في موضع التركيز.":"INBETWEEN documentation. Use plus/minus to zoom and left/right arrows to shift focus."}>
           <Image src={sourceImage} alt={ar?"أعمال مطبوعة أحادية اللون موثقة داخل معرض INBETWEEN":"Monochrome printed works documented inside the INBETWEEN exhibition"} fill priority
             sizes="(max-width:900px) 100vw, 74vw"
             style={{objectFit:"contain",transform:"scale("+scale+")",transformOrigin:origin.x+"% "+origin.y+"%",transition:reduce?"none":"transform 650ms cubic-bezier(.2,.8,.15,1)"}}/>
         </div>
         <div className="ig-canvas-controls">
           <span>{ar?"التفاصيل في حدود دقة المصدر":"NATIVE SOURCE · NO AI UPSCALING"}</span>
           <div role="group" aria-label={ar?"التحكم في التكبير":"Zoom controls"}>
             <button type="button" onClick={()=>zoom(scale-.2)} disabled={scale<=1} aria-label={ar?"تصغير":"Zoom out"}>−</button>
             <output aria-live="polite">{Math.round(scale*100)}%</output>
             <button type="button" onClick={()=>zoom(scale+.2)} disabled={scale>=1.6} aria-label={ar?"تكبير":"Zoom in"}>+</button>
             <button type="button" onClick={()=>{zoom(1);setOrigin({x:50,y:50});}}>{ar?"إعادة ضبط":"Reset"}</button>
           </div>
         </div>
       </div>
       <aside className="ig-question">
         <div className="ig-question-head"><span>INBETWEEN / 2025</span><span>{ar?"ص ٧ من الملف":"OVERVIEW / P.07"}</span></div>
         <div className="ig-question-body ig-active-copy">
           {mode==="guided"?<>
             <span className="ig-label">{ar?"سؤال ملاحظة من مختبر التصميم":"DESIGN-LAB OBSERVATION PROMPT"} · {index+1}/{prompts.length}</span>
             <h2>{prompts[index][lang]}</h2>
             <p>{ar?"السؤال هنا من بحثنا، مش من الفنان أو القيّم على المعرض. مفيش إجابة مفروضة عليك.":"This prompt comes from our research lab, not the artist or exhibition curator. No answer is prescribed."}</p>
             <div className="ig-prompt-control">
               <button type="button" disabled={index===0} onClick={()=>navigate("look","guided",index-1)}>{ar?"السابق":"Previous"}</button>
               <button type="button" onClick={()=>index===2?navigate("context","guided",index):navigate("look","guided",index+1)}>{index===2?(ar?"افتح السياق":"See the context"):(ar?"السؤال التالي":"Next question")} ↗</button>
             </div>
           </>:<>
             <span className="ig-label">{ar?"مشاهدة مستقلة":"FREE LOOKING"}</span>
             <h2>{ar?"خد وقتك مع التفاصيل.":"Stay with what you see."}</h2>
             <p>{ar?"استخدم التكبير البسيط ومكان التركيز عشان تقرأ الصورة من غير ادعاء تفاصيل مش موجودة في الملف.":"Shift the focus and inspect the actual recorded pixels. Nothing here reconstructs missing image detail."}</p>
             <button className="ig-context-cta" type="button" onClick={()=>navigate("context","free")}>{ar?"اعرف إيه اللي تثبته الصورة":"Read the source context"} ↗</button>
           </>}
         </div>
         <div className="ig-mode-switch" role="group" aria-label={ar?"نوع المشاهدة":"Looking mode"}>
           <button type="button" aria-pressed={mode==="guided"} onClick={()=>navigate("look","guided",index)}>{ar?"موجّه":"Guided"}</button>
           <button type="button" aria-pressed={mode==="free"} onClick={()=>navigate("look","free",index)}>{ar?"حر":"Free"}</button>
         </div>
       </aside>
     </div>
   </section>}

   {stage==="context"&&<section className="ig-context">
      <div className="ig-context-intro ig-active-copy">
       <span className="ig-label">SOURCE / CONSEQUENCE</span>
       <h1>{ar?"الصورة تفتح بابًا، لكنها مش كل الحكاية.":"A photograph opens a door. It is not the whole work."}</h1>
       <p>{ar?"الملف الأصلي فيه صورتين من نفس صفحة INBETWEEN. نقدر نقارن سياق التوثيق، لكن ما نقدرش نستنتج وحدنا اسم الفنان أو أبعاد العمل أو نواياه.":"The original Darb overview holds two distinct documentary views on the same INBETWEEN page. We can compare what they show, but cannot assign individual artwork authorship, scale or intention without further evidence."}</p>
      </div>
      <div className={"ig-context-pair"+(compare?" ig-context-reverse":"")}>
       <figure><Image src={sourceImage} width={960} height={540} alt={ar?"أعمال مطبوعة موثقة داخل INBETWEEN":"Printed works documented at INBETWEEN"}/><figcaption>DOCUMENT 01 / PDF 07 · 1920 × 1080</figcaption></figure>
       <figure><Image src={contextImage} width={605} height={454} alt={ar?"توثيق تركيب معلّق في INBETWEEN":"Installation documentation from INBETWEEN"}/><figcaption>DOCUMENT 02 / PDF 07 · 1210 × 908</figcaption></figure>
      </div>
      <div className="ig-context-actions">
        <button type="button" onClick={()=>setCompare(c=>!c)}>{ar?"بدّل أولوية الصور":"Change viewing order"} ↔</button>
        <button type="button" onClick={()=>navigate("look",mode,index)}>{ar?"ارجع للتفاصيل":"Return to detail"} ↖</button>
        <Link href={"/"+lang+"/projects/inbetween-2025"}>{ar?"اقرأ سجل المعرض":"Open the exhibition record"} ↗</Link>
      </div>
      <p className="ig-context-credit">{ar?"جميع الصور من ملف درب ١٧١٨ لعام ٢٠٢٦. الأسماء واعتمادات المصورين والحقوق التفصيلية قيد التحقق.":"Source: Darb 1718 Overview 2026, p.7. Individual artist, photographer credits and republication scope require verification."}</p>
   </section>}

   <footer className="ig-lab-footer">
     <p>{ar?"مختبر تجريبي: مبادئ Imaginarium، مش نسخًا لكود National Gallery أو ادّعاءً بهوية درب.":"METHOD STUDY / NOT THE NATIONAL GALLERY'S CODE, NOT DARB'S APPROVED ART DIRECTION."}</p>
     <a href="https://www.q42.nl/en/work/imaginarium-national-gallery" target="_blank" rel="noopener noreferrer">{ar?"بحث فريق التنفيذ Q42":"Q42's original case study"} ↗</a>
   </footer>
 </div>;
}
