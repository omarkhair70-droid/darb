import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {locales,isLocale,ui} from "@/lib/locale";
import {workRecords,workBySlug,personById,sourcesFor,worksByProgramme} from "@/lib/work-graph";
import {OfficialFilmPlayer} from "@/components/official-film-player";
import "./work.css";

type Props={params:Promise<{lang:string;slug:string}>};
export function generateStaticParams(){return locales.flatMap(lang=>workRecords.map(x=>({lang,slug:x.slug})));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {lang:l,slug}=await params;const lang=isLocale(l)?l:"ar";
 const work=workBySlug(slug);
 return {title:work?.title[lang]||"Film",description:work?.subject?.[lang]||undefined};
}
export default async function Work({params}:Props){
 const {lang:l,slug}=await params;if(!isLocale(l))notFound();
 const lang=l, ar=lang==="ar",work=workBySlug(slug);
 if(!work)notFound();
 const maker=personById(work.creatorId);
 const other=worksByProgramme(work.programmeId).filter(w=>w.slug!==work.slug);
 const refs=sourcesFor(work.sourceIds);
 const selected=work.slug==="braids-of-identity";
 return <article className="darb-film-work">
   <nav className="film-context-nav">
     <Link href={"/"+lang+"/projects/jusoor"}>{ar?"برنامج جسور":"Jusoor programme"}</Link>
     <span aria-hidden="true">/</span><span>{work.title[lang]}</span>
     <Link href={"/"+lang+"/archive"} className="film-index-link">{ui[lang].nav.archive} ↗</Link>
   </nav>
   <header className="film-work-heading">
     <div>
       <p className="film-kicker">{ar?"العمل · فيلم وثائقي":"WORK / DOCUMENTARY FILM"} · 2025</p>
       <h1>{work.title[lang]}</h1>
     </div>
     <div className="film-byline">
       <span>{work.creatorRole[lang]}</span>
       {maker?<Link href={"/"+lang+"/people/"+maker.id}>{maker.name[lang]} ↗</Link>:<span>{work.creatorId}</span>}
       <p>{ar?"موثق ضمن عروض «جسور» في ملف درب ٢٠٢٦، صفحة ٩. تاريخ العرض داخل درب لم يُتحقق منه.":"Documented within Jusoor in Darb's 2026 overview, p.9. Its exact Darb screening date is not verified."}</p>
     </div>
   </header>
   {selected?<OfficialFilmPlayer work={work} lang={lang}/>:<div className="film-unavailable" role="status">
     <p>{ar?"الفيلم مسجل ضمن برنامج جسور، لكن لا نملك رابط مشاهدة رسميًا مؤكّدًا لهذا العمل حتى الآن.":"The film is documented within Jusoor, but a verified official screening link has not yet been found for this work."}</p>
     <Link href={"/"+lang+"/projects/jusoor"}>{ar?"افتح البرنامج":"Open the programme"} ↗</Link>
   </div>}
   <div className="film-work-body">
     <section className="film-artistic-reading">
       <p className="film-kicker">{ar?"عن العمل":"THE WORK"}</p>
       {work.subject?<h2>{work.subject[lang]}</h2>:<h2>{ar?"فيلم من سجل برنامج جسور":"A film documented in the Jusoor programme"}</h2>}
       {work.artisticContext && <p>{work.artisticContext[lang]}</p>}
       {selected&&<div className="film-research-links">
         <p>{ar?"الكلام عن الفيلم مستند إلى بيان منشور للمخرجة ومقال داخل متحف صون التراث السوداني. ليس تفريغًا للمشاهد أو تفسيرًا لتسلسل الفيلم.":"The interpretation is grounded in the filmmaker's published statement and SSLH Museum, not a fabricated scene-by-scene transcript."}</p>
         <a href="https://africafotofair.com/aff25-participants-2/" target="_blank" rel="noopener noreferrer">{ar?"اقرأ بيان المخرجة":"Read the filmmaker's statement"} ↗</a>
       </div>}
     </section>
     <aside className="film-provenance" aria-label={ar?"سجل المصدر":"Source ledger"}>
       <h2>{ar?"وراء العمل":"Behind the work"}</h2>
       <dl>
         <div><dt>{ar?"صانع العمل":"Maker"}</dt><dd>{maker?.name[lang]||work.creatorId}</dd></div>
         <div><dt>{ar?"البرنامج":"Programme"}</dt><dd><Link href={"/"+lang+"/projects/jusoor"}>{ar?"جسور · درب ١٧١٨":"Jusoor · Darb 1718"} ↗</Link></dd></div>
         <div><dt>{ar?"عرض درب":"Darb screening"}</dt><dd>{ar?"تاريخ العرض غير محدد في المصدر":"Date not stated in supplied source"}</dd></div>
         <div><dt>{ar?"الحقوق":"Rights"}</dt><dd>{work.rightsNotes[lang]}</dd></div>
       </dl>
     </aside>
   </div>
   <section className="film-evidence" aria-label={ar?"مصادر العمل":"Sources for this record"}>
     <div className="film-evidence-title">
       <span>01 / {ar?"الأدلة":"EVIDENCE"}</span>
       <h2>{ar?"منين جت المعلومات؟":"Why can we say this?"}</h2>
       <p>{ar?"المصادر بتثبت اسم العمل والمخرجة وموضوعه ووجوده ضمن جسور، لكنها لا تثبت يوم العرض بالتحديد ولا تمنحنا حقوق نسخ الصور.":"These sources establish the film, maker, context and Darb programme connection; they do not establish exact screening date or grant us image reproduction rights."}</p>
     </div>
     <ol className="film-evidence-list">{refs.map((source,i)=><li key={source.id}>
       <small>{String(i+1).padStart(2,"0")} / {source.kind}</small>
       {source.url?<a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>:
       <strong>{source.label}</strong>}
       <p>{source.purpose}</p>
     </li>)}</ol>
   </section>
   {other.length>0&&<section className="film-other-works" aria-label={ar?"أفلام أخرى ضمن البرنامج":"Other films documented in the programme"}>
     <div className="film-other-head"><span>02 / {ar?"في نفس البرنامج":"SAME PROGRAMME"}</span><h2>{ar?"أفلام أخرى في جسور":"Other films in Jusoor"}</h2></div>
     <div className="film-other-links">{other.map(item=><Link href={"/"+lang+"/works/"+item.slug} key={item.slug}>
       <span>{item.title[lang]}</span><small>{personById(item.creatorId)?.name[lang]||""}</small><span aria-hidden="true">↗</span>
     </Link>)}</div>
     <p>{ar?"الارتباط ده معناه إن الأفلام مذكورة في نفس البرنامج، مش إنها لنفس المخرج أو عُرضت في نفس اليوم.":"Being listed in the same programme doesn't imply the same director or the same screening date."}</p>
   </section>}
 </article>;
}
