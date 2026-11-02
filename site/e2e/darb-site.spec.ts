import { test, expect } from "@playwright/test";

for (const lang of ["ar","en"] as const) {
  test(lang+" — real page, direction, media and archive",async({page},info)=>{
    const response=await page.goto("/"+lang);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang",lang);
    await expect(page.locator("html")).toHaveAttribute("dir",lang==="ar"?"rtl":"ltr");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator(".field-piece img").first()).toBeVisible();
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-home.png",fullPage:true});
    const archive=await page.goto("/"+lang+"/archive");
    expect(archive?.status()).toBe(200);
    await expect(page.locator(".archive-record")).toHaveCount(9);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    expect(overflow,"Unexpected horizontal overflow in archive").toBeLessThanOrEqual(2);
    const project=await page.goto("/"+lang+"/projects/tales-of-fustat");
    expect(project?.status()).toBe(200);
    await expect(page.locator(".workroom-plate img")).toBeVisible();
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-project.png",fullPage:true});
    if(info.project.name==="mobile-chromium"){
      await page.locator(".mobile-menu summary").click();
      await expect(page.locator(".mobile-menu nav")).toBeVisible();
    }
  });
}

test("Filtering archive retains URL parameters and returns verified record",async({page})=>{
  await page.goto("/en/archive?q=inbetween&type=exhibition");
  await expect(page.locator(".archive-record")).toHaveCount(1);
  await expect(page.locator(".catalog-record-name strong")).toContainText("INBETWEEN");
  await expect(page.locator("select[name=type]")).toHaveValue("exhibition");
});
test("Locale switch retains a real project path",async({page})=>{
  await page.goto("/ar/projects/inbetween-2025");
  await page.locator(".language-switch").click();
  await expect(page).toHaveURL(/\/en\/projects\/inbetween-2025$/);
  await expect(page.locator("html")).toHaveAttribute("dir","ltr");
});
test("Missing current venue is not fabricated, public indexing remains blocked",async({page})=>{
  await page.goto("/en/visit");
  await expect(page.getByText(/current visitor address and hours require confirmation/i)).toBeVisible();
  const res=await page.request.get("/robots.txt");
  expect(res.ok()).toBeTruthy();
  const robots=await res.text();
  expect(robots).toContain("Disallow: /");
});


for(const lang of ["ar","en"] as const){
  test(lang+" — source-led Explore URL/deep link, history, and language switch",async({page},info)=>{
    await page.goto("/"+lang+"/explore?path=material&step=1");
    await expect(page.locator(".reading-narrative h2")).toContainText(lang==="ar"?"ناتاليا أوسف":"Natalia Ossef");
    await expect(page.locator(".reading-narrative h2")).toBeVisible();
    await expect(page.locator(".reading-image img")).toBeVisible();
    await expect(page.locator('button[aria-pressed="true"]')).toHaveCount(1);
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-explore.png",fullPage:true});
    await page.getByRole("button",{name:lang==="ar"?"التالي":"Next",exact:true}).click();
    await expect(page).toHaveURL(/path=material&step=2/);
    await expect(page.locator(".reading-narrative h2")).toContainText("INBETWEEN");
    await page.goBack();
    await expect(page.locator(".reading-narrative h2")).toContainText(lang==="ar"?"ناتاليا أوسف":"Natalia Ossef");
    await page.locator(".reading-path-selector button").nth(1).click();
    await expect(page).toHaveURL(/path=gathering&step=0/);
    await expect(page.locator(".reading-narrative h2")).toContainText(lang==="ar"?"جسور":"Jusoor");
    await page.locator(".language-switch").click();
    await expect(page).toHaveURL(new RegExp("/"+(lang==="ar"?"en":"ar")+"/explore\\?path=gathering&step=0"));
  });
}

test("reduced-motion navigation retains full story access",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/en/explore?path=questions&step=1");
  await expect(page.locator(".reading-narrative h2")).toBeVisible();
  await expect(page.locator(".reading-narrative h2")).toContainText("Something Else Symposium");
  await page.getByRole("button",{name:"Next",exact:true}).click();
  await expect(page.locator(".reading-narrative h2")).toContainText("INBETWEEN");
});


for(const lang of ["ar","en"] as const){
 test(lang+" — authored homepage keeps five genuine cultural fields linked to source records",async({page},info)=>{
   await page.goto("/"+lang);
   await expect(page.locator(".darb-open-field h1")).toBeVisible();
   await expect(page.locator(".field-piece")).toHaveCount(5);
   await expect(page.locator(".field-piece img")).toHaveCount(5);
   await expect(page.locator(".field-piece-cinema")).toHaveAttribute("href","/"+lang+"/projects/jusoor");
   await expect(page.locator(".field-piece-inbetween .field-piece-provenance")).toContainText("PDF 07");
   await expect(page.locator(".practice-entry")).toHaveCount(4);
   await expect(page.locator(".film-inset-type a")).toHaveAttribute("href","/"+lang+"/works/braids-of-identity");
   const width=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
   expect(width,"Darb authored home should have no horizontal overflow").toBeLessThanOrEqual(2);
   await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-authored-darb-full.png",fullPage:true});
   await page.locator(".field-piece-cinema").click();
   await expect(page).toHaveURL(new RegExp("/"+lang+"/projects/jusoor$"));
 });
}
test("research mode keeps all source records and no marketing cards",async({page})=>{
 await page.goto("/en/archive");
 await expect(page.locator(".archive-record")).toHaveCount(9);
 await expect(page.locator(".project-card")).toHaveCount(0);
 await expect(page.locator(".catalog-identity h1")).toContainText("Index");
});
test("home has no rejected copy or two-column marketing hero",async({page})=>{
 await page.goto("/en");
 await expect(page.locator(".hero-grid")).toHaveCount(0);
 await expect(page.getByText("Art, people, and what happens between them")).toHaveCount(0);
});


for(const lang of ["ar","en"] as const){
  test(lang+" — genuine film -> filmmaker -> Jusoor routes with evidence",async({page})=>{
    const r=await page.goto("/"+lang+"/works/braids-of-identity");
    expect(r?.status()).toBe(200);
    await expect(page.locator(".film-work-heading h1")).toContainText(lang==="ar"?"جدائل الهوية":"Braids of Identity");
    await expect(page.locator(".film-evidence-list li")).toHaveCount(5);
    await expect(page.locator(".film-stage iframe")).toHaveCount(0);
    await page.getByRole("button",{name:lang==="ar"?"تشغيل الفيلم من يوتيوب":"Play the publisher's YouTube film"}).click();
    await expect(page.locator(".film-stage iframe")).toHaveAttribute("src",/youtube-nocookie\.com\/embed\/hRO8xdEWCRA/);
    await expect(page.locator(".film-byline a")).toHaveAttribute("href",new RegExp("/"+lang+"/people/hafsa-borai$"));
    await page.locator(".film-byline a").click();
    await expect(page.locator("h1")).toContainText(lang==="ar"?"حفصة برعي":"Hafsa Borai");
    await page.locator('.film-other-links a[href*="braids-of-identity"]').click();
    await expect(page.locator(".film-work-heading h1")).toBeVisible();
    await page.locator('.film-context-nav a[href*="/projects/jusoor"]').click();
    await expect(page.locator(".workroom-connections").first()).toContainText(lang==="ar"?"جدائل الهوية":"Braids of Identity");
  });
}
test("other film record does not fake playable media",async({page})=>{
 await page.goto("/en/works/dukhan");
 await expect(page.locator(".film-unavailable")).toBeVisible();
 await expect(page.locator(".film-stage iframe")).toHaveCount(0);
 await expect(page.locator(".film-provenance")).toContainText("Date not stated");
});


// REFERENCE LAB 01 — an isolated implementation of published Oculi Mundi
// *mechanics* on Darb sources; this is not the institution's final design.
for(const lang of ["ar","en"] as const){
 test(lang+" — spatial reference lab has depth, real source objects and synced research mode",async({page},info)=>{
  await page.goto("/"+lang+"/lab/oculi-method");
  await expect(page.locator(".lab-object")).toHaveCount(7);
  await expect(page.locator(".lab-object-focus")).toHaveCount(1);
  await expect(page.locator(".lab-viewport")).toHaveCSS("perspective","1150px");
  await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-oculi-lab.png",fullPage:true});
  await page.locator(".lab-position-actions button").last().click();
  await expect(page).toHaveURL(/mode=explore&object=craft/);
  await expect(page.locator(".lab-object-focus")).toHaveAttribute("aria-label",/Fustat|الفسطاط/);
  await page.getByRole("button",{name:/Research|ابحث/}).first().click();
  await expect(page).toHaveURL(/mode=research&object=craft/);
  await expect(page.locator(".lab-research-list li")).toHaveCount(7);
  await page.locator(".lab-research-list li").nth(2).locator("button").click();
  await expect(page.locator(".lab-overlay")).toBeVisible();
  await expect(page.locator(".lab-overlay-panel")).toContainText("PDF");
  await page.locator(".lab-close").click();
  await page.goBack();
  await expect(page.locator(".lab-overlay")).toBeVisible();
 });
}

test("reference lab reduced motion still supports spatial selection and source details",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/en/lab/oculi-method?mode=explore&object=installation");
 await expect(page.locator(".lab-object-focus")).toHaveAttribute("aria-label",/INBETWEEN/);
 await page.locator(".lab-position-actions button").nth(1).click();
 await expect(page.locator(".lab-overlay-panel")).toBeVisible();
 await expect(page.locator(".lab-overlay-panel")).toContainText("Individual photo/art rights");
});


// GETTY METHOD LAB 02 — actual source-led scroll choreography.
// Original Getty art / code is NOT present; tested values belong to this lab.
for(const lang of ["ar","en"] as const){
  test(lang+" — Getty method lab preserves real relation graph through scroll and entry points",async({page},info)=>{
    const response=await page.goto("/"+lang+"/lab/getty-method");
    expect(response?.status()).toBe(200);
    await expect(page.locator(".gt-beat")).toHaveCount(4);
    await expect(page.locator(".gt-artifact")).toHaveCount(4);
    await expect(page.locator(".gt-beat[data-graph-edge=film]")).toContainText(lang==="ar"?"جدائل الهوية":"Braids of Identity");
    await expect(page.locator(".gt-artifact-programme img")).toHaveAttribute("src",/pdf_image_0379/);
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-getty-method-opening.png"});
    const target=page.locator("#getty-beat-programme");
    await target.scrollIntoViewIfNeeded();
    await expect(page.locator(".gt-counter")).toContainText(lang==="ar"?"السياق":"The programme");
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-getty-method-programme.png"});
    await page.locator(".gt-rail a").nth(3).click();
    await expect(page).toHaveURL(/#source$/);
    await expect(page.locator(".gt-counter")).toContainText(lang==="ar"?"الدليل":"The evidence");
    await expect(page.locator("#getty-beat-source")).toContainText(lang==="ar"?"صفحة ٠٩":"Page 09");
  });
}
test("Getty lab direct source link and reduced-motion readable mode",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/en/lab/getty-method#source");
 await expect(page.locator(".gt-beat")).toHaveCount(4);
 await expect(page.locator("#getty-beat-source")).toContainText("Page 09");
 await page.locator(".gt-rail a").nth(0).click();
 await expect(page).toHaveURL(/#film$/);
 await expect(page.locator(".gt-counter")).toContainText("The work");
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 expect(overflow,"Getty lab must not overflow on mobile/desktop").toBeLessThanOrEqual(2);
});


test("Arabic Getty desktop keeps the artwork river outside the RTL reading column",async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto("/ar/lab/getty-method");
 const field=await page.locator(".gt-spline").boundingBox();
 const reading=await page.locator(".gt-beat-copy").first().boundingBox();
 expect(field).not.toBeNull();
 expect(reading).not.toBeNull();
 expect(field!.x+field!.width,"source scene intrudes into the Arabic text column").toBeLessThan(reading!.x-40);
});


// REFERENCE LAB 03 — National Gallery Imaginarium "slow looking" mechanism
// applied only to a genuine Darb photographic document. Prompts are ours, not
// falsely attributed to a National Gallery or Darb curator.
for (const lang of ["ar","en"] as const) {
 test(lang+" — Imaginarium lab enters real image with limited native zoom and source context",async({page},info)=>{
  const r=await page.goto("/"+lang+"/lab/imaginarium-method");
  expect(r?.status()).toBe(200);
  await expect(page.locator(".ig-stage-threshold")).toBeVisible();
  await page.waitForTimeout(700); // capture the settled text, not a mid-tween opacity state
  await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-imaginarium-threshold.png"});
  await page.locator(".ig-entry-actions button").first().click();
  await expect(page).toHaveURL(/stage=look&mode=guided&prompt=0/);
  await expect(page.locator(".ig-image-window img")).toHaveAttribute("src",/pdf_image_0360/);
  await expect(page.locator(".ig-canvas-controls output")).toHaveText("100%");
  await page.getByRole("button",{name:lang==="ar"?"تكبير":"Zoom in"}).click();
  await expect(page.locator(".ig-canvas-controls output")).toHaveText("120%");
  await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-imaginarium-look.png"});
  await page.locator(".ig-prompt-control button").last().click();
  await expect(page).toHaveURL(/prompt=1/);
  await page.locator(".ig-prompt-control button").last().click();
  await expect(page).toHaveURL(/prompt=2/);
  await page.locator(".ig-prompt-control button").last().click();
  await expect(page).toHaveURL(/stage=context/);
  await expect(page.locator(".ig-context-pair figure")).toHaveCount(2);
  await expect(page.locator(".ig-context-credit")).toContainText(lang==="ar"?"ملف درب":"Darb 1718 Overview");
  await page.locator(".ig-context-pair figure").last().scrollIntoViewIfNeeded();
  await expect.poll(()=>page.locator(".ig-context-pair img").evaluateAll(images=>images.every(img=>(img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth>0))).toBe(true);
  await page.waitForTimeout(600);
  await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-imaginarium-context.png"});
 });
}

test("Imaginarium lab direct links, free mode, reduced motion and no mobile overflow",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("/en/lab/imaginarium-method?stage=look&mode=free&prompt=0");
 await expect(page.locator(".ig-stage-look")).toBeVisible();
 await expect(page.locator(".ig-question-body")).toContainText("FREE LOOKING");
 await expect(page.locator(".ig-image-window img")).toHaveAttribute("src",/pdf_image_0360/);
 await page.locator(".ig-context-cta").click();
 await expect(page).toHaveURL(/stage=context&mode=free/);
 await page.locator(".ig-context-actions button").first().click();
 await expect(page.locator(".ig-context-reverse")).toBeVisible();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
 expect(overflow,"Slow-looking lab should not overflow 390px viewport").toBeLessThanOrEqual(2);
});
test("Imaginarium lab never zooms the supplied photo above its declared 160 percent limit",async({page})=>{
 await page.goto("/en/lab/imaginarium-method?stage=look&mode=guided&prompt=0");
 const plus=page.getByRole("button",{name:"Zoom in"});
 for(let i=0;i<6;i++) if(await plus.isEnabled())await plus.click();
 await expect(page.locator(".ig-canvas-controls output")).toHaveText("160%");
 await expect(plus).toBeDisabled();
});


for(const lang of ["ar","en"] as const){
 test(lang+" — research integration atlas connects every tested lab and its source",async({page},info)=>{
   const response=await page.goto("/"+lang+"/lab");
   expect(response?.status()).toBe(200);
   await expect(page.locator(".atlas-experiment")).toHaveCount(3);
   for(const id of ["oculi-method","getty-method","imaginarium-method"]){
      await expect(page.locator('a[data-lab-id="'+id+'"]')).toHaveAttribute("href","/"+lang+"/lab/"+id);
   }
   await expect(page.locator(".atlas-master-link")).toHaveAttribute("href",/29-CREATIVE-INTEGRATION-ATLAS/);
   await expect(page.locator(".atlas-stats")).toContainText("77");
   await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-integration-atlas.png",fullPage:true});
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   expect(overflow,"Integration atlas must remain usable without horizontal clipping").toBeLessThanOrEqual(2);
 });
}
