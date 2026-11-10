import {test,expect} from "@playwright/test";

// Keep the full creative review film, not only a static screenshot.
test.use({video:"on"});

test("creative film — one woven object, three apertures, one unbroken source passage",async({page},info)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 await page.waitForTimeout(250);
 await page.screenshot({path:"test-results/"+info.project.name+"-08-textile-unlit.png"});
 await page.locator("#entranceLab").focus();
 for(let i=0;i<5;i++){
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(290);
 }
 await expect(page.locator("#ritualEyeTargets button:enabled")).toHaveCount(3);
 await page.waitForTimeout(450);
 await page.screenshot({path:"test-results/"+info.project.name+"-08-textile-three-openings.png"});
 await page.locator('[data-eye-entry="retained"]').click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5500});
 await expect(page.locator(".artifact[data-id='41']")).toHaveClass(/is-encounter/);
 await page.waitForTimeout(850);
 await page.screenshot({path:"test-results/"+info.project.name+"-08-archive-after-passage.png"});
 expect(errors).toEqual([]);
});
