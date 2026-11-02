import originalWorks from "@/content/artworks.json";
import originalPeople from "@/content/people.json";
import originalEvidence from "@/content/evidence.json";
import type { Bilingual } from "@/lib/records";

export type WorkRecord = {
  slug: string; type: "film"; title: Bilingual;
  creatorId: string; creatorRole: Bilingual; programmeId: string;
  subject: Bilingual|null; artisticContext: Bilingual|null;
  sourceIds: string[];
  media: {kind: "official-embed"|"no-media"; provider?: string; id?: string;
    videoUrl?: string; publishedBy?: string; uploadedAt?: string;
    internalLicense:"not-held"; mode?:string};
  screeningDate: null; currentEvent: null; publicationState:"research-preview";
  rightsNotes: Bilingual;
};
export type PersonRecord = {
 id:string;name:Bilingual;role:Bilingual|null;bio:Bilingual|null;
 sourceIds:string[];image:null;
};
export type EvidenceRecord = {
 id:string;label:string;url:string|null;kind:string;purpose:string;
};
export const workRecords=originalWorks as WorkRecord[];
export const personRecords=originalPeople as PersonRecord[];
export const sourceRecords=originalEvidence as EvidenceRecord[];
export function workBySlug(slug:string){return workRecords.find(x=>x.slug===slug);}
export function personById(id:string){return personRecords.find(x=>x.id===id);}
export function worksByProgramme(id:string){return workRecords.filter(x=>x.programmeId===id);}
export function sourcesFor(ids:string[]){return ids.flatMap(id=>{
  const source=sourceRecords.find(x=>x.id===id);
  return source?[source]:[];
});}
export function officialYouTubeEmbed(work:WorkRecord):string|null {
  const m=work.media;
  if(m.kind!=="official-embed" || m.provider!=="youtube" || !m.id || !/^[A-Za-z0-9_-]{11}$/.test(m.id))return null;
  // The standard official YouTube privacy-enhanced embed is a publisher-
  // controlled remote player; it does not rehost, download or edit a film.
  return "https://www.youtube-nocookie.com/embed/"+m.id+"?rel=0";
}
