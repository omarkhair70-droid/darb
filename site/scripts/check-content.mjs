import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "src/content/records.json"), "utf8"));
const slugs = new Set();
const types = new Set(["exhibition", "programme", "residency", "workshop", "festival"]);
for (const item of catalog) {
  assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug");
  assert(!slugs.has(item.slug), "Duplicate slug: " + item.slug);
  slugs.add(item.slug);
  assert(types.has(item.kind), "Unknown kind: " + item.kind);
  assert(item.title?.ar && item.title?.en, "Missing bilingual title: " + item.slug);
  assert(item.description?.ar && item.description?.en, "Missing bilingual description: " + item.slug);
  assert(item.sourcePage >= 1 && item.sourcePage <= 21, "Out-of-range source page");
  assert(item.year <= 2026, "Future source event");
  if (item.image) {
    assert.match(item.image, /^pdf_image_\d{4}\.(?:png|jpeg)$/, "Invalid image");
  }
}
console.log("Validated " + catalog.length + " curated bilingual project records, all grounded in overview pages.");

const paths = JSON.parse(await readFile(path.join(root,"src/content/reading-paths.json"),"utf8"));
const pathIds=new Set();
for(const pathRecord of paths){
  assert(/^[a-z0-9]+$/.test(pathRecord.id),"Invalid path ID");
  assert(!pathIds.has(pathRecord.id),"Duplicate reading path ID");
  pathIds.add(pathRecord.id);
  assert(pathRecord.label?.ar&&pathRecord.label?.en);
  assert(pathRecord.proposition?.ar&&pathRecord.proposition?.en);
  assert(pathRecord.steps?.length>=2,"Reading path must contain at least 2 actual records");
  const seen=new Set();
  for(const step of pathRecord.steps){
    assert(slugs.has(step.slug),"Unknown source in reading path: "+step.slug);
    assert(!seen.has(step.slug),"Repeated scene within one reading path: "+step.slug);
    seen.add(step.slug);
    assert(step.insight?.ar&&step.insight?.en);
  }
}
console.log("Validated "+paths.length+" bilingual thematic reading paths with real source records.");

const films=JSON.parse(await readFile(path.join(root,"src/content/artworks.json"),"utf8"));
const people=JSON.parse(await readFile(path.join(root,"src/content/people.json"),"utf8"));
const evidence=JSON.parse(await readFile(path.join(root,"src/content/evidence.json"),"utf8"));
const personIds=new Set(people.map(p=>p.id)),sourceIds=new Set(evidence.map(s=>s.id));
const filmSlugs=new Set();
for(const film of films){
 assert(film.type==="film" && film.title.ar && film.title.en,"Incomplete film");
 assert(!filmSlugs.has(film.slug),"Duplicate film slug");
 filmSlugs.add(film.slug);
 assert(personIds.has(film.creatorId),"Film missing credited maker: "+film.slug);
 assert(slugs.has(film.programmeId),"Film missing programme: "+film.slug);
 assert(film.sourceIds.length>0 && film.sourceIds.every(id=>sourceIds.has(id)),"Film ungrounded");
 assert(film.screeningDate===null && film.currentEvent===null,"No invented current or historic screening date");
 assert(film.media.internalLicense==="not-held","No invented licensed media");
 if(film.media.kind==="official-embed"){
   assert(film.media.provider==="youtube" && /^[A-Za-z0-9_-]{11}$/.test(film.media.id),"Invalid publisher embed");
   assert(film.media.videoUrl==="https://www.youtube.com/watch?v="+film.media.id,"External publisher URL mismatch");
 }
}
for(const person of people){
 assert(person.sourceIds.every(id=>sourceIds.has(id)),"Person lacks evidence");
 assert(person.name.ar && person.name.en,"Person needs both languages");
}
console.log("Validated "+films.length+" attributed film records, "+people.length+" people and "+evidence.length+" source entries.");
