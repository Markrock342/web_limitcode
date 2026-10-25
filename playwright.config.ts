import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3118",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      testIgnore: "**/visitors-api.spec.ts",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1720, height: 1000 } },
    },
    {
      name: "mobile-chromium",
      testIgnore: "**/visitors-api.spec.ts",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3118",
    url: "http://127.0.0.1:3118",
    reuseExistingServer: false,
    timeout: 120_000,
    // Tests never query production analytics or need production credentials.
    env: {
      VISITOR_ANALYTICS_TOKEN: "",
      VISITOR_ANALYTICS_PROJECT_ID: "",
      VISITOR_ANALYTICS_TEAM_ID: "",
    },
  },
});
