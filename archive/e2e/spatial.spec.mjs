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
 await expect(page.locator("#detailTitle")).toContainText("Tales of Fustat");
 await expect(page.locator("#relatedObjects .thread-item")).toHaveCount(2);
 await page.locator("#relatedObjects .thread-item").first().click();
 await expect(page.locator("#detailTitle")).toContainText("Natalia Ossef residency");
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
 await expect(page.locator("#detailText")).toContainText("Cyanotype");
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
 await expect(page.locator("#detailTitle")).toContainText("Natalia Ossef residency");
 await page.keyboard.press("Escape");
 await expect(page.locator("#detailTitle")).toContainText("Tales of Fustat");
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


test("the editorial compass keeps its title clear and its selected thread enters the same world",async({page})=>{
 await page.goto("/");
 await page.locator("#indexBtn").click();
 await expect(page.locator("#indexItems .atlas-node")).toHaveCount(17);
 if(page.viewportSize().width>800){
  const result=await page.evaluate(()=>{
   const a=document.querySelector("#index h2").getBoundingClientRect();
   const b=document.querySelector('.atlas-node[data-cluster="place"]').getBoundingClientRect();
   return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  });
  expect(result).toBe(false);
 }
 await page.locator('.atlas-node[data-cluster="residency"]').hover({force:true});
 await expect(page.locator("#atlasFocusTitle")).toContainText("Residency");
 await page.locator("#atlasEnter").click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#detail")).toBeHidden();
});


test("the last moment weaves the visitor's actual route instead of opening a final page",async({page},info)=>{
 await page.goto("/");
 for(const beat of [2,4,6,9,12,15]){
  await page.evaluate(i=>{
   const e=document.getElementById("experience");
   window.scrollTo({top:e.offsetTop+(e.offsetHeight-innerHeight)*i/15,behavior:"instant"});
  },beat);
  await page.waitForTimeout(280);
 }
 await expect(page.locator("#experience")).toHaveAttribute("data-beat","15");
 await expect(page.locator("#experience")).toHaveClass(/is-final-memory/);
 const route=page.locator("#memoryTrail path");
 expect(await route.count()).toBeGreaterThanOrEqual(3);
 await expect(page.locator("#memoryTrail")).toBeVisible();
 await page.screenshot({path:"test-results/"+info.project.name+"-no-final-frame.png"});
 await page.locator("#nextBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#experience")).not.toHaveClass(/is-final-memory/); // updated when journey mode exits
 await expect(page.locator(".artifact")).toHaveCount(72);
});


test("the visitor sees image captions and provenance inside Darb, never developer PDF or GitHub links",async({page},info)=>{
 const errors=[];let popups=0;
 page.on("pageerror",e=>errors.push(e.message));
 page.on("popup",()=>popups++);
 await page.goto("/");
 const originalCatalog=await (await page.request.get("/catalog.json")).json();
 const image=originalCatalog.items.find(entry=>entry.id===18);
 expect(image.page).toBe(5);
 expect(image.xref).toBe(345);
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="18"] button').evaluate(button=>button.click());
 await expect(page.locator("#detailTitle")).toHaveText("UNSPOKEN");
 await expect(page.locator("#detailText")).toHaveText(image.title.en);
 await expect(page.locator("#detailMarker")).not.toContainText(/PDF|XREF/);
 await expect(page.locator("#detailMeta")).not.toContainText(/PDF|XREF/);
 await expect(page.locator("#sourceBtn")).toHaveText("ABOUT THIS IMAGE");
 await expect(page.locator("#detailSourceNote")).toBeHidden();
 await page.locator("#sourceBtn").click();
 await expect(page.locator("#detailSourceNote")).toBeVisible();
 await expect(page.locator("#sourceBtn")).toHaveAttribute("aria-expanded","true");
 await expect(page.locator("#detailSourceNote")).not.toContainText(/PDF|XREF|github.com/);
 expect(popups).toBe(0);
 await page.waitForTimeout(900);
 await page.screenshot({path:"test-results/"+info.project.name+"-visitor-artwork-context.png"});
 await page.locator("#sourceBtn").click();
 await expect(page.locator("#detailSourceNote")).toBeHidden();
 await page.locator("#localeBtn").click();
 await expect(page.locator("#detailTitle")).toHaveText("ما لم يُقال");
 await expect(page.locator("#detailText")).toHaveText(image.title.ar);
 await expect(page.locator("#sourceBtn")).toHaveText("عن الصورة");
 await expect(page.locator("#detailSourceNote")).toBeHidden();
 await page.locator("#closeDetail").click();
 expect(errors).toEqual([]);
});

test("reader and archive search show human descriptions, not PDF pagination",async({page})=>{
 await page.goto("/");
 await expect(page.locator("#readingList figcaption").first()).not.toContainText("PDF");
 await page.locator("#indexBtn").click();
 await page.locator("#archiveSearch").fill("cyanotype");
 await expect(page.locator("#searchResults .search-hit")).toHaveCount(2);
 await expect(page.locator("#searchResults")).not.toContainText(/PDF|XREF/);
});

test("the first identity filament network is earned by visiting real material sources",async({page},info)=>{
 await page.goto("/");
 await page.locator("#modeBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-bridge","unseen");
 const network=page.locator("#identityTrace");
 await expect(network.locator("path")).toHaveCount(3);
 await expect(network.locator('[data-kind="editorial-comparison"]')).toHaveCount(2);
 await expect(network.locator('[data-kind="shared-programme"]')).toHaveCount(1);
 await page.locator('.artifact[data-id="39"] button').evaluate(b=>b.click());
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-bridge","unseen");
 await page.locator("#relatedObjects .is-material-trace").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-bridge","discovered");
 await page.locator("#closeDetail").click();
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(network).toHaveClass(/is-revealed/);
 // The network occupies the SAME transformed archive world as real source works.
 const anchored=await network.locator("path").evaluateAll(paths=>paths.every(p=>
   p.getAttribute("d")?.startsWith("M ")&&
   [7,39,41].includes(Number(p.dataset.from))&&
   [39,41,35].includes(Number(p.dataset.to))
 ));
 expect(anchored).toBe(true);
 await page.screenshot({path:"test-results/"+info.project.name+"-identity-material-bridge-discovered.png"});
});

test("four identities are discovered out of sequence without overlays or invented archive sources",async({page},info)=>{
 test.setTimeout(90_000);
 await page.goto("/");
 await page.locator("#modeBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 const constellations=page.locator("#identityConstellations");
 await expect(constellations.locator('[data-identity-lens]')).toHaveCount(3);
 await expect(constellations.locator('[data-identity-lens="D"] path')).toHaveCount(4);
 await expect(constellations.locator('[data-identity-lens="R"] path')).toHaveCount(5);
 await expect(constellations.locator('[data-identity-lens="B"] path')).toHaveCount(7);
 await expect(page.locator("#identityTrace path")).toHaveCount(3);
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-letters","none");
 const unlock=async(id)=>{
  await page.locator('.artifact[data-id="'+id+'"] button').evaluate(button=>button.click());
  await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
  await page.locator("#closeDetail").click();
  await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 };
 // No letter-order gate: start in B's installation world, then R, D, A.
 await unlock(53);
 await unlock(61);
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-letters","B");
 await expect(constellations.locator('[data-identity-lens="B"]')).toHaveClass(/is-discovered/);
 await unlock(44);
 await unlock(47);
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-letters","RB");
 await unlock(46);
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-letters","DRB");
 await unlock(39);
 await unlock(41);
 await expect(page.locator("#experience")).toHaveAttribute("data-identity-letters","DARB");
 for(const key of ["D","R","B"]){
  await expect(constellations.locator('[data-identity-lens="'+key+'"]')).toHaveClass(/is-discovered/);
 }
 await expect(page.locator("#identityTrace")).toHaveClass(/is-revealed/);
 await expect(page.locator(".artifact")).toHaveCount(72);
 // All visible identity lines are anchored to real existing image centers.
 const correct=await constellations.locator("path").evaluateAll(paths=>paths.every(path=>{
  const start=path.getAttribute("d").match(/^M ([\d.]+) ([\d.]+)/);
  if(!start)return false;
  const from=document.querySelector('.artifact[data-id="'+path.dataset.from+'"]');
  const to=document.querySelector('.artifact[data-id="'+path.dataset.to+'"]');
  if(!from||!to)return false;
  const fromX=parseFloat(from.style.left)+parseFloat(from.style.width)/2;
  const fromY=parseFloat(from.style.top)+parseFloat(from.style.height)/2;
  const end=path.getAttribute("d").trim().match(/([\d.]+) ([\d.]+)$/);
  const toX=parseFloat(to.style.left)+parseFloat(to.style.width)/2;
  const toY=parseFloat(to.style.top)+parseFloat(to.style.height)/2;
  return end&&Math.abs(Number(start[1])-fromX)<.01&&Math.abs(Number(start[2])-fromY)<.01&&
    Math.abs(Number(end[1])-toX)<.01&&Math.abs(Number(end[2])-toY)<.01;
 }));
 expect(correct).toBe(true);
 // Art-direction evidence only: the camera is repositioned by a test-only
 // stylesheet so each complete factual relationship fits the viewport.
 // No preview/review camera mode or letter overlay is shipped to visitors.
 for(const key of ["D","A","R","B"]){
  await page.evaluate(key=>{
   const lens=key==="A"
    ?document.querySelector("#identityTrace")
    :document.querySelector('#identityConstellations [data-identity-lens="'+key+'"]');
   const box=lens.getBBox();
   const scale=Math.min(innerWidth*.70/Math.max(1,box.width),
    innerHeight*.56/Math.max(1,box.height),1.2);
   const cx=box.x+box.width/2,cy=box.y+box.height/2;
   const dx=innerWidth*.5-scale*cx,dy=innerHeight*.46-scale*cy;
   let override=document.querySelector("#identityCameraProof");
   if(!override){
    override=document.createElement("style");
    override.id="identityCameraProof";document.head.append(override);
   }
   override.textContent="#world{transform:translate3d("+dx+"px,"+dy+
    "px,0) scale("+scale+") rotate(0deg) !important}";
   lens.style.setProperty("--view-alignment","1","important");
  },key);
  await page.waitForTimeout(700);
  await page.screenshot({path:"test-results/"+info.project.name+
    "-identity-"+key+"-source-world.png"});
 }
});
