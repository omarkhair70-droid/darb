import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import {resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root=resolve(fileURLToPath(new URL("..",import.meta.url)));
const read=(path)=>readFile(resolve(root,path),"utf8");
const references=[
 [1,308,"jpeg"],[7,323,"jpeg"],[21,359,"jpeg"],[22,360,"jpeg"],
 [29,379,"png"],[30,380,"jpeg"],[34,389,"jpeg"],[35,390,"jpeg"],
 [38,393,"jpeg"],[39,400,"jpeg"],[40,401,"jpeg"],[41,402,"jpeg"],
 [42,403,"jpeg"],[53,435,"png"],[56,443,"png"],[61,448,"png"],
 [70,469,"jpeg"],[71,470,"jpeg"]
];

test("the experience is one continuous spatial scene, not a collection of sections",async()=>{
 const html=await read("web/index.html");
 const script=await read("web/app.mjs");
 for(const id of ['id="canvas"','id="world"','id="artifacts"','id="runway"','id="narrative"','id="reading"','id="index"','id="detail"']){
  assert.ok(html.includes(id),id);
 }
 assert.ok(!html.includes("chapter-0"),"Legacy section-by-section story reintroduced");
 assert.ok(!html.includes('class="story-area"'),"Legacy split-column viewer reintroduced");
 for(const keyword of ["cameraForProgress","positionWorld","scrollProgress","pointermove","wheel","setLanguage","renderReading"]){
  assert.ok(script.includes(keyword),"Missing spatial mechanic: "+keyword);
 }
});

test("visual and interaction states are authored for real exploration",async()=>{
 const code=await read("web/app.mjs");
 const style=await read("web/styles.css");
 assert.match(code,/mode==="explore"/);
 assert.match(code,/setPointerCapture/);
 assert.match(code,/requestAnimationFrame/);
 assert.match(code,/document\.documentElement\.dir/);
 assert.ok(style.includes('.experience[data-mode="explore"]'));
 assert.ok(style.includes(".object-detail"));
 assert.ok(style.includes("@media(max-width:800px)"));
 assert.ok(style.includes("prefers-reduced-motion"));
 assert.ok(style.includes(".world"));
});

test("every source media entry exists in the supplied archive",async()=>{
 const repository=resolve(root,"..");
 const app=await read("web/app.mjs");
 for(const [id,xref,ext] of references){
  const path=resolve(repository,"assets","original","pdf_image_0"+xref+"."+ext);
  await access(path);
  assert.ok(app.includes("id:"+id+",xref:"+xref),"Missing authored source metadata for image "+id);
 }
 assert.ok(!/images\.unsplash|picsum|placeholder\.com/.test(app));
});

test("the media build references the exact original image IDs",async()=>{
 const script=await read("scripts/build.mjs");
 for(const [id,xref,ext] of references){
  assert.ok(script.includes("["+id+","+xref+",\""+ext+"\"]"),"Missing media from build: "+id);
 }
 assert.ok(script.includes('id="canvas"'));
 assert.ok(script.includes("media.length"));
});

test("the same content remains readable without spatial movement",async()=>{
 const app=await read("web/app.mjs");
 const html=await read("web/index.html");
 assert.ok(app.includes("renderReading()"));
 assert.ok(app.includes('$("#readingList")'));
 assert.ok(html.includes('id="backToScene"'));
 assert.ok(html.includes('class="skip"'));
 assert.ok(app.includes('setLanguage("en")'));
});

test("source assets are never silently remapped to other programs",async()=>{
 const app=await read("web/app.mjs");
 for(const id of [39,40,41,42]){
  assert.ok(app.includes("id:"+id+",xref:"+(id+361)+",page:11,project:\"Tales of Fustat\""));
 }
});
