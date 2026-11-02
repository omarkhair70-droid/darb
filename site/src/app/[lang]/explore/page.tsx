import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceAtlas } from "@/components/experience-atlas";
import { isLocale, ui } from "@/lib/locale";
import { getReadingPaths, validReadingSelection } from "@/lib/reading-paths";
import { getVisibleProjects } from "@/lib/sanity-source";
import "./reading-paths.css";

type Props={
  params:Promise<{lang:string}>;
  searchParams:Promise<{path?:string;step?:string}>;
};
export async function generateMetadata({params}:Pick<Props,"params">):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"اكتشف درب":"Explore Darb"};
}

export default async function Explore({params,searchParams}:Props){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";const copy=ui[lang];
 const all=await getVisibleProjects();
 const paths=getReadingPaths(all);
 const query=await searchParams;
 const initial=validReadingSelection(paths,query.path,query.step);
 return <div className="shell interior-page explore-v2">
   <header className="page-heading">
     <span className="section-index">DARB / EXPLORE / 001</span>
     <h1>{lang==="ar"?"الأعمال مش وحدها":"The work is never alone"}</h1>
     <p>{lang==="ar"?
       "٣ زوايا لقراءة أعمال موثقة من تاريخ درب؛ اختار علاقة، وانتقل بين مصادر حقيقية من غير ما نخلط البرامج ببعض.":
       "Three ways into documented Darb programmes. Follow a question through real source material, without confusing separate events with one another."}
     </p>
   </header>
   {paths.length?<ExperienceAtlas lang={lang} paths={paths} initial={initial}/>:(
     <p role="status">{copy.noResults}</p>
   )}
   <div className="end-banner">
     <p>{lang==="ar"?
       "مش لازم تقرأ الرحلات بالترتيب. كل سجل موجود في الفهرس، ويقدر يكون نقطة بداية مستقلة.":
       "No sequence is mandatory. Every record remains independently searchable in the index."}
     </p>
     <Link href={"/"+lang+"/archive"} className="primary-action">{copy.index} ↗</Link>
   </div>
 </div>;
}
