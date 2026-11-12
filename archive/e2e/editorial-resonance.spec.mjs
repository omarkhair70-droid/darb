import {test,expect} from "@playwright/test";

test("writing and voice become one camera passage, not two pages or a fictional collaboration",async({page},info)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=legacy");
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="44"] .artifact-inner').evaluate(button=>button.click());
 await expect(page.locator("#detailTitle")).toContainText("A Room of One's Own");
 const invitation=page.locator('#relatedObjects [data-editorial-thread="voice"]');
 await expect(invitation).toHaveCount(1);
 await expect(invitation).toHaveAttribute("data-editorial-from","44");
 await expect(invitation).toHaveAttribute("data-editorial-to","47");
 await expect(invitation).toHaveAttribute("aria-label",/Editorial comparison between separate programmes/);
 await expect(invitation).toContainText("Writing together and improvising with voice");
 await invitation.click();
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-passage","writing-voice");
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-from","44");
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-to","47");
 await expect(page.locator("#detailTitle")).toContainText("Voice in Motion");
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("#editorialResonance path")).toHaveCount(8);
 const geometry=await page.locator("#editorialResonance").evaluate(svg=>{
  const anchor=id=>{
   const fig=document.querySelector('.artifact[data-id="'+id+'"]');
   return {x:parseFloat(fig.style.left)+parseFloat(fig.style.width)/2,
    y:parseFloat(fig.style.top)+parseFloat(fig.style.height)/2};
  };
  return {paths:[...svg.querySelectorAll("path")].map(p=>p.getAttribute("d")),
   first:anchor(44),last:anchor(47)};
 });
 for(const path of geometry.paths){
  expect(path.startsWith("M "+geometry.first.x+" "+geometry.first.y+" C ")).toBe(true);
  expect(path.endsWith(geometry.last.x+" "+geometry.last.y)).toBe(true);
 }
 await page.waitForTimeout(500);
 await page.screenshot({path:"test-results/"+info.project.name+"-living-relation-writing-to-voice-midway.png"});
 await expect(page.locator("#experience")).not.toHaveAttribute("data-editorial-passage",/.+/,{timeout:6000});
 await expect(page.locator("#editorialResonance path")).toHaveCount(0);
 await expect(page.locator(".artifact")).toHaveCount(72);
 // Retreat to the actual source, not to an invented chapter or new URL.
 await page.locator("#closeDetail").click();
 await expect(page.locator("#detailTitle")).toContainText("A Room of One's Own");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 expect(errors).toEqual([]);
});

test("Arabic and reduced-motion preserve truth and instant return",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/?entrance=legacy");
 await page.locator("#localeBtn").click();
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="47"] .artifact-inner').evaluate(button=>button.click());
 const bridge=page.locator('#relatedObjects [data-editorial-thread="voice"]');
 await expect(bridge).toHaveCount(1);
 await expect(bridge).toHaveAttribute("data-editorial-to","44");
 await expect(bridge).toHaveAttribute("aria-label",/مقارنة تحريرية بين برنامجين مختلفين/);
 await bridge.click();
 await expect(page.locator("#detailTitle")).toContainText("غرفة تخصّنا وحدنا");
 await expect(page.locator("#detail")).toBeVisible();
 await expect(page.locator("#experience")).not.toHaveAttribute("data-editorial-passage",/.+/,{timeout:2500});
 await page.locator("#closeDetail").click();
 await expect(page.locator("#detailTitle")).toContainText("الحركة في الصوت");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator(".artifact")).toHaveCount(72);
});

test("the visited artwork itself reveals the crossing without opening a menu",async({page})=>{
 await page.goto("/?entrance=legacy");
 await page.locator("#modeBtn").click();
 const marker=page.locator('.artifact[data-id="44"] .editorial-seed');
 await expect(marker).toBeHidden();
 await page.locator('.artifact[data-id="44"] .artifact-inner').evaluate(button=>button.click());
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(marker).toBeVisible();
 await expect(marker).toHaveAttribute("data-editorial-to","47");
 // Source marker is in the same transformed world as its photograph.
 await marker.evaluate(button=>button.click());
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-to","47");
 await expect(page.locator("#detailTitle")).toContainText("Voice in Motion");
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#detailTitle")).toContainText("A Room of One's Own");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 await expect(page.locator(".artifact")).toHaveCount(72);
});

test("direct study URL opens the two real artworks without flashing the legacy or textile opening",async({page},info)=>{
 const errors=[];page.on("pageerror",error=>errors.push(error.message));
 await page.goto("/?study=writing-voice");
 await expect(page.locator("#entranceLab")).toBeHidden();
 await expect(page.locator("#experience")).toHaveAttribute("data-direct-study","writing-voice");
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","encounter");
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-passage","writing-voice",{timeout:7000});
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-from","44");
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-to","47");
 await expect(page.locator("#detailTitle")).toContainText("Voice in Motion");
 await expect(page.locator("#editorialResonance path")).toHaveCount(8);
 await page.screenshot({path:"test-results/"+info.project.name+"-direct-writing-voice-mid-flight.png"});
 await expect(page.locator("#experience")).not.toHaveAttribute("data-editorial-passage",/.+/,{timeout:6000});
 await expect(page.locator(".artifact")).toHaveCount(72);
 await expect(page.locator("#detailTitle")).toContainText("Voice in Motion");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#detailTitle")).toContainText("A Room of One's Own");
 await page.locator("#closeDetail").click();
 await expect(page.locator("#experience")).toHaveAttribute("data-mode","explore");
 expect(errors).toEqual([]);
});

test("chosen art direction holds an unseen voice before release, without overlay narration",async({page},info)=>{
 await page.goto("/?entrance=legacy");
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="44"] .artifact-inner').evaluate(button=>button.click());
 const origin=page.locator('#relatedObjects [data-editorial-thread="voice"]');
 const initial=await origin.evaluate(button=>{
  button.click();
  const root=document.querySelector("#experience");
  const paths=[...document.querySelectorAll("#editorialResonance path")];
  return {phase:root.dataset.editorialPhase,interpretation:root.dataset.editorialInterpretation,
   pathLengths:paths.map(path=>path.getAttribute("pathLength")),
   sourceVisible:!document.querySelector("#detailSourceNote").hidden};
 });
 expect(initial.phase).toBe("held");
 expect(initial.interpretation).toBe("voice-held-inside-writing");
 expect(initial.pathLengths).toEqual(Array(8).fill("100"));
 expect(initial.sourceVisible).toBe(false);
 await expect(page.locator("#experience")).toHaveAttribute("data-editorial-phase","release",{timeout:2500});
 await expect(page.locator("#detailSourceNote")).toBeHidden();
 await page.screenshot({path:"test-results/"+info.project.name+"-held-voice-release.png"});
 await expect(page.locator("#experience")).not.toHaveAttribute("data-editorial-passage",/.+/,{timeout:5500});
 await expect(page.locator("#detailTitle")).toContainText("Voice in Motion");
 await expect(page.locator(".artifact")).toHaveCount(72);
});
