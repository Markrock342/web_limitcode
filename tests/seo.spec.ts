import { expect, test } from "@playwright/test";
import { SITE_URL } from "../src/lib/seo";
import { ERP_SERVICE_PATH, erpServiceCopy } from "../src/lib/erp-service";

test("homepage exposes the primary service in HTML without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("ระบบ ERP");
    await expect(page.locator('a[href="/services/erp"]').first()).toBeAttached();
  } finally {
    await context.close();
  }
});

test("ERP service is indexable with a self canonical and truthful service schema", async ({ page }) => {
  await page.goto(ERP_SERVICE_PATH);
  await expect(page.locator("h1")).toContainText(erpServiceCopy.th.heading);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}${ERP_SERVICE_PATH}`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index, follow/);
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const nodes = schemas.flatMap((value) => [JSON.parse(value)].flat());
  const service = nodes.find((node) => node["@type"] === "Service");
  expect(service.url).toBe(`${SITE_URL}${ERP_SERVICE_PATH}`);
  expect(service.provider["@id"]).toBe(`${SITE_URL}/#organization`);
  expect(service).not.toHaveProperty("aggregateRating");
  await expect(page.getByText(erpServiceCopy.th.demoCaption, { exact: true })).toBeVisible();
  await expect(page.locator("table tbody tr")).toHaveCount(6);
  await page.locator("details summary").first().click();
  await expect(page.locator("details[open]")).toContainText(erpServiceCopy.th.faq[0].a);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("sitemap contains canonical marketing pages instead of demo accounts and forms", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toContain(`${SITE_URL}${ERP_SERVICE_PATH}`);
  expect(urls).toHaveLength(5);
  expect(urls.every((value) => new URL(value).origin === SITE_URL)).toBe(true);
  expect(xml).not.toMatch(/\/demo\/|\/quotation\/|<lastmod>/);
});

test("search bots may load public JS and CSS while API paths stay excluded", async ({ request }) => {
  const response = await request.get("/robots.txt");
  const robots = await response.text();
  expect(response.ok()).toBe(true);
  expect(robots).toContain("User-Agent: *\nAllow: /");
  expect(robots).not.toContain("Disallow: /_next/");
  expect(robots).not.toContain("Disallow: /demo/");
  expect(robots).toContain("Disallow: /api/");
  expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
});

test("demo screens stay usable but explicitly opt out of search indexing", async ({ page }) => {
  await page.goto("/demo/erp/login");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});
