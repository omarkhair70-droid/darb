import {test,expect} from "@playwright/test";

test("seventy-two archival objects inhabit a continuous world, on desktop and mobile",async({page},info)=>{
 const errors=[];
 page.on("pageerror",error=>errors.push(String(error)));
 await page.goto("/");
 await expect(page.locator("#canvas")).toBeVisible();
 await expect(page.locator(".artifact")).toHaveCount(72);
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await expect(page.locator("#statement")).toContainText("An archive");
 await expect(page.locator("#readingList li")).toHaveCount(16);
 await page.waitForTimeout(800);
 await page.screenshot({path:"test-results/"+info.project.name+"-opening.png"});
 await page.locator("#modeBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#spatialHint")).toBeVisible();
 await page.locator('.artifact[data-id="39"] button').evaluate(button=>button.click());
 await expect(page.locator("#detail")).toBeVisible();
 await expect(page.locator("#detail")).toContainText("Tales of Fustat");
 await expect(page.locator("#relatedObjects .related-item:not(.thread-item)")).toHaveCount(3);
 await page.locator("#localeBtn").click();
 await expect(page.locator("html")).toHaveAttribute("lang","ar");
 await expect(page.locator("#detailTitle")).toContainText("الفسطاط");
 await page.locator("#closeDetail").click();
 await page.locator("#modeBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await page.evaluate(()=>window.scrollTo({top:window.innerHeight*3,behavior:"instant"}));
 await expect(page.locator("#experience")).toHaveAttribute("data-beat",/[2-4]/);
 await page.waitForTimeout(950);
 await page.screenshot({path:"test-results/"+info.project.name+"-spatial-journey.png"});
 expect(errors).toEqual([]);
});

test("the full archive is searchable, indexable and accessible as real source assets",async({page})=>{
 await page.goto("/");
 for(const path of ["/media/1.jpeg","/media/39.jpeg","/media/40.jpeg","/media/41.jpeg","/media/42.jpeg","/media/53.png","/media/56.png","/media/61.png","/media/75.jpeg","/catalog.json","/chapters.json"]){
  const response=await page.request.get(path);
  expect(response.status(),path).toBe(200);
 }
 await page.locator("#indexBtn").click();
 await expect(page.locator("#indexItems .index-item")).toHaveCount(17);
 await page.locator("#archiveSearch").fill("cyanotype");
 await expect(page.locator("#searchResults .search-hit")).toHaveCount(2);
 await page.locator("#searchResults .search-hit").first().click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("#detail")).toBeVisible();
 await page.locator("#closeDetail").click();
 await page.locator("#indexBtn").click();
 await page.locator("#archiveSearch").fill("");
 await page.locator("#indexItems .index-item").nth(8).click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator(".story-area")).toHaveCount(0);
 await expect(page.locator("#world")).toBeVisible();
});

test("all program clusters and source captions survive locale switching",async({page})=>{
 await page.goto("/");
 await expect(page.locator(".zone-label")).toHaveCount(17);
 const catalog=await (await page.request.get("/catalog.json")).json();
 expect(catalog.items).toHaveLength(77);
 expect(catalog.items.filter(x=>x.display)).toHaveLength(72);
 await page.locator("#localeBtn").click();
 await expect(page.locator("html")).toHaveAttribute("lang","ar");
 await expect(page.locator('.artifact[data-id="39"] figcaption')).toContainText("الفسطاط");
 await page.locator("#indexBtn").click();
 await page.locator("#archiveSearch").fill("جسور");
 await expect(page.locator("#searchResults .search-hit")).toHaveCount(5);
});


test("a visitor can follow a labelled editorial thread between different programmes",async({page})=>{
 await page.goto("/");
 const threads=await (await page.request.get("/threads.json")).json();
 expect(threads.connections).toHaveLength(9);
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="41"] button').evaluate(button=>button.click());
 await expect(page.locator("#detail")).toBeVisible();
 await expect(page.locator("#detailMeta")).toContainText("Tales of Fustat");
 await expect(page.locator("#relatedObjects .thread-item")).toHaveCount(2);
 await page.locator("#relatedObjects .thread-item").first().click();
 await expect(page.locator("#detailMeta")).toContainText("Natalia Ossef residency");
 await expect(page.locator("#detailTitle")).not.toContainText("Cyanotype");
});


test("real pointer interaction reaches visible archive objects; scale controls work",async({page})=>{
 await page.goto("/");
 await page.locator("#modeBtn").click();
 await expect(page.locator("#spatialControls")).toBeVisible();
 await page.waitForTimeout(500);
 const hit=await page.evaluate(()=>{
  const viewWidth=innerWidth,viewHeight=innerHeight;
  for(const button of document.querySelectorAll(".artifact-inner")){
   const r=button.getBoundingClientRect();
   const cx=(Math.max(0,r.left)+Math.min(viewWidth,r.right))/2;
   const cy=(Math.max(0,r.top)+Math.min(viewHeight,r.bottom))/2;
   if(r.width<8||r.height<8||r.right<0||r.bottom<0||r.left>viewWidth||r.top>viewHeight)continue;
   const element=document.elementFromPoint(cx,cy);
   if(element?.closest(".artifact-inner")===button)return {x:cx,y:cy,id:button.parentElement.dataset.id};
  }
  return null;
 });
 expect(hit).not.toBeNull();
 await page.mouse.click(hit.x,hit.y);
 await expect(page.locator("#detail")).toBeVisible();
 await page.locator("#closeDetail").click();
 const before=await page.locator("#world").evaluate(el=>el.style.transform);
 await page.locator("#zoomIn").click();
 await page.waitForTimeout(550);
 const after=await page.locator("#world").evaluate(el=>el.style.transform);
 expect(after).not.toBe(before);
 await page.locator("#resetView").click();
 await expect(page.locator("#detail")).toBeHidden();
});


test("D identity grows from real archive knots into an artwork, then reverses without a drawer",async({page},info)=>{
 const errors=[];
 page.on("pageerror",error=>errors.push(String(error)));
 await page.goto("/");
 await expect(page.locator("#memorySignature")).toBeVisible();
 await expect(page.locator("#memorySignature [data-open-object]")).toHaveCount(4);
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await page.locator('.signature-knot[data-open-object="41"]').click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("#canvas")).toHaveAttribute("data-material","cyanotype");
 await expect(page.locator("#detail")).toBeVisible();
 await expect(page.locator("#detailTitle")).toContainText("blue");
 await expect(page.locator('.artifact[data-id="41"]')).toHaveClass(/is-encounter/);
 const panelStyle=await page.locator("#detail").evaluate(el=>{
  const s=getComputedStyle(el);
  return {background:s.backgroundColor,shadow:s.boxShadow,position:s.position};
 });
 expect(panelStyle.background).toBe("rgba(0, 0, 0, 0)");
 expect(panelStyle.shadow).toBe("none");
 expect(panelStyle.position).toBe("fixed");
 await page.waitForTimeout(1700);
 const focus=await page.locator('.artifact[data-id="41"]').evaluate(element=>{
  const r=element.getBoundingClientRect();
  return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,
    viewportWidth:innerWidth,viewportHeight:innerHeight};
 });
 expect(focus.right).toBeGreaterThan(focus.viewportWidth*.27);
 expect(focus.left).toBeLessThan(focus.viewportWidth*.92);
 expect(focus.bottom).toBeGreaterThan(focus.viewportHeight*.12);
 expect(focus.top).toBeLessThan(focus.viewportHeight*.88);
 expect(focus.width).toBeGreaterThan(90);
 await page.screenshot({path:"test-results/"+info.project.name+"-cyanotype-encounter.png"});
 await page.locator("#relatedObjects .thread-item").first().click();
 await expect(page.locator("#detailMeta")).toContainText("Natalia Ossef residency");
 await page.keyboard.press("Escape");
 await expect(page.locator("#detailMeta")).toContainText("Tales of Fustat");
 await page.keyboard.press("Escape");
 await expect(page.locator("#detail")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await expect(page.locator("#memorySignature")).toBeVisible();
 expect(errors).toEqual([]);
});

test("a documentary image has its own contextual atmosphere and Arabic copy",async({page})=>{
 await page.goto("/");
 await page.locator('.signature-knot[data-open-object="39"]').click();
 await expect(page.locator("#canvas")).toHaveAttribute("data-material","photography");
 await page.locator("#localeBtn").click();
 await expect(page.locator("#detailTitle")).toContainText("الفسطاط");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
});


test("black circle opens an archive constellation, not the old heading and list",async({page},info)=>{
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/");
 await expect(page.locator("#index")).toBeHidden();
 const before=await page.locator("#world").evaluate(el=>el.style.transform);
 await page.locator("#indexBtn").click();
 await expect(page.locator("#index")).toBeVisible();
 await expect(page.locator("#index")).toHaveAttribute("role","dialog");
 await expect(page.locator("#index")).toHaveClass(/is-open/);
 await expect(page.locator("#experience")).toHaveAttribute("data-atlas","open");
 await expect(page.locator("#indexItems .atlas-node")).toHaveCount(17);
 await expect(page.locator("#atlasLines path")).toHaveCount(9);
 await expect(page.locator("#index h2")).toContainText("Not one beginning");
 expect(await page.locator("#indexItems").evaluate(el=>getComputedStyle(el).display)).toBe("block");
 const font=await page.locator("#index h2").evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
 expect(font).toBeLessThanOrEqual(45);
 await page.waitForTimeout(1300);
 const during=await page.locator("#world").evaluate(el=>el.style.transform);
 expect(during).not.toBe(before);
 await page.screenshot({path:"test-results/"+info.project.name+"-archive-compass.png"});
 await page.keyboard.press("Escape");
 await expect(page.locator("#experience")).not.toHaveAttribute("data-atlas","open");
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#indexBtn")).toHaveAttribute("aria-expanded","false");
 expect(errors).toEqual([]);
});

test("a real archive constellation click moves the camera into its own image cluster",async({page})=>{
 await page.goto("/");
 await page.locator("#indexBtn").click();
 await page.locator('.atlas-node[data-cluster="fustat"]').click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await page.waitForTimeout(1400);
 const visible=await page.locator('.artifact[data-cluster="fustat"]').evaluateAll(elements=>{
  const bounds=elements.map(el=>el.getBoundingClientRect());
  return bounds.some(rect=>rect.right>0&&rect.bottom>0&&rect.left<innerWidth&&rect.top<innerHeight);
 });
 expect(visible).toBe(true);
 await page.locator("#indexBtn").click();
 await page.locator("#localeBtn").click();
 await expect(page.locator(".atlas-node.is-selected")).toContainText("الفسطاط");
 await page.locator("#closeIndex").click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
});
