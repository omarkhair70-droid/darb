import archive from "@/content/records.json";
import type { Locale } from "./locale";

export type Bilingual = { ar:string; en:string };
export type ProjectKind = "exhibition"|"festival"|"programme"|"workshop"|"residency";
export type Project = {
  slug:string; kind:ProjectKind; year:number; sourcePage:number;
  dateLabel:Bilingual;title:Bilingual;description:Bilingual;
  image:string|null;imageAlt:Bilingual|null;venue:Bilingual|null;
  people:string[];related:string[];
};

export const projects = (archive as Project[]).sort(
  (a,b)=>b.year-a.year || a.slug.localeCompare(b.slug)
);

export function getProject(slug:string):Project|undefined {
  return projects.find(x=>x.slug===slug);
}
export function translate(value:Bilingual, locale:Locale):string{
  return value[locale];
}
export function filterProjects(query:string, kind:string) {
  const q=query.trim().toLocaleLowerCase();
  return projects.filter(x=>(kind==="all"||kind===x.kind)&&
    (!q||[x.title.ar,x.title.en,x.description.ar,x.description.en,String(x.year)]
      .some(value=>value.toLocaleLowerCase().includes(q))));
}
export const publicOrigin = "https://linktr.ee/darb1718";
