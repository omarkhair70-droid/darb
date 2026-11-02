import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {locales,isLocale} from "@/lib/locale";
import {personRecords,personById,workRecords,sourcesFor} from "@/lib/work-graph";
import "../../works/[slug]/work.css";

type Props={params:Promise<{lang:string;id:string}>};
export function generateStaticParams(){return locales.flatMap(lang=>personRecords.map(p=>({lang,id:p.id})));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang:l,id}=await params;const lang=isLocale(l)?l:"ar";
 return {title:personById(id)?.name[lang]||"Person"};
}
export default async function PersonPage({params}:Props){
 const {lang:l,id}=await params;if(!isLocale(l))notFound();
 const lang=l, ar=lang==="ar",p=personById(id);if(!p)notFound();
 const works=workRecords.filter(w=>w.creatorId===id),sources=sourcesFor(p.sourceIds);
 return <article className="darb-film-work person-context">
  <nav className="film-context-nav"><Link href={"/"+lang+"/projects/jusoor"}>{ar?"جسور":"Jusoor"}</Link><span>/</span>{p.name[lang]}</nav>
  <header className="film-work-heading"><div>
   <p className="film-kicker">{ar?"صاحبة/صاحب عمل · مساهمة موثقة":"DOCUMENTED CONTRIBUTOR"}</p>
   <h1>{p.name[lang]}</h1>
  </div><div className="film-byline">
  <strong>{p.role?.[lang]||(ar?"اسم وارد ضمن ملف برنامج جسور":"Named in the Jusoor programme overview")}</strong>
  <p>{p.bio?.[lang]||(ar?"لا ننشر سيرة لم يتم التحقق منها.":"No unverified biography is published.")}</p>
  </div></header>
  <section className="film-other-works"><div className="film-other-head"><h2>{ar?"الأعمال الموثقة":"Documented works"}</h2></div>
  <div className="film-other-links">{works.map(w=><Link key={w.slug} href={"/"+lang+"/works/"+w.slug}><span>{w.title[lang]}</span><small>{ar?"فيلم":"Film"}</small><span aria-hidden="true">↗</span></Link>)}</div></section>
  <section className="film-evidence"><div className="film-evidence-title"><h2>{ar?"مصادر هذا السجل":"Sources for this record"}</h2></div>
  <ol className="film-evidence-list">{sources.map(s=><li key={s.id}>{s.url?<a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>:<strong>{s.label}</strong>}</li>)}</ol></section>
 </article>;
}
