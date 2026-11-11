import {test,expect} from "@playwright/test";

async function verifySettledSource(page,id){
 // A test that captures too early can report a passing *empty* art scene.
 await expect(page.locator("#experience")).not.toHaveAttribute("data-material-arrival",/.+/,{timeout:3500});
 await page.waitForTimeout(520); // wait for caption dissolve, not just camera target.
 const box=await page.locator('.artifact[data-id="'+id+'"]').evaluate(el=>{
  const r=el.getBoundingClientRect();
  const width=Math.max(0,Math.min(innerWidth,r.right)-Math.max(0,r.left));
  const height=Math.max(0,Math.min(innerHeight,r.bottom)-Math.max(0,r.top));
  return {width,height,windowWidth:innerWidth,windowHeight:innerHeight};
 });
 expect(box.width).toBeGreaterThan(Math.min(120,box.windowWidth*.19));
 expect(box.height).toBeGreaterThan(box.windowHeight*.12);
}

test("documentary → cyanotype → notebooks travels via one truthful source programme and reverses",async({page},testInfo)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=legacy");
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="39"] button').evaluate(b=>b.click());
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","photography");
 await expect(page.locator("#detailTitle")).toContainText("Tales of Fustat");
 await expect(page.locator("#relatedObjects .is-material-trace")).toHaveCount(1);
 const trace=page.locator("#relatedObjects .is-material-trace");
 await expect(trace).toHaveAttribute("data-material-trace","41");
 await expect(trace).toContainText("From conversation toward light");
 await expect(trace).toHaveAttribute("aria-label",/not an authorship claim/);
 await verifySettledSource(page,39);
await page.screenshot({path:"test-results/"+testInfo.project.name+"-12-documentary-encounter.png"});
 await trace.click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","cyanotype");
 await expect(page.locator('#canvas')).toHaveAttribute("data-material","cyanotype");
 await expect(page.locator(".artifact[data-id='41']")).toHaveClass(/is-encounter/);
 await expect(page.locator("#detailText")).toContainText("Cyanotype");
 await page.waitForTimeout(200);
 await page.screenshot({path:"test-results/"+testInfo.project.name+"-12-cyanotype-crossing.png"});
 await verifySettledSource(page,41);
await page.screenshot({path:"test-results/"+testInfo.project.name+"-12-cyanotype-encounter.png"});
 await expect(page.locator("#relatedObjects .is-material-trace")).toHaveAttribute("data-material-trace","42");
 await page.locator("#relatedObjects .is-material-trace").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","print");
 await expect(page.locator(".artifact[data-id='42']")).toHaveClass(/is-encounter/);
 await verifySettledSource(page,42);
await page.screenshot({path:"test-results/"+testInfo.project.name+"-12-printed-traces.png"});
 // Close retraces actual object history, never resets to a new page/route.
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","cyanotype");
 await expect(page.locator(".artifact[data-id='41']")).toHaveClass(/is-encounter/);
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","photography");
 await expect(page.locator(".artifact[data-id='39']")).toHaveClass(/is-encounter/);
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#detail")).toBeHidden();
 await expect(page.locator("#experience")).not.toHaveAttribute("data-material-stage",/.+/);
 expect(errors).toEqual([]);
});

test("material path retains genuine Arabic editorial limits and a quiet reduced-motion alternative",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/?entrance=legacy");
 const catalog=await(await page.request.get("/catalog.json")).json();
 expect(catalog.items.find(x=>x.id===41).xref).toBe(402);
 await page.locator("#localeBtn").click();
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="39"] button').evaluate(b=>b.click());
 const route=page.locator("#relatedObjects .is-material-trace");
 await expect(route).toContainText("من الحكاية لأثر الضوء");
 await expect(route).toHaveAttribute("aria-label",/مش ادعاء/);
 await route.click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","cyanotype");
 await expect(page.locator("#detailTitle")).toContainText("الفسطاط");
 await expect(page.locator("#detailMarker")).not.toContainText(/XREF|PDF/);
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","photography");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
});


test("rapid rebranching doesn't leave obsolete source images highlighted",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=legacy");
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="39"] button').evaluate(b=>b.click());
 await page.locator("#relatedObjects .is-material-trace").evaluate(b=>b.click());
 await page.locator("#relatedObjects .is-material-trace").evaluate(b=>b.click());
 await expect(page.locator("#experience")).toHaveAttribute("data-material-stage","print");
 await page.waitForTimeout(1250);
 await expect(page.locator(".artifact.is-material-origin")).toHaveCount(0);
 await expect(page.locator(".artifact.is-encounter")).toHaveCount(1);
 await expect(page.locator(".artifact[data-id='42']")).toHaveClass(/is-encounter/);
 expect(errors).toEqual([]);
});
