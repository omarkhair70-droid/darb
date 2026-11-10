import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
 testDir:"./e2e",
 fullyParallel:false,
 retries:0,
 timeout:30000,
 use:{baseURL:"http://127.0.0.1:4173",trace:"retain-on-failure"},
 projects:[
  {name:"desktop",use:{...devices["Desktop Chrome"],viewport:{width:1440,height:900}}},
  {name:"mobile",use:{...devices["iPhone 13"],browserName:"chromium"}}
 ],
 webServer:{
  command:"node scripts/serve.mjs",
  port:4173,
  reuseExistingServer:!process.env.CI,
  timeout:30000
 },
 reporter:[["list"]]
});
