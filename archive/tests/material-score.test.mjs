import test from "node:test";
import assert from "node:assert/strict";
import {FUSTAT_VIEWING_ROUTE,nextMaterialTrace,materialLanguage} from "../src/material-score.mjs";

const items=[
 {id:39,kind:"workshop_photo",cluster:"fustat"},
 {id:41,kind:"artwork_documentation",cluster:"fustat"},
 {id:42,kind:"artwork_documentation",cluster:"fustat"},
 {id:35,kind:"craft_photo",cluster:"residency"}
];
test("material language changes by actual medium, not a global gallery preset",()=>{
 assert.equal(materialLanguage(items[0]),"photography");
 assert.equal(materialLanguage(items[1]),"cyanotype");
 assert.equal(materialLanguage(items[2]),"print");
 assert.equal(materialLanguage(items[3]),"photography");
 assert.equal(materialLanguage(null),"paper");
});
test("three-stage editorial path is tied to one evidenced programme, never guessed artist causation",()=>{
 assert.deepEqual(Object.keys(FUSTAT_VIEWING_ROUTE),["39","41","42"]);
 assert.equal(nextMaterialTrace(39,items).to,41);
 assert.equal(nextMaterialTrace(41,items).to,42);
 assert.equal(nextMaterialTrace(42,items).to,39);
 for(const id of [39,41,42]){
  const e=nextMaterialTrace(id,items);
  assert.equal(e.kind,"editorial-viewing-sequence");
  assert.equal(e.source,"overview:p11");
  assert.ok(e.label.en&&e.label.ar&&e.context.en&&e.context.ar);
  assert.match(e.context.en,/not a|not an|not proof/i);
 }
 assert.equal(nextMaterialTrace(35,items),null);
 assert.equal(nextMaterialTrace(39,items.filter(x=>x.id!==41)),null);
 assert.equal(nextMaterialTrace(39,items.map(x=>({...x,cluster:"residency"}))),null);
});
