import {test,expect} from "@playwright/test";

test("stage 06B is gated inside the same app, while default archive stays untouched",async({page})=>{
 await page.goto("/");
 await expect(page.locator("#entranceLab")).toBeHidden();
 await expect(page.locator("#memorySignature")).toBeVisible();
 await expect(page.locator(".artifact")).toHaveCount(72);
 const js=await page.request.get("/entrance-lab.mjs");
 expect(js.status()).toBe(200);
 const source=await page.request.get("/entrance-ritual-v2.mjs");
 expect(source.status()).toBe(200);
});

test("original fabric unfurls under visitor input, producing one stitched opening",async({page},testInfo)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 const lab=page.locator("#entranceLab"),cloth=page.locator("#ritualCanvas");
 await expect(lab).toBeVisible();
 await expect(lab).toHaveAttribute("data-study","06b");
 await expect(lab).toHaveAttribute("data-material","original-procedural");
 await expect(page.locator("#ritualEnter")).toBeHidden();
 await expect(page.locator("#ritualStatus")).toHaveText("0%");
 await page.waitForTimeout(400);
 await page.screenshot({path:"test-results/"+testInfo.project.name+"-06a-before-pull.png"});
 for(let i=0;i<4;i++)await page.locator("#ritualPull").click();
 await expect(page.locator("#ritualEnter")).toBeVisible();
 await expect(page.locator("#ritualTitle")).toContainText("weave");
 await expect(page.locator("#ritualTraces button")).toHaveCount(3);
 await page.waitForTimeout(600);
 await page.screenshot({path:"test-results/"+testInfo.project.name+"-06a-stitch-opening.png"});
 const pixels=await cloth.evaluate(c=>{
  const ctx=c.getContext("2d");
  const d=ctx.getImageData(0,0,c.width,c.height).data;
  // Three strategically different samples must not all be a monochrome flat fill.
  const at=(x,y)=>{
   const index=(Math.floor(y*c.height)*c.width+Math.floor(x*c.width))*4;
   return [...d.slice(index,index+3)];
  };
  return [at(.12,.4),at(.5,.38),at(.74,.62)];
 });
 expect(new Set(pixels.map(x=>x.join(","))).size).toBeGreaterThan(1);
 expect(errors).toEqual([]);
});

test("visitors can change language, choose still study and skip without waiting",async({page})=>{
 await page.goto("/?entrance=v2");
 await page.locator("#ritualLanguage").click();
 await expect(page.locator("#ritualSkip")).toContainText("ادخل الأرشيف");
 await page.locator("#ritualReduced").click();
 await page.locator("#ritualPull").click();
 await page.locator("#ritualSkip").click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:4500});
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("html")).toHaveAttribute("lang","ar");
 await expect(page.locator("#detailTitle")).toContainText("الفسطاط");
});

test("a fabric thread can lead to a documented archival object inside the existing world",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 for(let i=0;i<4;i++)await page.locator("#ritualPull").click();
 await expect(page.locator("#ritualEnter")).toBeVisible();
 await page.locator("#ritualEnter").click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:4500});
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("#canvas")).toHaveAttribute("data-material","photography");
 await expect(page.locator('.artifact[data-id="39"]')).toHaveClass(/is-encounter/);
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 expect(errors).toEqual([]);
});


test("three different material apertures reveal three original archival sources",async({page},testInfo)=>{
 const pageErrors=[];page.on("pageerror",error=>pageErrors.push(error.message));
 await page.goto("/?entrance=v2");
 await expect(page.locator("#ritualTraces")).toBeHidden();
 await expect(page.locator('[data-ritual-trace="retained"]')).toBeDisabled();
 for(let i=0;i<4;i++)await page.locator("#ritualPull").click();
 await expect(page.locator("#ritualTraces")).toBeVisible();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-phase","passage");
 for(const key of ["witness","retained","visitor"])
   await expect(page.locator('[data-ritual-trace="'+key+'"]')).toBeEnabled();
 await page.locator('[data-ritual-trace="retained"]').click();
 await expect(page.locator('[data-ritual-trace="retained"]')).toHaveAttribute("aria-pressed","true");
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-source","41");
 await page.waitForTimeout(600);
 await page.screenshot({path:"test-results/"+testInfo.project.name+"-06b-three-eyes.png"});
 await page.locator("#ritualEnter").click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5000});
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator('#canvas')).toHaveAttribute("data-material","cyanotype");
 await expect(page.locator('.artifact[data-id="41"]')).toHaveClass(/is-encounter/);
 expect(pageErrors).toEqual([]);
});

test("the third perspective aperture leads to a different archival record",async({page})=>{
 await page.goto("/?entrance=v2");
 for(let i=0;i<4;i++)await page.locator("#ritualPull").click();
 await page.locator('[data-ritual-trace="visitor"]').click();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-source","42");
 await page.locator("#ritualEnter").click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5000});
 await expect(page.locator('.artifact[data-id="42"]')).toHaveClass(/is-encounter/);
});


test("sound stays silent by default and only follows a visitor's explicit choice",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-audio","off");
 await expect(page.locator("#ritualAudio")).toHaveAttribute("aria-pressed","false");
 await page.locator("#ritualAudio").click();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-audio","on");
 await page.locator("#ritualPull").click();
 await page.locator("#ritualAudio").click();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-audio","off");
 expect(errors).toEqual([]);
});
