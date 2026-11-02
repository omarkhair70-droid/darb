import { createClient } from "next-sanity";
import type { Project } from "./records";
import { projects } from "./records";

const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const sanity=projectId?createClient({
 projectId,dataset,apiVersion:"2026-02-01",useCdn:true
}):null;

const query='*[_type == "project" && published == true && editorialApproval == true] | order(year desc) {'+
  '"slug":slug.current,kind,year,sourcePage,title,description,dateLabel,venue,'+
  '"image":coverAssetName,imageAlt,"people":coalesce(peopleNames,[]),'+
  '"related":coalesce(related[]->slug.current,[])'+
'}';

// Sanity record approval is explicit. This initial integration reads only
// approved structured records and never exposes draft, private or restricted data.
function isValidProject(value:unknown):value is Project{
 if(!value||typeof value!=="object")return false;
 const v=value as Partial<Project>;
 return Boolean(v.slug && v.kind && v.year && v.title?.ar && v.title?.en &&
    v.description?.ar && v.description?.en && v.dateLabel?.ar && v.dateLabel?.en);
}
export async function getVisibleProjects():Promise<Project[]>{
 if(!sanity)return projects;
 try {
  const remote=await sanity.fetch<unknown[]>(query,{}, {next:{revalidate:120}});
  if(!Array.isArray(remote)||remote.length===0)return projects;
  const verified=remote.filter(isValidProject).map(p=>({
    ...p,
    sourcePage:typeof p.sourcePage==="number"?p.sourcePage:1,
    venue:p.venue?.ar&&p.venue?.en?p.venue:null,
    image:p.image && /^pdf_image_\d{4}\.(png|jpeg)$/.test(p.image)?p.image:null,
    imageAlt:p.imageAlt?.ar&&p.imageAlt?.en?p.imageAlt:null,
    people:Array.isArray(p.people)?p.people:[],
    related:Array.isArray(p.related)?p.related:[],
  }));
  return verified.length?verified:projects;
 } catch(error){
  console.error("Unable to load approved Sanity records",error);
  // The fallback is historical, provenance-labelled seed data, NOT a fake live feed.
  return projects;
 }
}
export async function getVisibleProject(slug:string){
 const all=await getVisibleProjects();return all.find(p=>p.slug===slug);
}
export async function searchVisibleProjects(q:string,kind:string){
 const all=await getVisibleProjects();const query=q.trim().toLocaleLowerCase();
 return all.filter(x=>(kind==="all"||x.kind===kind)&&
  (!query||[x.title.ar,x.title.en,x.description.ar,x.description.en,String(x.year)]
   .some(t=>t.toLocaleLowerCase().includes(query))));
}
