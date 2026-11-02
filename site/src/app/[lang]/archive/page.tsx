import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { isLocale, ui } from "@/lib/locale";
import { filterProjects, type ProjectKind } from "@/lib/records";
type Search = { q?:string; type?:string };
const types:ProjectKind[]=["exhibition","festival","workshop","programme","residency"];
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"أرشيف درب":"Darb Archive"};
}
export default async function Archive({params,searchParams}:{params:Promise<{lang:string}>;searchParams:Promise<Search>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";
 const copy=ui[lang];const search=await searchParams;
 const query=(search.q||"").slice(0,100);
 const type=types.includes(search.type as ProjectKind)?search.type!:"all";
 const matching=filterProjects(query,type);
 return <div className="shell interior-page">
   <header className="page-heading"><span className="section-index">INDEX / DARB 1718</span><h1>{copy.archives}</h1>
     <p>{lang==="ar"?"وثائق عن تجارب وأماكن وأشخاص. ابحث بحسب اللغة أو السنة أو نوع النشاط، واربط السجل بالحكايات المعروضة.":"Records of practices, places and people. Search across language, year and programme type, then follow the connections into stories."}</p>
   </header>
   <div className="archive-mode-switch"><Link className="mode-selected" href={"/"+lang+"/archive"} aria-current="page">{copy.index}</Link>
     <Link href={"/"+lang+"/explore"}>{copy.nav.explore}</Link></div>
   <form method="get" action={"/"+lang+"/archive"} className="archive-filters">
     <label>{copy.search}<input type="search" name="q" defaultValue={query} placeholder={copy.search} maxLength={100}/></label>
     <label>{copy.filters}<select name="type" defaultValue={type}><option value="all">{copy.all}</option>{types.map(t=><option key={t} value={t}>{copy.typeLabels[t]}</option>)}</select></label>
     <button type="submit">{copy.searchSubmit} ↗</button>
   </form>
   <div className="archive-topline"><span>{matching.length} {copy.results}</span><span>{copy.historical}</span></div>
   {matching.length?
     <div className="archive-grid">{matching.map(p=><ProjectCard project={p} lang={lang} key={p.slug}/>)}</div>:
     <p role="status" className="empty-state">{copy.noResults}</p>}
   <p className="archive-source-note">{copy.source} · {copy.rights}</p>
 </div>;
}
