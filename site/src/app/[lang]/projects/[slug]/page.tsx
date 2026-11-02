import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia } from "@/components/project-media";
import { isLocale, locales, ui } from "@/lib/locale";
import { projects } from "@/lib/records";
import { getVisibleProject, getVisibleProjects } from "@/lib/sanity-source";
type Props={params:Promise<{lang:string;slug:string}>};
export function generateStaticParams(){
 return locales.flatMap(lang=>projects.map(p=>({lang,slug:p.slug})));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang:l,slug}=await params;const lang=isLocale(l)?l:"ar";const project=await getVisibleProject(slug);
 return{title:project?.title[lang]||ui[lang].nav.archive,description:project?.description[lang]};
}
export default async function ProjectDetail({params}:Props){
 const {lang:l,slug}=await params;
 if(!isLocale(l))notFound();
 const lang=l;const project=await getVisibleProject(slug);if(!project)notFound();
 const copy=ui[lang];const all=await getVisibleProjects();const related=project.related.map(id=>all.find(p=>p.slug===id)).filter((x):x is NonNullable<typeof x>=>Boolean(x));
 return <article className="shell interior-page project-detail">
    <Link href={"/"+lang+"/archive"} className="back-link">↗ {copy.back}</Link>
    <header className="detail-heading">
      <div className="detail-meta"><span>{copy.typeLabels[project.kind]}</span><span>{project.year}</span><span>{copy.historical}</span></div>
      <h1>{project.title[lang]}</h1><p>{project.description[lang]}</p>
    </header>
    <div className="detail-media"><ProjectMedia project={project} lang={lang} priority/>
     <div className="media-annotation"><span>{copy.source} / {copy.page} {project.sourcePage}</span><span>{copy.rights}</span></div>
    </div>
    <div className="detail-body">
      <section className="detail-facts" aria-label={copy.details}>
         <div><span>{copy.date}</span><p>{project.dateLabel[lang]}</p></div>
         {project.venue&&<div><span>{copy.location}</span><p>{project.venue[lang]}</p></div>}
         {project.people.length>0&&<div><span>{copy.participants}</span><p>{project.people.join(" · ")}</p></div>}
         <div><span>{copy.source}</span><p>{copy.page} {project.sourcePage} / Darb 1718 Overview 2026</p></div>
      </section>
      <div className="detail-editorial">
        <p className="big-statement">{lang==="ar"?"العمل ما بيقفش عند إطار الصورة؛ فيه سياق وناس ووقت ومكان.":"An artwork is never only its image: it has context, makers, time and place."}</p>
        <p>{lang==="ar"?"المدخل ده مبني على محتوى موثق في الملف المؤسسي، ولسه بيتراجع مع أصحاب الأعمال عشان نستكمل الأسماء والتفاصيل والصور عالية الجودة.":"This entry is grounded in the institution's overview and remains under curatorial review for full names, credits, contextual detail and high-resolution originals."}</p>
        <Link href={"/"+lang+"/archive"} className="text-link">{copy.discover} ↗</Link>
      </div>
    </div>
    {related.length>0&&<section className="related-section"><span className="section-index">{copy.related}</span>
      <div className="related-grid">{related.map(p=><Link href={"/"+lang+"/projects/"+p.slug} className="related-record" key={p.slug}><small>{p.year} / {copy.typeLabels[p.kind]}</small><strong>{p.title[lang]}</strong><span aria-hidden="true">↗</span></Link>)}</div>
    </section>}
 </article>;
}
