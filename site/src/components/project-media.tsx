import Image from "next/image";
import type { Project } from "@/lib/records";
import type { Locale } from "@/lib/locale";

export function ProjectMedia({project,lang,priority=false}:{project:Project;lang:Locale;priority?:boolean}) {
  if(!project.image){
    return <div className="project-media image-unavailable" role="img" aria-label={project.title[lang]}>
      <span>{lang==="ar"?"من الأرشيف":"FROM THE ARCHIVE"}</span>
      <strong>{project.title[lang]}</strong>
    </div>;
  }
  return <div className="project-media">
    <Image alt={project.imageAlt?.[lang]||project.title[lang]}
      src={"/media/"+project.image}
      fill
      priority={priority}
      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 75vw"
      className="archive-image"/>
  </div>;
}
