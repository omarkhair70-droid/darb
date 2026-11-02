import { cp, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const source=path.resolve(siteRoot,"../assets/original");
const target=path.resolve(siteRoot,"public/media");
// Reviewed sample documents, sourced via the 21-page 2026 Darb PDF.
// Do not conflate separate craft workshops or unnamed performance events.
const selected=[
 "pdf_image_0308.jpeg","pdf_image_0323.jpeg",
 "pdf_image_0359.jpeg","pdf_image_0360.jpeg",
 "pdf_image_0379.png","pdf_image_0390.jpeg",
 "pdf_image_0402.jpeg","pdf_image_0403.jpeg",
 "pdf_image_0445.png","pdf_image_0449.png",
 "pdf_image_0465.jpeg","pdf_image_0469.jpeg","pdf_image_0470.jpeg"
];
await mkdir(target,{recursive:true});
for(const file of selected){
 const from=path.join(source,file);
 try{await stat(from);}catch{
   throw new Error("Missing PDF source object "+from+". Build must have ../assets/original.");
 }
 await cp(from,path.join(target,file));
}
console.log("Prepared "+selected.length+" existing Darb PDF media objects.");
