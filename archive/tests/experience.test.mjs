import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
const root=resolve(fileURLToPath(new URL("..",import.meta.url)));
const read=(path)=>readFile(resolve(root,path),"utf8");

test("the archive is a standalone, bilingual source-linked application",async()=>{
 const html=await read("web/index.html");
 const script=await read("web/app.mjs");
 for(const selector of ['id="entry"','id="chapters"','id="visualStage"','id="graphView"','id="graphNodeLayer"','id="graphInspector"']){
  assert.ok(html.includes(selector),selector);
 }
 assert.match(script,/getConnections/);
 assert.match(script,/followEdge/);
 assert.match(script,/retrace/);
 assert.match(script,/validateArchive/);
 assert.match(script,/setLanguage/);
 assert.match(script,/renderChapters/);
 assert.match(script,/renderNodes/);
 assert.match(script,/prefers-reduced-motion/);
});

test("all original image IDs are referenced, not remote stock assets",async()=>{
 const markup=await read("web/index.html");
 for(const id of [39,40,41,42]){
  assert.ok(markup.includes("/media/"+id+".jpeg"),"media "+id);
 }
 assert.ok(!/images\.unsplash|placehold|picsum|imgur/.test(markup));
});

test("story and relation map have distinct interfaces",async()=>{
 const css=await read("web/styles.css");
 assert.ok(css.includes(".story-area"));
 assert.ok(css.includes(".graph-view"));
 for(const step of [1,2,3,4]){
  assert.ok(css.includes('[data-step="'+step+'"]'),"No authored stage "+step);
 }
 assert.ok(css.includes("@media(max-width:750px)"));
 assert.ok(css.includes("prefers-reduced-motion"));
});

test("build source media files exist in the repository",async()=>{
 const repository=resolve(root,"..");
 for(const xref of [400,401,402,403])await access(resolve(repository,"assets","original","pdf_image_0"+xref+".jpeg"));
});
