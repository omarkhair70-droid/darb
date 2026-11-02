import Link from "next/link";
import {EncounterStage} from "@/components/encounter-stage";
import {isLocale,ui} from "@/lib/locale";
import {getVisibleProjects} from "@/lib/sanity-source";
import "./entry.css";

export default async function Home({params}:{params:Promise<{lang:string}>}){
 const {lang:l}=await params;const lang=isLocale(l)?l:"ar";
 const copy=ui[lang];
 const all=await getVisibleProjects();
 const selected=["inbetween-2025","tales-of-fustat","something-else-2023","jusoor"]
    .map(slug=>all.find(p=>p.slug===slug)).filter((x):x is NonNullable<typeof x>=>Boolean(x));
 return <div className="darb-entry">
   <EncounterStage lang={lang}/>
   <section className="entry-passage shell" aria-label={lang==="ar"?"طرق استكشاف درب":"Ways into Darb"}>
     <div className="passage-preamble">
       <p className="meta-label">{lang==="ar"?"من المشهد إلى الحكاية":"FROM IMAGE TO CONTEXT"}</p>
       <p>{lang==="ar"?"مافيش صورة بتحكي حكاية درب لوحدها. كل نشاط ليه ناس ومكان وتوقيت، وممكن تبدأ من أي واحد فيهم.":"No single image stands for Darb. Each activity has people, place and time; begin wherever curiosity takes you."}</p>
     </div>
     <div className="passage-list">
       {selected.map((p,i)=><Link key={p.slug} href={"/"+lang+"/projects/"+p.slug} className="passage-link">
         <span className="passage-id">{String(i+1).padStart(2,"0")}</span>
         <span className="passage-name">{p.title[lang]}</span>
         <span className="passage-type">{copy.typeLabels[p.kind]} / {p.year}</span>
         <span aria-hidden="true">↗</span>
       </Link>)}
     </div>
   </section>
   <section className="entry-active" aria-label={copy.nav.programmes}>
     <div className="shell entry-active-inner">
       <span className="meta-label">{lang==="ar"?"البرنامج الحالي":"PROGRAMME STATUS"}</span>
       <p>{copy.liveNote}</p>
       <Link href={"/"+lang+"/programmes"}>{lang==="ar"?"راجع البرنامج":"See programme status"} ↗</Link>
       <a href="https://linktr.ee/darb1718" target="_blank" rel="noopener noreferrer">{copy.official} ↗</a>
     </div>
   </section>
 </div>;
}
