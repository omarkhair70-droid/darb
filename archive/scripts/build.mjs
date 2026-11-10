import {rm,mkdir,copyFile,readFile,stat} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {dirname,resolve,join} from "node:path";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const repository=resolve(root,"..");
const out=join(root,"dist");
const catalog=JSON.parse(await readFile(join(root,"data","media-catalog.json"),"utf8"));
const chapterBook=JSON.parse(await readFile(join(root,"data","world-chapters.json"),"utf8"));

if(catalog.items.length!==77||catalog.recordCount!==77)throw new Error("Source catalog must retain all 77 records");
if(chapterBook.chapters.length<12)throw new Error("Archive chapter book is unexpectedly incomplete");
const ids=new Set(catalog.items.map(item=>item.id));
if(ids.size!==77)throw new Error("Duplicate source asset IDs");
for(const beat of chapterBook.chapters) if(beat.focusId!==null&&!ids.has(beat.focusId))throw new Error("Story beat missing asset "+beat.id);

await rm(out,{recursive:true,force:true});
await mkdir(join(out,"media"),{recursive:true});

const files=[
 ["web/index.html","index.html"],["web/styles.css","styles.css"],
 ["web/app.mjs","app.mjs"],["web/entrance-lab.mjs","entrance-lab.mjs"],
 ["src/entrance-ritual-v2.mjs","entrance-ritual-v2.mjs"],["src/graph.mjs","graph.mjs"],
 ["src/world-layout.mjs","world-layout.mjs"],
 ["data/tales-of-fustat-001.json","story.json"],
 ["data/media-catalog.json","catalog.json"],
 ["data/world-chapters.json","chapters.json"],
 ["data/curatorial-threads.json","threads.json"]
].map(([src,dst])=>[join(root,src),join(out,dst)]);

for(const item of catalog.items){
 const filename=item.sourceFilename;
 if(!/^pdf_image_\d+\.(jpeg|png)$/.test(filename))throw new Error("Unexpected source filename "+filename);
 files.push([join(repository,"assets","original",filename),join(out,item.src)]);
}
for(const [src,dest] of files){
 await copyFile(src,dest);
 const info=await stat(dest);
 if(info.size===0)throw new Error("Empty asset "+dest);
}
const markup=await readFile(join(out,"index.html"),"utf8");
for(const id of ['id="canvas"','id="world"','id="runway"','id="reading"','src="/app.mjs"']){
 if(!markup.includes(id))throw new Error("Missing spatial interface: "+id);
}
console.log("Darb Archive: "+catalog.items.length+" source objects, "
 +catalog.items.filter(x=>x.display).length+" exhibited, "
 +chapterBook.chapters.length+" guided camera moments. "
 +files.length+" build assets.");
