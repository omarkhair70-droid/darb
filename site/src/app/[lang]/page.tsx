import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ProjectMedia } from "@/components/project-media";
import { isLocale, ui } from "@/lib/locale";
import { getProject, projects } from "@/lib/records";

export default async function Home({params}:{params:Promise<{lang:string}>}){
  const {lang:l}=await params;
  const lang=isLocale(l)?l:"ar";
  const copy=ui[lang];
  const hero=getProject("something-else-2023")!;
  const featured=["tales-of-fustat","inbetween-2025","jusoor"]
    .map(getProject).filter((p):p is NonNullable<typeof p>=>Boolean(p));
  return <>
    <section className="home-hero">
      <div className="shell hero-grid">
        <div className="hero-intro">
          <div className="eyebrow"><span className="signal-dot"/>{lang==="ar"?"أرشيف حيّ / القاهرة":"A LIVING ARCHIVE / CAIRO"}</div>
          <h1>{copy.tagline}</h1>
          <p className="hero-lead">{copy.introduction}</p>
          <div className="action-row">
            <Link href={"/"+lang+"/explore"} className="primary-action">{copy.nav.explore}<span aria-hidden="true">↗</span></Link>
            <Link href={"/"+lang+"/programmes"} className="secondary-action">{copy.nav.programmes}</Link>
          </div>
          <p className="small-note">{copy.working} · {copy.liveNote}</p>
        </div>
        <Link href={"/"+lang+"/projects/"+hero.slug} className="hero-art" aria-label={hero.title[lang]}>
          <ProjectMedia project={hero} lang={lang} priority/>
          <div className="hero-art-caption"><span>{copy.current} · {hero.year}</span><strong>{hero.title[lang]}</strong></div>
        </Link>
      </div>
    </section>
    <section className="manifesto-band"><div className="shell manifesto-inner">
      <span className="section-index">01 / {copy.nav.about}</span>
      <p>{lang==="ar"?"الفن هنا مش قطعة معزولة على الحائط. هو علاقات: بين صانع ومدينة، بين جمهور وصوت، وبين تجربة والتجربة اللي بعدها.":"Art here is not an isolated object on a wall. It is a set of relations: between a maker and a city, a room and a voice, one experiment and what follows."}</p>
    </div></section>
    <section className="shell section-block">
      <div className="section-heading"><div><span className="section-index">02 / {copy.current}</span><h2>{copy.exploreTitle}</h2></div><Link className="text-link" href={"/"+lang+"/archive"}>{copy.viewAll} ↗</Link></div>
      <div className="project-grid">{featured.map((project,i)=><ProjectCard key={project.slug} project={project} lang={lang} large={i===0}/>)}</div>
    </section>
    <section className="shell ending-section">
      <div className="ending-title"><span className="section-index">03 / {copy.nav.archive}</span><h2>{lang==="ar"?"كل عمل يفتح بابًا لعمل آخر.":"Every work opens into another."}</h2></div>
      <div><p>{lang==="ar"?"المعارض والورش والأشخاص والأماكن مش فئات منفصلة. الأرشيف بيوصلها ببعض لما تكون العلاقة موثقة.":"Exhibitions, workshops, people and places are not separate categories. The archive connects them where those links are documented."}</p><Link href={"/"+lang+"/archive"} className="primary-action">{copy.discover}<span aria-hidden="true">↗</span></Link></div>
    </section>
    <div className="shell under-construction-note"><span>{projects.length} {copy.results}</span><span>{copy.source}</span></div>
  </>;
}
