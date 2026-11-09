import {test,expect} from "@playwright/test";

test("a single spatial world is navigable in story and wander modes",async({page},info)=>{
 const errors=[];
 page.on("pageerror",error=>errors.push(String(error)));
 await page.goto("/");
 await expect(page.locator("#canvas")).toBeVisible();
 await expect(page.locator(".artifact")).toHaveCount(18);
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await expect(page.locator("#statement")).toContainText("An archive");
 await expect(page.locator("#readingList li")).toHaveCount(7);
 await page.waitForTimeout(1200);
 await page.screenshot({path:"test-results/"+info.project.name+"-opening.png"});
 await page.locator("#modeBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator("#spatialHint")).toBeVisible();
 await page.locator('.artifact[data-id="39"] button').evaluate(button=>button.click());
 await expect(page.locator("#detail")).toBeVisible();
 await expect(page.locator("#detail")).toContainText("Tales of Fustat");
 await page.locator("#localeBtn").click();
 await expect(page.locator("html")).toHaveAttribute("lang","ar");
 await expect(page.locator("#detailTitle")).toContainText("الفسطاط");
 await page.locator("#closeDetail").click();
 await page.locator("#modeBtn").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await page.evaluate(()=>window.scrollTo({top:window.innerHeight*3,behavior:"instant"}));
 await expect(page.locator("#experience")).toHaveAttribute("data-beat",/[2-4]/);
 await page.waitForTimeout(1100);
 await page.screenshot({path:"test-results/"+info.project.name+"-spatial-journey.png"});
 expect(errors).toEqual([]);
});

test("archive media and chapter index load without a conventional page workflow",async({page})=>{
 await page.goto("/");
 for(const path of ["/media/39.jpeg","/media/40.jpeg","/media/41.jpeg","/media/42.jpeg","/media/53.png","/media/56.png","/media/61.png"]){
  const response=await page.request.get(path);
  expect(response.status(),path).toBe(200);
 }
 await page.locator("#indexBtn").click();
 await expect(page.locator("#indexItems .index-item")).toHaveCount(7);
 await page.locator("#indexItems .index-item").nth(4).click();
 await expect(page.locator("#index")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","journey");
 await expect(page.locator(".story-area")).toHaveCount(0);
 await expect(page.locator("#world")).toBeVisible();
});
