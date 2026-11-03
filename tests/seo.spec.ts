import { expect, test } from "@playwright/test";
import { SITE_URL } from "../src/lib/seo";
import { ERP_SERVICE_PATH, erpServiceCopy } from "../src/lib/erp-service";
import { ERP_GUIDE_DATE, ERP_GUIDE_PATH, erpGuideCopy } from "../src/lib/erp-guide";
import { ERP_CHECKLIST_PATH, erpBuyerCopy } from "../src/lib/erp-buyers";
import { CASE_STUDIES, CASE_STUDIES_PATH, caseStudyPath } from "../src/lib/case-studies";
import { PURCHASE_ORDERS, QUOTATIONS, SALES_ORDERS, SHIPMENTS, SOURCING_PROJECTS } from "../src/components/demos/erp/data/docs";

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
  await expect(page.getByRole("table", { name: erpServiceCopy.th.modulesTitle, exact: true }).locator("tbody tr")).toHaveCount(6);
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
  expect(urls).toContain(`${SITE_URL}${ERP_GUIDE_PATH}`);
  expect(urls).toContain(`${SITE_URL}${CASE_STUDIES_PATH}`);
  for (const study of CASE_STUDIES) expect(urls).toContain(`${SITE_URL}${caseStudyPath(study.slug)}`);
  expect(urls).toHaveLength(11);
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

test("ERP walkthrough has its own canonical and shows the actual demo document chain", async ({ page }) => {
  await page.goto(ERP_GUIDE_PATH);
  await expect(page.locator("h1")).toHaveText(erpGuideCopy.th.title);
  await expect(page.getByText(erpGuideCopy.th.disclosure, { exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}${ERP_GUIDE_PATH}`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index, follow/);
  const sampleDocs = [SOURCING_PROJECTS[0], QUOTATIONS.find((item) => item.id === "q1")!, SALES_ORDERS.find((item) => item.id === "so1")!, PURCHASE_ORDERS.find((item) => item.id === "po1")!, SHIPMENTS.find((item) => item.id === "shp1")!];
  for (const doc of sampleDocs) await expect(page.locator("article ol")).toContainText(doc.number);
  const nodes = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap((value) => [JSON.parse(value)].flat());
  const article = nodes.find((node) => node["@type"] === "Article");
  expect(article.datePublished).toBe(ERP_GUIDE_DATE);
  expect(article.url).toBe(`${SITE_URL}${ERP_GUIDE_PATH}`);
  for (const image of await page.locator("article figure img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("ERP buyer comparison and downloadable checklist are usable without submitting data", async ({ page, request }) => {
  await page.goto(ERP_SERVICE_PATH);
  const table = page.getByRole("table", { name: erpBuyerCopy.th.title, exact: true });
  await expect(table.locator("tbody tr")).toHaveCount(5);
  const link = page.locator(`a[href="${ERP_CHECKLIST_PATH}"]`).first();
  await link.scrollIntoViewIfNeeded();
  await expect(link).toHaveAttribute("download", "");
  const [download] = await Promise.all([page.waitForEvent("download"), link.click()]);
  expect(download.suggestedFilename()).toBe("erp-project-checklist.csv");
  const response = await request.get(ERP_CHECKLIST_PATH);
  expect(response.ok()).toBe(true);
  const body = await response.body();
  expect([...body.subarray(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
  expect(body.toString("utf8")).toContain("SAMPLE-SKU-001");
  await expect(page.locator(`a[href="${ERP_GUIDE_PATH}"]`)).toBeVisible();
});
