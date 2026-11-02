import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {isLocale,ui} from "@/lib/locale";
import {searchVisibleProjects} from "@/lib/sanity-source";
import type {ProjectKind} from "@/lib/records";
import {workRecords,personById} from "@/lib/work-graph";

type Search={q?:string;type?:string};
const types:ProjectKind[]=["exhibition","festival","workshop","programme","residency"];
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"الأرشيف | درب":"Index | Darb"};
}
export default async function Archive({params,searchParams}:{params:Promise<{lang:string}>;searchParams:Promise<Search>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";
 const copy=ui[lang],search=await searchParams;
 const query=(search.q||"").slice(0,100),type=types.includes(search.type as ProjectKind)?search.type!:"all";
 const matching=await searchVisibleProjects(query,type);
 return <div className="darb-catalog">
   <header className="shell catalog-intro">
     <span className="meta-label">DARB / CATALOGUE / 2026</span>
     <div className="catalog-identity">
       <h1>{lang==="ar"?"السجل":"Index"}</h1>
       <p>{lang==="ar"?"المعارض والورش والعروض اللي وثقها درب. كل سطر ليه مصدر؛ مش شرط يكون نشاطًا حاليًا.":"Documented exhibitions, workshops and events. Every entry has a source. Historical records are not today's calendar."}</p>
     </div>
     <nav className="catalog-view-switch" aria-label={lang==="ar"?"طرق الاستكشاف":"Ways to explore"}>
       <Link href={"/"+lang+"/explore"}>{lang==="ar"?"تجربة الاستكشاف":"Explore experience"} ↗</Link>
       <span aria-current="page">{lang==="ar"?"الفهرس النصي":"Research index"}</span>
     </nav>
   </header>
   <div className="shell">
     <form method="get" action={"/"+lang+"/archive"} className="catalog-controls">
       <label>{copy.search}<input type="search" name="q" defaultValue={query} maxLength={100} placeholder={copy.search}/></label>
       <label>{copy.filters}<select name="type" defaultValue={type}><option value="all">{copy.all}</option>{types.map(t=><option value={t} key={t}>{copy.typeLabels[t]}</option>)}</select></label>
       <button type="submit">{copy.searchSubmit} ↗</button>
     </form>
     <div className="catalog-count"><span>{matching.length} {copy.results}</span><span>{copy.historical}</span></div>
     {matching.length?<ol className="catalog-rows">{matching.map((p,i)=><li key={p.slug}>
       <Link className="archive-record" href={"/"+lang+"/projects/"+p.slug}>
         <span className="catalog-numeral">{String(i+1).padStart(2,"0")}</span>
         <div className="catalog-image">
           {p.image?<Image src={"/media/"+p.image} alt={p.imageAlt?.[lang]||p.title[lang]} fill sizes="(max-width:600px) 100px, 170px"/>:
           <span>{lang==="ar"?"لا توجد صورة موثقة":"NO IMAGE"}</span>}
         </div>
         <div className="catalog-record-name"><strong>{p.title[lang]}</strong><small>{copy.typeLabels[p.kind]} · {copy.page} {p.sourcePage}</small></div>
         <span className="catalog-record-year">{p.year}</span>
         <span className="catalog-record-arrow" aria-hidden="true">↗</span>
       </Link>
     </li>)}</ol>:
     <p role="status" className="empty-state">{copy.noResults}</p>}
     <section className="catalog-work-records" aria-label={lang==="ar"?"الأفلام المرتبطة بالبرنامج":"Film works linked to the programme"}>
       <h2>{lang==="ar"?"أعمال موثقة بشكل مستقل":"Individual film records"}</h2>
       <p>{lang==="ar"?"الأفلام دي مذكورة ضمن جسور في ملف درب، صفحة ٩. تقدر تفتح كل فيلم وتشوف مصادره، حتى لو رابط المشاهدة لسه ناقص.":"These films are individually named in Darb's Jusoor overview, p.9. Each has its own evidence-backed record, including those without official playback."}</p>
       <ol>{workRecords.map(item=><li key={item.slug}>
         <Link href={"/"+lang+"/works/"+item.slug}><strong>{item.title[lang]}</strong><span>{personById(item.creatorId)?.name[lang]||""}</span><span aria-hidden="true">↗</span></Link>
       </li>)}</ol>
     </section>
     <p className="archive-source-note">{copy.source} · {copy.rights}</p>
   </div>
 </div>;
}
