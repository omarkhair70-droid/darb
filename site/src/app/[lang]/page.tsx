import Link from "next/link";
import Image from "next/image";
import {DarbOpenField} from "@/components/darb-open-field";
import {isLocale,ui} from "@/lib/locale";
import {getVisibleProjects} from "@/lib/sanity-source";
import "./entry.css";

const chapters=[
 {id:"tales-of-fustat",no:"01",expression:{ar:"اليد",en:"THE HAND"},context:{ar:"الخزف والحكايات والطباعة",en:"Craft, conversation and cyanotype"}},
 {id:"jusoor",no:"02",expression:{ar:"الصوت",en:"THE VOICE"},context:{ar:"السينما وصُنّاعها",en:"Cinema and the people behind it"}},
 {id:"inbetween-2025",no:"03",expression:{ar:"المسافة",en:"THE SPACE"},context:{ar:"التركيب والحركة واللقاء",en:"Installation, movement and encounter"}},
 {id:"something-else-2023",no:"04",expression:{ar:"السؤال",en:"THE QUESTION"},context:{ar:"فن معاصر خارج إطار واحد",en:"Contemporary art across viewpoints"}}
] as const;

export default async function Home({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";
 const ar=lang==="ar";const all=await getVisibleProjects();const copy=ui[lang];
 const moments=chapters.flatMap(ch=>{const p=all.find(x=>x.slug===ch.id);return p?[{...ch,project:p}]:[];});
 return <div className="darb-author-home">
   <DarbOpenField lang={lang} projects={all}/>
   <section className="darb-identity-line" aria-label={ar?"الفكرة المحركة":"Editorial perspective"}>
     <span className="di-axis" aria-hidden="true">01—04</span>
     <p>{ar?"اللي بيجمع درب مش شكل الأعمال، لكن الناس اللي بتصنعها، والأسئلة اللي بتفتحها، واللقاءات اللي بتسيبها وراها.":"Darb is held together not by the shape of its work, but by who makes it, the questions it opens, and the encounters it leaves behind."}</p>
     <span className="di-side">{ar?"مقترح لغوي تحريري · نسخة بحثية":"EDITORIAL DIRECTION / RESEARCH PREVIEW"}</span>
   </section>
   <section className="darb-practice-score" id="practice" aria-labelledby="practice-title">
    <div className="practice-ruler"><span>02 / {ar?"داخل درب":"INSIDE DARB"}</span><span>{ar?"أربع مداخل · من أعمال وبرامج حقيقية":"FOUR PRACTICES / VERIFIED ARCHIVE RECORDS"}</span></div>
    <div className="practice-heading">
      <h2 id="practice-title">{ar?"الفن بيحصل هنا.":"Art is happening across forms."}</h2>
      <p>{ar?"من صورة في الأرشيف لحد صانعها وبرنامجها. كل مدخل بيبدأ بمادة موثقة، مش بمشهد متخيّل.":"Start from a documented encounter, follow its makers and its programme, and find the source behind it."}</p>
    </div>
    <ol className="practice-sheet">
      {moments.map((item,index)=><li key={item.project.slug} className={"practice-entry practice-entry-"+(index+1)}>
         <Link href={"/"+lang+"/projects/"+item.project.slug} className="practice-link">
           <span className="practice-number">{item.no}<small>/ 04</small></span>
           <span className="practice-image" aria-hidden="true">
             {item.project.image?<Image src={"/media/"+item.project.image} alt="" fill sizes="(max-width:700px) 38vw, 260px"/>:<span>{item.project.year}</span>}
           </span>
           <span className="practice-text">
              <span className="practice-type">{copy.typeLabels[item.project.kind]} / {item.project.year} / PDF {item.project.sourcePage}</span>
              <strong>{item.expression[lang]}</strong>
              <em>{item.project.title[lang]}</em>
              <span className="practice-context">{item.context[lang]}</span>
           </span>
           <span className="practice-go" aria-hidden="true">↗</span>
         </Link>
       </li>)}
    </ol>
   </section>
   <section className="darb-film-inset" aria-labelledby="film-home-title">
     <div className="film-inset-top"><span>03 / {ar?"من داخل السينما":"BEHIND THE FILM"}</span><span>{ar?"الفيلم ← المخرجة ← البرنامج":"FILM → MAKER → PROGRAMME"}</span></div>
     <div className="film-inset-body">
       <div className="film-inset-type"><span>JUSOOR / 2026 OVERVIEW · P.09</span>
         <h2 id="film-home-title">{ar?"جدائل الهوية":"Braids of Identity"}</h2>
         <p>{ar?"فيلم لحفصة برعي عن المشاط السوداني. نقدر نتفرّج عليه عند ناشره الأصلي، ونشوف صلته ببرنامج «جسور» في درب.":"A film by Hafsa Borai on Sudanese braiding. Watch it with its original publisher, and trace its documented connection to Darb's Jusoor programme."}</p>
         <Link href={"/"+lang+"/works/braids-of-identity"}>{ar?"ادخل الفيلم وسجله":"Enter the film and its record"} <span aria-hidden="true">↗</span></Link>
       </div>
       <Link href={"/"+lang+"/projects/jusoor"} className="film-inset-art" aria-label={ar?"سجل جسور في الأرشيف":"Jusoor archive record"}>
         <Image src="/media/pdf_image_0379.png" alt={ar?"الهوية الأصلية لبرنامج جسور كما وردت بملف درب":"Jusoor programme identity artwork from the Darb institutional overview"} fill sizes="(max-width:800px) 90vw, 40vw"/>
         <span>JUSOOR / DOCUMENTED PROGRAMME ↗</span>
       </Link>
     </div>
   </section>
   <section className="darb-real-world">
     <div><span className="real-world-no">04 / {ar?"شارك":"PARTICIPATE"}</span>
       <h2>{ar?"واللي جاي، نعمله سوا.":"What's next is made together."}</h2>
     </div>
     <div className="real-world-actions">
       <p>{copy.liveNote}</p>
       <Link href={"/"+lang+"/programmes"}>{ar?"راجع سجل البرنامج":"Check programme status"} ↗</Link>
       <a href="https://linktr.ee/darb1718" target="_blank" rel="noopener noreferrer">{copy.official} ↗</a>
     </div>
   </section>
   <div className="darb-home-note"><span>DARB 1718 / SOURCE FIRST</span><span>{ar?"نسخة تطوير تخضع لاعتماد درب / حقوق الصور قيد المراجعة":"RESEARCH PREVIEW · IMAGE RIGHTS / ARTIST CREDITS UNDER REVIEW"}</span></div>
 </div>;
}
