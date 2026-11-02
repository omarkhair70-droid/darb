import type { Metadata } from "next";
import { isLocale,ui } from "@/lib/locale";
const actions=[
 {ar:"ورش وتجارب فنية",en:"Workshops & making"},
 {ar:"إقامات فنية",en:"Artist residencies"},
 {ar:"أفلام وعروض",en:"Film & screenings"},
 {ar:"تعاون وشراكات",en:"Collaboration"},
];
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"المشاركة":"Participate"};
}
export default async function Participate({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";const copy=ui[lang];
 return <div className="shell interior-page"><header className="page-heading"><span className="section-index">JOIN / PARTICIPATE</span>
  <h1>{copy.participateTitle}</h1><p>{copy.participateText}</p></header>
  <div className="participation-grid">{actions.map((item,i)=><div key={item.en} className="participation-item">
    <span className="section-index">0{i+1}</span><h2>{item[lang]}</h2>
    <p>{lang==="ar"?"المعلومات والنماذج الحالية تُراجع عبر القنوات الرسمية قبل التقديم.":"Check the official channels for confirmed current details and application status."}</p>
  </div>)}</div>
  <div className="end-banner"><strong>{copy.liveNote}</strong><a href="https://linktr.ee/darb1718" className="primary-action" target="_blank" rel="noopener noreferrer">{copy.official} ↗</a></div>
 </div>;
}
