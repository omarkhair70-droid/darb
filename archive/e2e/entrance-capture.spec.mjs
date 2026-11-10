import {test,expect} from "@playwright/test";

// One dedicated capture worker per device. Other browser tests stay lightweight.
test.use({video:"on"});

test("creative QA film — textile → three apertures → selected source → one archive",async({page},info)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 await page.waitForTimeout(450);
 for(let i=0;i<4;i++)await page.locator("#ritualPull").click();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-phase","passage");
 await expect(page.locator('[data-ritual-trace="retained"]')).toBeEnabled();
 await page.waitForTimeout(850);
 await page.screenshot({path:"test-results/"+info.project.name+"-06b-three-material-eyes.png"});
 await page.locator('[data-ritual-trace="retained"]').click();
 await page.locator("#ritualEnter").click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:4500});
 await expect(page.locator('.artifact[data-id="41"]')).toHaveClass(/is-encounter/);
 await page.waitForTimeout(800);
 await page.screenshot({path:"test-results/"+info.project.name+"-06b-source-arrival.png"});
 expect(errors).toEqual([]);
});
