import definitions from "@/content/reading-paths.json";
import type { Bilingual, Project } from "./records";

export type ReadingStep = {
  project: Project;
  insight: Bilingual;
};
export type ReadingPath = {
  id:string;
  label:Bilingual;
  proposition:Bilingual;
  summary:Bilingual;
  steps:ReadingStep[];
};
type Definition = {
  id:string;
  label:Bilingual;
  proposition:Bilingual;
  summary:Bilingual;
  steps:{ slug:string; insight:Bilingual }[];
};

// These paths are editorial comparisons, NOT factual claims that the same
// artist, maker, collaboration or programme spans multiple records.
// All referenced records must exist in the original sourced archive.
export function getReadingPaths(projects:Project[]):ReadingPath[] {
  const bySlug=new Map(projects.map(p=>[p.slug,p]));
  return (definitions as Definition[]).map(def=>({
    id:def.id,
    label:def.label,
    proposition:def.proposition,
    summary:def.summary,
    steps:def.steps.flatMap(step=>{
      const project=bySlug.get(step.slug);
      return project?[{project,insight:step.insight}]:[];
    }),
  })).filter(path=>path.steps.length>0);
}

export function validReadingSelection(
  paths:ReadingPath[],
  requestedPath:string|undefined,
  requestedStep:string|undefined,
){
  const path=paths.find(x=>x.id===requestedPath)||paths[0];
  if(!path)return {pathId:"",step:0};
  const numeric=Number(requestedStep);
  const step=requestedStep!==undefined&&/^\d+$/.test(requestedStep)&&Number.isInteger(numeric)
    ?Math.max(0,Math.min(numeric,path.steps.length-1)):0;
  return {pathId:path.id,step};
}
