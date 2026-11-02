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
