import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {layoutCatalog,validateAtlas,WORLD_WIDTH,WORLD_HEIGHT,CLUSTERS} from "../src/world-layout.mjs";

const root=resolve(fileURLToPath(new URL("..",import.meta.url)));
const read=(path)=>readFile(resolve(root,path),"utf8");
const catalog=JSON.parse(await read("data/media-catalog.json"));
const chapters=JSON.parse(await read("data/world-chapters.json"));
const atlas=layoutCatalog(catalog);
const threads=JSON.parse(await read("data/curatorial-threads.json"));
const indexed=new Map(catalog.items.map(item=>[item.id,item]));

test("all 77 original source objects survive, including graphics and architectural plans",async()=>{
 assert.equal(catalog.items.length,77);
 assert.deepEqual(catalog.items.map(item=>item.id),Array.from({length:77},(_,i)=>i+1));
 assert.equal(new Set(catalog.items.map(item=>item.xref)).size,77);
 assert.equal(atlas.length,72);
 assert.deepEqual(catalog.items.filter(x=>!x.display).map(x=>x.id),[8,9,72,73,74]);
 assert.deepEqual(validateAtlas(catalog,atlas),[]);
 const rootRepo=resolve(root,"..");
 for(const item of catalog.items){
  await access(resolve(rootRepo,"assets","original",item.sourceFilename));
  assert.equal(item.src,"/media/"+item.id+"."+item.sourceFilename.split(".").pop());
  assert.ok(item.page>=1&&item.page<=21);
  assert.ok(item.project.ar&&item.project.en&&item.title.ar&&item.title.en);
 }
});

test("each editorial cluster has a stable place and the world can be explored continuously",()=>{
 const clusters=new Set(atlas.map(item=>item.cluster));
 assert.equal(clusters.size,17);
 for(const group of clusters)assert.ok(CLUSTERS[group],group);
 assert.ok(WORLD_WIDTH>=9000&&WORLD_HEIGHT>=6000);
 const first=layoutCatalog(catalog);
 assert.deepEqual(first.map(x=>[x.id,x.x,x.y]),atlas.map(x=>[x.id,x.x,x.y]));
});

test("sixteen source-led moments visit diverse programmes, with no fabricated person relations",()=>{
 assert.equal(chapters.chapters.length,16);
 assert.equal(new Set(chapters.chapters.map(x=>x.id)).size,16);
 const programClusters=new Set();
 for(const chapter of chapters.chapters){
  assert.equal(chapter.title.ar.length,2);
  assert.equal(chapter.title.en.length,2);
  assert.ok(chapter.body.ar&&chapter.body.en);
  if(chapter.focusId!==null){
   const item=indexed.get(chapter.focusId);
   assert.ok(item&&item.display);
   assert.equal(chapter.sourcePage,item.page);
   programClusters.add(item.cluster);
  }
 }
 assert.ok(programClusters.size>=10);
 for(const no of [39,41,42])assert.ok(chapters.chapters.some(ch=>ch.focusId===no));
});

test("the source world remains one scene with search, contextual threads and variable camera",async()=>{
 const html=await read("web/index.html"),app=await read("web/app.mjs"),css=await read("web/styles.css");
 for(const id of ['id="canvas"','id="world"','id="artifacts"','id="runway"','id="reading"','id="index"','id="detail"','id="archiveSearch"','id="relatedObjects"']){
  assert.ok(html.includes(id),id);
 }
 assert.ok(!html.includes('class="story-area"'));
 for(const keyword of ["layoutCatalog","validateAtlas","cameraForProgress","positionWorld","scrollProgress","pointermove","wheel","renderSearch","nearestChapterFor","renderReading","setLanguage"]){
  assert.ok(app.includes(keyword),keyword);
 }
 assert.ok(css.includes("1600svh"));
 assert.ok(css.includes(".zone-label")&&css.includes(".related-item"));
 assert.ok(css.includes("@media(max-width:800px)"));
 assert.ok(css.includes("prefers-reduced-motion"));
});

test("build copies every original media format without pretending PNGs are JPEGs",async()=>{
 const script=await read("scripts/build.mjs");
 assert.ok(script.includes("catalog.items"));
 assert.ok(script.includes("sourceFilename"));
 assert.ok(script.includes("77"));
 assert.ok(script.includes("media-catalog.json"));
 assert.ok(script.includes("world-chapters.json"));
 assert.equal(indexed.get(29).sourceFilename.endsWith(".png"),true);
 assert.equal(indexed.get(53).sourceFilename.endsWith(".png"),true);
 assert.equal(indexed.get(56).sourceFilename.endsWith(".png"),true);
 assert.equal(indexed.get(61).sourceFilename.endsWith(".png"),true);
});

test("known Fustat images retain exact archival references",()=>{
 for(const no of [39,40,41,42]){
  const item=indexed.get(no);
  assert.equal(item.page,11);
  assert.equal(item.xref,no+361);
  assert.equal(item.cluster,"fustat");
 }
 assert.equal(indexed.get(51).cluster,"sector");
 assert.equal(indexed.get(75).role,"plan");
 assert.equal(indexed.get(73).display,false);
});


test("curatorial bridges are named comparisons with distinct programme source pages",()=>{
 assert.equal(threads.connections.length,9);
 for(const thread of threads.connections){
  assert.equal(thread.type,"editorial-comparison");
  const from=indexed.get(thread.fromId),to=indexed.get(thread.toId);
  assert.equal(from.cluster,thread.fromCluster);
  assert.equal(to.cluster,thread.toCluster);
  assert.notEqual(from.cluster,to.cluster);
  assert.deepEqual(thread.sourcePages,[from.page,to.page]);
  assert.ok(thread.title.ar&&thread.title.en&&thread.description.ar&&thread.description.en);
 }
});

test("cross-programme paths remain in the spatial scene and explain their editorial nature",async()=>{
 const app=await read("web/app.mjs"),css=await read("web/styles.css"),build=await read("scripts/build.mjs");
 assert.ok(app.includes("threads.connections"));
 assert.ok(app.includes('thread.type!=="editorial-comparison"'));
 assert.ok(app.includes("OTHER PRACTICES · CURATED CONNECTIONS"));
 assert.ok(css.includes(".curatorial-thread"));
 assert.ok(css.includes(".thread-item"));
 assert.ok(build.includes("curatorial-threads.json"));
});


test("each cinematic camera beat has a deliberate, safe framing point",async()=>{
 for(const chapter of chapters.chapters){
  assert.ok(chapter.frameX>=.30&&chapter.frameX<=.70,chapter.id);
 }
 const source=await read("web/app.mjs");
 assert.ok(source.includes("fx:lerp("));
 assert.ok(source.includes("camera.fx=ch.frameX"));
 assert.ok(source.includes("focusX=viewport.w"));
});

test("DOM iteration never mistakes a single element for a NodeList",async()=>{
 const app=await read("web/app.mjs");
 // "$" = querySelector; "$$" = querySelectorAll. ForEach requires the latter.
 assert.doesNotMatch(app,/(^|[^$])\$\([^\n]*?\)\.forEach\s*\(/gm);
});
