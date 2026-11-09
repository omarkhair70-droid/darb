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
 await expect(page.locator("#relatedObjects .related-item")).toHaveCount(3);
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
 await expect(page.locator("#indexItems .index-item")).toHaveCount(16);
 await page.locator("#archiveSearch").fill("cyanotype");
 await expect(page.locator("#searchResults .search-hit")).toHaveCount(2);
 await page.locator("#searchResults .search-hit").first().click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#detail")).toBeVisible();
 await page.locator("#closeDetail").click();
 await page.locator("#indexBtn").click();
 await page.locator("#archiveSearch").fill("");
 await page.locator("#indexItems .index-item").nth(8).click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
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
