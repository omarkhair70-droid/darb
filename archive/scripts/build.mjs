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
const media=[39,40,41,42];
for(const no of media){
 const xref=no+361; // source image #39 = PDF XREF 400; #42 = PDF XREF 403
 files.push([join(repository,"assets","original","pdf_image_0"+xref+".jpeg"),join(out,"media",no+".jpeg")]);
}
for(const [src,dest] of files){
 await copyFile(src,dest);
 const result=await stat(dest);
 if(result.size===0)throw new Error("Build produced an empty file: "+dest);
}
const document=await readFile(join(out,"index.html"),"utf8");
if(!document.includes('src="/app.mjs"')||!document.includes('id="graphView"'))throw new Error("Missing required experience entry points");
console.log("Darb Archive: built "+files.length+" assets to dist/");
