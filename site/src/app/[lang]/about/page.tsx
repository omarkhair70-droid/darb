import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, ui } from "@/lib/locale";
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"عن درب":"About Darb"};
}
export default async function About({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";const copy=ui[lang];
 return <div className="shell interior-page">
  <header className="page-heading"><span className="section-index">ABOUT / DARB 1718</span><h1>{copy.aboutTitle}</h1><p>{copy.aboutText}</p></header>
  <div className="about-milestones"><div><span className="milestone-date">2008</span><h2>{lang==="ar"?"مساحة مستقلة في الفسطاط":"An independent space in Fustat"}</h2><p>{copy.aboutText}</p></div>
  <div><span className="milestone-date">2024</span><h2>{copy.aboutHistory}</h2><p>{copy.aboutHistoryText}</p>
   <a className="source-link" target="_blank" rel="noopener noreferrer" href="https://www.madamasr.com/en/2024/01/03/news/u/main-building-demolished-at-darb-1718-cultural-center/">{lang==="ar"?"توثيق مستقل لأحداث يناير ٢٠٢٤":"Independent January 2024 reporting"} ↗</a></div>
  <div><span className="milestone-date">2025–26</span><h2>{lang==="ar"?"فن مستمر بأشكال مختلفة":"Continuity in different forms"}</h2>
   <p>{lang==="ar"?"يعرض ملف ٢٠٢٦ أعمالًا جديدة ومعارض وورشًا وعروض أفلام، بعضها أُقيم في فضاءات مختلفة.":"The 2026 overview records exhibitions, workshops, cinema and ongoing collaboration, across different settings."}</p>
   <Link className="text-link" href={"/"+lang+"/archive"}>{copy.viewAll} ↗</Link></div></div>
  <div className="end-banner"><p>{copy.rights}</p><Link className="primary-action" href={"/"+lang+"/explore"}>{copy.nav.explore} ↗</Link></div>
 </div>;
}
