import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig({
  ...config,
  fullyParallel: false,
  workers: 1,
  webServer: undefined,
  projects: [{ name: "api", testMatch: "**/visitors-api.spec.ts" }],
});
