import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, ui } from "@/lib/locale";
import { getVisibleProjects } from "@/lib/sanity-source";
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"برنامج درب":"Programme"};
}
export default async function Programme({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";const copy=ui[lang];
 const projects=await getVisibleProjects();
 return <div className="shell interior-page">
  <header className="page-heading"><span className="section-index">PROGRAMME / WHAT'S ON</span><h1>{copy.programmeTitle}</h1><p>{copy.programmeText}</p></header>
  <div className="status-panel"><strong>{copy.liveNote}</strong><a href="https://linktr.ee/darb1718" target="_blank" rel="noopener noreferrer" className="text-link">{copy.official} ↗</a></div>
  <section className="timeline-section"><div className="section-heading"><h2>{copy.current}</h2><span>{projects.length} {copy.results}</span></div>
  <div className="record-rows">{projects.map(p=><Link key={p.slug} href={"/"+lang+"/projects/"+p.slug} className="record-row">
   <span>{p.year}</span><strong>{p.title[lang]}</strong><span>{copy.typeLabels[p.kind]}</span><span aria-hidden="true">↗</span>
  </Link>)}</div></section>
 </div>;
}
