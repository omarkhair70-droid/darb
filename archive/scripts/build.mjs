import {rm,mkdir,copyFile,readFile,stat} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {dirname,resolve,join} from "node:path";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const repository=resolve(root,"..");
const out=join(root,"dist");
await rm(out,{recursive:true,force:true});
await mkdir(join(out,"media"),{recursive:true});
const files=[
 [join(root,"web","index.html"),join(out,"index.html")],
 [join(root,"web","styles.css"),join(out,"styles.css")],
 [join(root,"web","app.mjs"),join(out,"app.mjs")],
 [join(root,"src","graph.mjs"),join(out,"graph.mjs")],
 [join(root,"data","tales-of-fustat-001.json"),join(out,"story.json")]
];
// Exact embedded-image references in Darb 1718 Overview 2026.
// These media are contextually captioned in the application, not invented content.
const media=[
 [1,308,"jpeg"],[7,323,"jpeg"],
 [21,359,"jpeg"],[22,360,"jpeg"],
 [29,379,"png"],[30,380,"jpeg"],
 [34,389,"jpeg"],[35,390,"jpeg"],[38,393,"jpeg"],
 [39,400,"jpeg"],[40,401,"jpeg"],[41,402,"jpeg"],[42,403,"jpeg"],
 [53,435,"png"],[56,443,"png"],[61,448,"png"],
 [70,469,"jpeg"],[71,470,"jpeg"]
];
for(const [id,xref,ext] of media) {
  files.push([
    join(repository,"assets","original","pdf_image_0"+xref+"."+ext),
    join(out,"media",id+"."+ext)
  ]);
}
for(const [src,dest] of files){
 await copyFile(src,dest);
 const result=await stat(dest);
 if(result.size===0)throw new Error("Build produced an empty file: "+dest);
}
const document=await readFile(join(out,"index.html"),"utf8");
for(const id of ['id="canvas"','id="world"','id="runway"','id="reading"','src="/app.mjs"']){
 if(!document.includes(id))throw new Error("Missing spatial experience entry point: "+id);
}
console.log("Darb Archive: built continuous spatial experience with "+media.length+" original media objects.");
