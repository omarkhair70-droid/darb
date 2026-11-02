import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { isLocale, ui } from "@/lib/locale";
import { getVisibleProjects } from "@/lib/sanity-source";

const chapters=[
 {id:"tales-of-fustat",index:"01",name:{ar:"المكان يصنع أثره",en:"A place leaves its mark"}},
 {id:"jusoor",index:"02",name:{ar:"لما نجتمع ونسمع",en:"When we gather and listen"}},
 {id:"something-else-2023",index:"03",name:{ar:"السؤال اللي بيفتح أسئلة",en:"The question that opens others"}},
] as const;
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return{title:lang==="ar"?"اكتشف درب":"Explore Darb"};
}
export default async function Explore({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";const copy=ui[lang];
 const all=await getVisibleProjects();const getProject=(slug:string)=>all.find(p=>p.slug===slug);
 return <div className="shell interior-page">
   <header className="page-heading"><span className="section-index">DARB / EXPLORE</span>
     <h1>{copy.exploreTitle}</h1><p>{copy.exploreIntro}</p>
   </header>
   <div className="explore-sequences">
     {chapters.map((chapter)=>{
       const project=getProject(chapter.id);
       if(!project)return null;
       return <section className="chapter-row" key={chapter.id}>
         <span className="chapter-number">{chapter.index}</span>
         <ProjectCard project={project} lang={lang} large/>
         <div className="chapter-comment"><h2>{chapter.name[lang]}</h2>
           <p>{project.description[lang]}</p><Link href={"/"+lang+"/projects/"+project.slug} className="text-link">{copy.read} ↗</Link>
         </div>
       </section>;
     })}
   </div>
   <div className="end-banner"><p>{lang==="ar"?"كل الحكايات مرتبطة بسجل حقيقي، ويمكنك الانتقال للفهرس في أي وقت.":"Each story connects to an actual record. Switch to the index at any point."}</p>
   <Link href={"/"+lang+"/archive"} className="primary-action">{copy.index} ↗</Link></div>
 </div>;
}
