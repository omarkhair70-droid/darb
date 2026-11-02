import type { Metadata } from "next";
import { isLocale, ui } from "@/lib/locale";
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"التواصل والزيارة":"Visit & Contact"};
}
export default async function Visit({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";const copy=ui[lang];
 return <div className="shell interior-page">
  <header className="page-heading"><span className="section-index">VISIT / CONTACT</span><h1>{copy.visitTitle}</h1><p>{copy.visitText}</p></header>
  <div className="visit-content"><div className="visit-typography" aria-hidden="true">DARB<br/>1718</div>
  <div className="visit-info"><span className="section-index">{lang==="ar"?"قبل الزيارة":"BEFORE YOU VISIT"}</span>
   <h2>{lang==="ar"?"مكان الفعالية أولًا":"Check the venue for each event"}</h2><p>{copy.liveNote}</p>
   <a href="https://linktr.ee/darb1718" rel="noopener noreferrer" target="_blank" className="primary-action">{copy.official} ↗</a>
  </div></div>
 </div>;
}
