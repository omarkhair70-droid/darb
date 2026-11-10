import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"../dist");
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".mjs":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".jpeg":"image/jpeg"};
const port=Number(process.env.PORT || 4173);
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url||"/","http://localhost");
  const target=resolve(root,"."+decodeURIComponent(url.pathname==="/"?"/index.html":url.pathname));
  if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403);res.end("Forbidden");return;}
  const info=await stat(target);
  if(!info.isFile())throw new Error("Not a file");
  const data=await readFile(target);
  res.writeHead(200,{"content-type":mime[extname(target)]||"application/octet-stream","cache-control":"no-store"});
  res.end(data);
 }catch(_error){res.writeHead(404,{"content-type":"text/plain"});res.end("Not found");}
}).listen(port,()=>console.log("Darb Archive available at http://localhost:"+port));
