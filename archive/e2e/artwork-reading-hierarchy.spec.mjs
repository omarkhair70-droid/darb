import {test,expect} from "@playwright/test";

/**
 * Artworks get an uninterrupted first look. Source evidence is discoverable,
 * not stacked over related artworks, captions, or the camera.
 */
test("source information is optional, truthful and doesn't collide with the related rail",async({page},info)=>{
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/?entrance=legacy");
 await page.locator("#modeBtn").click();
 await page.locator('.artifact[data-id="44"] .artifact-inner').evaluate(button=>button.click());
 const root=page.locator("#experience");
 const infoButton=page.locator("#sourceBtn");
 const note=page.locator("#detailSourceNote");
 const related=page.locator("#relatedObjects");
 await expect(note).toBeHidden();
 await expect(related).toBeVisible();
 await expect(infoButton).toHaveAttribute("aria-controls","detailSourceNote");
 await expect(infoButton).toHaveAttribute("aria-expanded","false");
 await infoButton.click();
 await expect(root).toHaveAttribute("data-source-open","true");
 await expect(note).toBeVisible();
 await expect(related).toBeHidden();
 await expect(infoButton).toHaveAttribute("aria-expanded","true");
 await expect(note).toContainText("Darb 1718 Overview 2026");
 await expect(note).toContainText("page 12");
 await expect(note).toContainText("editorial comparison");
 await expect(note).not.toContainText(/XREF|github.com/);
 const result=await page.evaluate(()=>{
  const n=document.querySelector("#detailSourceNote").getBoundingClientRect();
  const controls=document.querySelector(".object-detail .detail-controls").getBoundingClientRect();
  const panel=document.querySelector("#detail").getBoundingClientRect();
  return {noteInPanel:n.top>=panel.top-1,noteAvailable:n.width>80&&n.height>30,
   controlsAvailable:controls.width>80&&controls.height>=36,
   onScreen:panel.left>=-1&&panel.right<=innerWidth+1,
   lowerEdge:panel.bottom<=innerHeight+1};
 });
 expect(result.noteInPanel).toBe(true);
 expect(result.noteAvailable).toBe(true);
 expect(result.controlsAvailable).toBe(true);
 expect(result.onScreen).toBe(true);
 expect(result.lowerEdge).toBe(true);
 await page.screenshot({path:"test-results/"+info.project.name+"-artwork-source-reading.png"});
 // Changing the language must not silently close a user-requested source note.
 await page.locator("#localeBtn").click();
 await expect(note).toBeVisible();
 await expect(root).toHaveAttribute("data-source-open","true");
 await expect(note).toContainText("صفحة 12");
 await expect(note).toContainText("مقارنة فنية تحريرية");
 await infoButton.click();
 await expect(note).toBeHidden();
 await expect(related).toBeVisible();
 await page.locator("#closeDetail").click();
 await expect(root).toHaveAttribute("data-mode","explore");
 expect(errors).toEqual([]);
});
