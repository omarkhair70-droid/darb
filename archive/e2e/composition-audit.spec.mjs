import {test,expect} from "@playwright/test";
import {mkdirSync,writeFileSync} from "node:fs";

/** Evidence audit: 16 beats, Arabic and English, actual desktop/mobile viewports.
 * Text is allowed to interact with source imagery; overlapping UI chrome and
 * clipped text are recorded as problems rather than treated as aesthetic. */
test("sixteen chapters: flag clipped and overlapping interface text",async({page},info)=>{
 test.setTimeout(120_000);
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=legacy");
 await expect(page.locator(".artifact")).toHaveCount(72);
 await expect(page.locator("#readingList li")).toHaveCount(16);
 await page.addStyleTag({content:".narrative,.narrative *, .axis,.instruction,.chrome {transition:none!important;animation:none!important}"});
 const scenes=[];
 const capture=new Set([0,3,7,11,15]);
 for(const language of ["en","ar"]){
  if(language==="ar")await page.locator("#localeBtn").click();
  for(let index=0;index<16;index++){
   const report=await page.evaluate(async(index)=>{
    const root=document.querySelector("#experience");
    const limit=Math.max(1,root.offsetHeight-innerHeight);
    window.scrollTo({top:root.offsetTop+limit*(index===15?14.99:index)/15,behavior:"instant"});
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    const selectors=["#narrativeOverline","#statementA","#statementB",
     "#narrativeBody","#chapterSource",".chrome .identity",".chrome-center",
     ".chrome-actions","#axis","#instruction"];
    const rects=Object.fromEntries(selectors.map(k=>{
     const el=document.querySelector(k);if(!el)return [k,null];
     const c=getComputedStyle(el),r=el.getBoundingClientRect();
     return [k,{x:r.x,y:r.y,w:r.width,h:r.height,
      visible:c.display!=="none"&&c.visibility!=="hidden"&&parseFloat(c.opacity)>.12&&r.width>0&&r.height>0}];
    }));
    const overlap=(a,b)=>!a?.visible||!b?.visible?0:
     Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*
     Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));
    const issues=[];
    for(const t of selectors.slice(0,5)){
     const r=rects[t];if(!r?.visible)continue;
     if(r.y< -5||r.y+r.h>innerHeight+5||r.x< -5||r.x+r.w>innerWidth+5)
      issues.push({kind:"offscreen-text",source:t,box:r});
     for(const c of selectors.slice(5)){
      const control=rects[c],pixels=overlap(r,control);
      if(control?.visible&&pixels>250&&pixels/Math.min(r.w*r.h,control.w*control.h)>.07)
       issues.push({kind:"text-over-control",source:t,target:c,area:Math.round(pixels)});
     }
    }
    return {index,language:document.documentElement.lang,beat:root.dataset.beat,
     width:innerWidth,height:innerHeight,issues};
   },index);
   scenes.push(report);
   if(capture.has(index)){
    await page.screenshot({path:"test-results/"+info.project.name+"-"+language+"-beat-"+String(index+1).padStart(2,"0")+"-composition.png",animations:"disabled"});
   }
  }
 }
 mkdirSync("test-results",{recursive:true});
 const flagged=scenes.filter(s=>s.issues.length);
 writeFileSync("test-results/"+info.project.name+"-composition-audit.json",
  JSON.stringify({project:info.project.name,checked:scenes.length,flagged},null,2));
 console.log("COMPOSITION_AUDIT",info.project.name,JSON.stringify({
  scenes:scenes.length,flaggedScenes:flagged.map(s=>s.language+":"+(s.index+1)),
  findings:flagged.reduce((n,s)=>n+s.issues.length,0)
 }));
 expect(scenes).toHaveLength(32);
 expect(errors).toEqual([]);
});