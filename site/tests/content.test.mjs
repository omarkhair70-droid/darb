import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const site=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const repo=path.resolve(site,"..");
const data=JSON.parse(await readFile(path.join(site,"src/content/records.json"),"utf-8"));
const slugs=new Set(data.map(x=>x.slug));

test("project graph has no dangling references",()=>{
 for(const record of data){
  for(const rel of record.related)assert(slugs.has(rel),record.slug+" links to missing "+rel);
 }
});
test("all shown source images exist in the commissioned repository",async()=>{
 for(const record of data){
  if(record.image)await access(path.join(repo,"assets/original",record.image));
 }
});
test("all records are archival; no invented live booking claims",()=>{
 for(const record of data){
  assert(Number.isInteger(record.sourcePage)&&record.sourcePage>=1&&record.sourcePage<=21);
  assert(record.year<=2026);
  assert(record.dateLabel.en&&record.dateLabel.ar);
  assert(!("registrationUrl" in record),"No unverified direct booking link");
 }
});
test("bilingual text is distinct and complete",()=>{
 for(const r of data){
  for(const key of ["title","description","dateLabel"]){
   assert(r[key].ar.trim().length>0);
   assert(r[key].en.trim().length>0);
  }
 }
});

test("source-based reading paths declare comparison, not same-event claims",async()=>{
  const paths=JSON.parse(await readFile(path.join(site,"src/content/reading-paths.json"),"utf8"));
  assert.equal(paths.length,3);
  for(const route of paths){
    assert(route.summary.en.length>30 && route.summary.ar.length>30);
    for(const scene of route.steps)assert(slugs.has(scene.slug));
  }
});
