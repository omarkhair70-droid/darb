import {test,expect} from "@playwright/test";

// One end-to-end visitor route, not isolated unit checks: cloth → first eye →
// documentary source → cyanotype → printed traces → exact encounter retreat.
// Playback screenshots provide a review artifact, not art-direction approval.
async function settledArtwork(page,id){
  // Do not mistake an in-flight camera frame for a settled artwork.
  await expect(page.locator("#experience")).not.toHaveAttribute("data-material-arrival",/.+/,{timeout:4000});
  await page.waitForTimeout(600);
  const figure=page.locator('.artifact[data-id="'+id+'"]');
  const metrics=await figure.evaluate(el=>{
    const r=el.getBoundingClientRect(),img=el.querySelector("img");
    const visibleWidth=Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left));
    const visibleHeight=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top));
    return {visibleWidth,visibleHeight,screenWidth:innerWidth,screenHeight:innerHeight,
      imageLoaded:Boolean(img?.complete&&img?.naturalWidth)};
  });
  expect(metrics.imageLoaded).toBe(true);
  expect(metrics.visibleWidth).toBeGreaterThan(Math.min(120,metrics.screenWidth*.18));
  expect(metrics.visibleHeight).toBeGreaterThan(metrics.screenHeight*.12);
}
async function sourceRect(page,id){
  return page.locator('.artifact[data-id="'+id+'"]').evaluate(el=>{
    const r=el.getBoundingClientRect();
    return {x:r.x,y:r.y,width:r.width,height:r.height};
  });
}

test("woven threshold and Tales of Fustat remain one reversible world",async({page},info)=>{
 const errors=[];
 page.on("pageerror",error=>errors.push(error.message));
 await page.goto("/?entrance=v2");
 const textile=page.locator("#entranceLab");
 await expect(textile).toBeVisible();
 await textile.focus();
 for(let i=0;i<5;i++)await page.keyboard.press("ArrowDown");
 const witness=page.locator('[data-eye-entry="witness"]');
 await expect(witness).toBeEnabled();
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-01-unfurled.png"});
 await witness.click();
 await expect(textile).toBeHidden({timeout:5500});
 const world=page.locator("#experience");
 await expect(world).toHaveAttribute("data-mode","explore");
 await expect(world).toHaveAttribute("data-woven-source","39");
 await expect(page.locator(".artifact")).toHaveCount(72);
 await expect(page.locator("#detail")).toBeHidden();
 await expect(world).not.toHaveAttribute("data-arrival",/.+/,{timeout:4000});
 await page.waitForTimeout(600);
 const firstCamera=await sourceRect(page,39);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-02-world-arrival.png"});
 // Opening the source remains the visitor's choice after physically entering.
 await page.locator('.artifact[data-id="39"] button').evaluate(b=>b.click());
 await expect(world).toHaveAttribute("data-mode","encounter");
 await expect(world).toHaveAttribute("data-material-stage","photography");
 await expect(page.locator("#detail")).toBeVisible();
 await expect(page.locator("#relatedObjects .is-material-trace")).toHaveAttribute("data-material-trace","41");
 await settledArtwork(page,39);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-02b-documentary-settled.png"});
 await page.locator("#relatedObjects .is-material-trace").click();
 await expect(world).toHaveAttribute("data-material-stage","cyanotype");
 await expect(page.locator('.artifact[data-id="41"]')).toHaveClass(/is-encounter/);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-03a-cyanotype-crossing.png"});
 await settledArtwork(page,41);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-03-cyanotype-settled.png"});
 await expect(page.locator("#relatedObjects .is-material-trace")).toHaveAttribute("data-material-trace","42");
 await page.locator("#relatedObjects .is-material-trace").click();
 await expect(world).toHaveAttribute("data-material-stage","print");
 await expect(page.locator('.artifact[data-id="42"]')).toHaveClass(/is-encounter/);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-04a-printed-traces-crossing.png"});
 await settledArtwork(page,42);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-04-printed-traces-settled.png"});
 await page.locator("#closeDetail").click();
 await expect(world).toHaveAttribute("data-material-stage","cyanotype");
 await page.locator("#closeDetail").click();
 await expect(world).toHaveAttribute("data-material-stage","photography");
 await page.locator("#closeDetail").click();
 await expect(world).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#detail")).toBeHidden();
 await expect(page.locator(".artifact.is-encounter")).toHaveCount(0);
 await expect(page.locator(".artifact.is-material-origin")).toHaveCount(0);
 await expect(world).not.toHaveAttribute("data-material-stage",/.+/);
 await expect(world).toHaveAttribute("data-woven-source","39");
 await page.waitForTimeout(1800);
 const returnedCamera=await sourceRect(page,39);
 for(const key of ["x","y","width","height"]){
   expect(Math.abs(returnedCamera[key]-firstCamera[key]),"retrace should restore "+key+" of source #39").toBeLessThan(16);
 }
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-05-returned-world.png"});
 expect(errors).toEqual([]);
});

test("the same woven-to-source handoff works with reduced motion and Arabic",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/?entrance=v2");
 await page.locator("#ritualLanguage").click();
 await page.locator("#entranceLab").focus();
 for(let i=0;i<5;i++)await page.keyboard.press("ArrowDown");
 await page.locator('[data-eye-entry="witness"]').click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5500});
 await expect(page.locator("html")).toHaveAttribute("lang","ar");
 await page.locator('.artifact[data-id="39"] button').evaluate(b=>b.click());
 await expect(page.locator("#relatedObjects .is-material-trace")).toContainText("من الحكاية لأثر الضوء");
 await page.locator("#relatedObjects .is-material-trace").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","cyanotype");
 await page.locator("#closeDetail").click();
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
});
