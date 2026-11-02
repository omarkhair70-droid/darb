import Link from "next/link";
import { type Project } from "@/lib/records";
import { type Locale, ui } from "@/lib/locale";
import { ProjectMedia } from "./project-media";

export function ProjectCard({project,lang,large=false}:{project:Project;lang:Locale;large?:boolean}){
  const copy=ui[lang];
  return <article className={"project-card "+(large?"project-card-large":"")}>
    <Link className="project-card-link" href={"/"+lang+"/projects/"+project.slug}>
      <ProjectMedia project={project} lang={lang}/>
      <div className="project-card-copy">
        <div className="project-card-meta"><span>{copy.typeLabels[project.kind]}</span><span>{project.year}</span></div>
        <h3>{project.title[lang]}</h3>
        <p>{project.description[lang]}</p>
        <span className="text-link">{copy.more}<span aria-hidden="true"> ↗</span></span>
      </div>
    </Link>
  </article>;
}
