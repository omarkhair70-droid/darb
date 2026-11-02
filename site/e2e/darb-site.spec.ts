import { test, expect } from "@playwright/test";

for (const lang of ["ar","en"] as const) {
  test(lang+" — real page, direction, media and archive",async({page},info)=>{
    const response=await page.goto("/"+lang);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang",lang);
    await expect(page.locator("html")).toHaveAttribute("dir",lang==="ar"?"rtl":"ltr");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator(".encounter-object img")).toBeVisible();
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
 test(lang+" — first encounter changes actual art and documents source",async({page})=>{
   await page.goto("/"+lang);
   await expect(page.locator(".encounter-object img")).toHaveAttribute("src",/pdf_image_0360/);
   await expect(page.locator(".encounter-provenance")).toContainText("7");
   await page.locator(".encounter-choice button").nth(1).click();
   await expect(page.locator(".encounter-object img")).toHaveAttribute("src",/pdf_image_0323/);
   await expect(page.locator(".encounter-provenance")).toContainText("3");
   await expect(page.locator(".encounter-choice button").nth(1)).toHaveAttribute("aria-pressed","true");
   await page.locator(".encounter-choice button").nth(2).click();
   await expect(page.locator(".encounter-object img")).toHaveAttribute("src",/pdf_image_0470/);
   await expect(page.locator(".encounter-provenance")).toContainText("20");
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
