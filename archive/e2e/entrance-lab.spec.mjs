import {test,expect} from "@playwright/test";

async function unfold(page){
 await page.locator("#entranceLab").focus();
 for(let i=0;i<5;i++)await page.keyboard.press("ArrowDown");
 await expect(page.locator("#ritualEyeTargets button:enabled")).toHaveCount(3);
}

test("the same Darb archive stays intact when the textile study is not selected",async({page})=>{
 await page.goto("/");
 await expect(page.locator("#entranceLab")).toBeHidden();
 await expect(page.locator("#memorySignature")).toBeVisible();
 await expect(page.locator(".artifact")).toHaveCount(72);
 expect((await page.request.get("/ritual-material.mjs")).status()).toBe(200);
});

test("the carpet—not a hero, percentage or trace list—owns the visual stage",async({page},info)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 await expect(page.locator("#entranceLab")).toBeVisible();
 await expect(page.locator("#ritualTitle")).toBeHidden();
 await expect(page.locator("#ritualStatus")).toBeHidden();
 await expect(page.locator("#ritualTraces")).toBeHidden();
 await expect(page.locator("#ritualEnter")).toBeHidden();
 await expect(page.locator("#ritualAudio")).toHaveAttribute("aria-pressed","false");
 expect((await page.request.get("/threshold-world.mjs")).status()).toBe(200);
 await page.screenshot({path:"test-results/"+info.project.name+"-cloth-first-opening.png"});
 await unfold(page);
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-memory-echoes","3");
 await expect(page.locator("#ritualInstruction")).toContainText(/TOUCH AN OPENING|KEEP MOVING/);
 const eye=page.locator('[data-eye-entry="retained"]');
 await expect(eye).toBeEnabled();
 await eye.hover();
 await page.waitForTimeout(450);
 const eyeBounds=await page.locator("#ritualEyeTargets button:enabled").evaluateAll(nodes=>
  nodes.map(node=>{
   const rect=node.getBoundingClientRect();
   return {left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,
    width:innerWidth,height:innerHeight};
  }));
 for(const box of eyeBounds){
  expect(box.left).toBeGreaterThanOrEqual(0);
  expect(box.right).toBeLessThanOrEqual(box.width);
  expect(box.top).toBeGreaterThanOrEqual(0);
  expect(box.bottom).toBeLessThanOrEqual(box.height);
 }
 await expect(page.locator("#entranceLab")).toBeVisible();
 await page.screenshot({path:"test-results/"+info.project.name+"-cloth-first-three-eye-passage.png"});
 expect(errors).toEqual([]);
});

test("touching a physical eye opens its real image in the same archive",async({page})=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 await unfold(page);
 await page.locator('[data-eye-entry="retained"]').click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5500});
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator(".artifact[data-id='41']")).toHaveClass(/is-encounter/);
 await expect(page.locator("#canvas")).toHaveAttribute("data-material","cyanotype");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 expect(errors).toEqual([]);
});

test("each of the other two woven openings leads to its own archival source",async({page})=>{
 for(const [key,id] of [["witness",39],["visitor",42]]){
  await page.goto("/?entrance=v2");
  await unfold(page);
  await page.locator('[data-eye-entry="'+key+'"]').click();
  await expect(page.locator("#entranceLab")).toBeHidden({timeout:5500});
  await expect(page.locator('.artifact[data-id="'+id+'"]')).toHaveClass(/is-encounter/);
 }
});

test("a further scroll completes the same journey without Follow This Trace",async({page})=>{
 await page.goto("/?entrance=v2");
 await unfold(page);
 await page.locator("#ritualCanvas").hover({position:{x:80,y:80}});
 await page.mouse.wheel(0,200);
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5500});
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator('.artifact[data-id="39"]')).toHaveClass(/is-encounter/);
});

test("continuing the physical swipe after unfolding enters the archive without choosing an eye",async({page})=>{
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 await page.goto("/?entrance=v2");
 await unfold(page);
 // Permit visual interpolation to arrive rather than passing only the
 // logical 100% target from the keyboard to an unfinished material frame.
 await page.waitForTimeout(720);
 const vp=page.viewportSize();
 const x=vp.width*.76,y=vp.height*.84;
 await page.mouse.move(x,y);
 await page.mouse.down();
 await page.mouse.move(x,y-220,{steps:12});
 await page.mouse.up();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:5500});
 await expect(page.locator(".artifact[data-id='39']")).toHaveClass(/is-encounter/);
 expect(errors).toEqual([]);
});

test("language, deliberate mute, and immediate skip remain accessible",async({page})=>{
 await page.goto("/?entrance=v2");
 await page.locator("#ritualLanguage").click();
 await expect(page.locator("#ritualInstruction")).toContainText("اسحب");
 await expect(page.locator("#ritualAudio")).toHaveAttribute("aria-pressed","false");
 await page.locator("#ritualAudio").click();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-audio","on");
 await expect(page.locator("#ritualAudio")).toHaveAttribute("aria-label",/Mute|كتم/);
 await page.locator("#ritualAudio").click();
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-audio","off");
 await page.locator("#ritualSkip").click();
 await expect(page.locator("#entranceLab")).toBeHidden({timeout:3000});
 await expect(page.locator("html")).toHaveAttribute("lang","ar");
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
});


test("the surrounding space is a source-linked field, not a carpet on a static backdrop",async({page},info)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=v2");
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-memory-echoes","0");
 await page.locator("#entranceLab").focus();
 await page.keyboard.press("ArrowDown");
 await page.keyboard.press("ArrowDown");
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-memory-echoes","0");
 await page.keyboard.press("ArrowDown");
 await page.keyboard.press("ArrowDown");
 await page.keyboard.press("ArrowDown");
 await expect(page.locator("#entranceLab")).toHaveAttribute("data-memory-echoes","3");
 const backdrop=await page.locator("#ritualCanvas").evaluate(canvas=>{
  const c=canvas.getContext("2d");
  const px=(x,y)=>{
   const d=c.getImageData(Math.floor(x*canvas.width),Math.floor(y*canvas.height),1,1).data;
   return [d[0],d[1],d[2]];
  };
  return {left: px(.08,.36),right: px(.85,.24),center:px(.52,.42)};
 });
 expect(new Set(Object.values(backdrop).map(c=>c.join(","))).size).toBeGreaterThan(1);
 await page.screenshot({path:"test-results/"+info.project.name+"-09-woven-threshold-entire-frame.png"});
 expect(errors).toEqual([]);
});
