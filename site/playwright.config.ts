import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir:"./e2e",
  fullyParallel:false,
  retries:process.env.CI?1:0,
  reporter:process.env.CI?[["list"],["html",{open:"never"}]]:"list",
  use:{
    baseURL:"http://127.0.0.1:3000",
    trace:"retain-on-failure",
    screenshot:"only-on-failure"
  },
  projects:[
    {name:"desktop-chromium",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}},
    {name:"mobile-chromium",use:{...devices["iPhone 13"],browserName:"chromium"}},
  ],
  webServer:{
    command:"npm run start -- --hostname 127.0.0.1",
    url:"http://127.0.0.1:3000/en",
    reuseExistingServer:!process.env.CI,
    timeout:120000,
  },
  timeout:45000,
  outputDir:"test-results",
});
