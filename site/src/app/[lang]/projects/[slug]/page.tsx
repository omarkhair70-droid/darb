import type {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";
import {notFound} from "next/navigation";
import {worksByProgramme,personById} from "@/lib/work-graph";
import {ProjectMedia} from "@/components/project-media";
import {isLocale,locales,ui} from "@/lib/locale";
import {projects} from "@/lib/records";
import {getVisibleProject,getVisibleProjects} from "@/lib/sanity-source";

type Props={params:Promise<{lang:string;slug:string}>};
export function generateStaticParams(){
 return locales.flatMap(lang=>projects.map(p=>({lang,slug:p.slug})));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang:l,slug}=await params;const lang=isLocale(l)?l:"ar";
 const p=await getVisibleProject(slug);
 return {title:p?.title[lang]||ui[lang].nav.archive,description:p?.description[lang]};
}
export default async function ProjectDetail({params}:Props){
 const {lang:l,slug}=await params;
 if(!isLocale(l))notFound();const lang=l;
 const project=await getVisibleProject(slug);if(!project)notFound();
 const copy=ui[lang];
 const all=await getVisibleProjects();
 const related=project.related.map(id=>all.find(p=>p.slug===id)).filter((x):x is NonNullable<typeof x>=>Boolean(x));
 return <article className="darb-workroom">
   <nav className="shell workroom-back">
     <Link href={"/"+lang+"/archive"}>← {copy.back}</Link>
     <span>{copy.historical}</span>
   </nav>
   <header className="shell workroom-identity">
      <div className="workroom-record"><span className="meta-label">DARB / SOURCE WORK / {project.year}</span>
        <h1>{project.title[lang]}</h1></div>
      <p>{project.description[lang]}</p>
   </header>
   <section className="shell workroom-view" aria-label={lang==="ar"?"توثيق المشروع":"Project documentation"}>
     <figure className="workroom-plate">
       <ProjectMedia project={project} lang={lang} priority/>
       <figcaption><span>PDF / {String(project.sourcePage).padStart(2,"0")}</span><span>{lang==="ar"?"توثيق البرنامج، لا ينوب عن السجل الأصلي للعمل":"Programme documentation, not an independently catalogued artwork"}</span></figcaption>
     </figure>
     <aside className="workroom-sidebar">
       <p className="meta-label">{lang==="ar"?"معلومات المصدر":"SOURCE NOTES"}</p>
       <dl>
         <div><dt>{copy.typeLabels[project.kind]}</dt><dd>{project.year}</dd></div>
         <div><dt>{copy.date}</dt><dd>{project.dateLabel[lang]}</dd></div>
         {project.venue&&<div><dt>{copy.location}</dt><dd>{project.venue[lang]}</dd></div>}
         {project.people.length>0&&<div><dt>{copy.participants}</dt><dd>{project.people.join(" · ")}</dd></div>}
         <div><dt>{copy.source}</dt><dd>{copy.page} {project.sourcePage}</dd></div>
       </dl>
       <p className="workroom-warning">{copy.rights} {lang==="ar"?"لا نفترض اسم صاحب العمل من صورة المعرض.":"An exhibition photograph is not proof of an individual artwork's authorship."}</p>
       <Link href={"/"+lang+"/explore"}>{lang==="ar"?"ادخل مسار الاستكشاف":"Enter an exploration path"} ↗</Link>
     </aside>
   </section>
   {slug==="inbetween-2025"&&<section className="shell workroom-secondary">
      <div><span className="meta-label">SECOND DOCUMENT / PDF 07</span>
       <p>{lang==="ar"?"لقطة توثيق إضافية من نفس صفحة المعرض. محتاجين أسماء الفنانين واعتمادات المصوّرين عشان تتحول لسجل أعمال مستقل.":"A second documentary photograph on the same exhibition page. Artist and photographer records are required before this becomes an individual artwork entry."}</p></div>
      <figure><Image src="/media/pdf_image_0360.jpeg" width={960} height={540} alt={lang==="ar"?"مطبوعات أحادية اللون موثقة في INBETWEEN":"Monochrome print series documented in INBETWEEN"}/><figcaption>2026 OVERVIEW / PDF 07</figcaption></figure>
   </section>}
   {films.length>0&&<section className="shell workroom-connections" aria-label={lang==="ar"?"أفلام البرنامج":"Films in this programme"}>
      <p className="meta-label">{lang==="ar"?"الأفلام الموثقة في الملف، صفحة ٩":"DOCUMENTED FILMS / OVERVIEW P. 9"}</p>
      <ol>{films.map((film,i)=><li key={film.slug}><Link href={"/"+lang+"/works/"+film.slug}>
        <span>{String(i+1).padStart(2,"0")}</span><strong>{film.title[lang]}</strong>
        <small>{personById(film.creatorId)?.name[lang]||""}</small><span aria-hidden="true">↗</span>
      </Link></li>)}</ol>
      <p>{lang==="ar"?"العمل المعروض بالنسخة الرسمية يُفتح من صفحته. مواعيد العروض داخل درب لم تتأكد.":"An officially published film opens from its own work record. Exact Darb screening dates are unverified."}</p>
   </section>}
   {related.length>0&&<section className="shell workroom-connections">
      <p className="meta-label">{copy.related} / {lang==="ar"?"مقارنات تحريرية وليست إثباتًا لتعاون فني":"EDITORIAL RELATIONS, NOT PROOF OF COLLABORATION"}</p>
      <ol>{related.map((p,i)=><li key={p.slug}>
       <Link href={"/"+lang+"/projects/"+p.slug}><span>{String(i+1).padStart(2,"0")}</span><strong>{p.title[lang]}</strong><small>{p.year}</small><span aria-hidden="true">↗</span></Link>
      </li>)}</ol>
   </section>}
 </article>;
}
