import { test, expect } from "@playwright/test";

for (const lang of ["ar","en"] as const) {
  test(lang+" — real page, direction, media and archive",async({page},info)=>{
    const response=await page.goto("/"+lang);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang",lang);
    await expect(page.locator("html")).toHaveAttribute("dir",lang==="ar"?"rtl":"ltr");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator(".hero-art img")).toBeVisible();
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-home.png",fullPage:true});
    const archive=await page.goto("/"+lang+"/archive");
    expect(archive?.status()).toBe(200);
    await expect(page.locator(".project-card")).toHaveCount(9);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    expect(overflow,"Unexpected horizontal overflow in archive").toBeLessThanOrEqual(2);
    const project=await page.goto("/"+lang+"/projects/tales-of-fustat");
    expect(project?.status()).toBe(200);
    await expect(page.locator(".detail-media img")).toBeVisible();
    await page.screenshot({path:"test-results/"+lang+"-"+info.project.name+"-project.png",fullPage:true});
    if(info.project.name==="mobile-chromium"){
      await page.locator(".mobile-menu summary").click();
      await expect(page.locator(".mobile-menu nav")).toBeVisible();
    }
  });
}

test("Filtering archive retains URL parameters and returns verified record",async({page})=>{
  await page.goto("/en/archive?q=inbetween&type=exhibition");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toContainText("INBETWEEN");
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
