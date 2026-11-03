import { expect, test } from "@playwright/test";
import { CASE_STUDIES, CASE_STUDIES_PATH, caseStudyLabels, caseStudyPath } from "../src/lib/case-studies";
import { SITE_URL } from "../src/lib/seo";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/visitors", route => route.fulfill({ json: { visitors: null } }));
  await page.route("**/_vercel/**", route => route.abort());
});

test("real projects are discoverable from home, showcase and ERP without nested links", async ({ page }) => {
  await page.goto("/");
  for (const study of CASE_STUDIES) await expect(page.locator(`#showcase a[href="${caseStudyPath(study.slug)}"]`)).toHaveCount(1);
  await expect(page.locator("#showcase a a")).toHaveCount(0);
  for (const path of ["/showcase", "/services/erp"]) {
    await page.goto(path);
    await page.locator(`main a[href="${CASE_STUDIES_PATH}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${CASE_STUDIES_PATH}$`));
    await expect(page.locator("main article")).toHaveCount(4);
  }
});

for (const study of CASE_STUDIES) {
  test(`${study.slug} has a public-source case study with working images and correct SEO`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(caseStudyPath(study.slug));
    await expect(page.locator("h1")).toHaveText(study.copy.th.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_URL}${caseStudyPath(study.slug)}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index, follow/);
    await expect(page.locator("article").getByText(caseStudyLabels.th.note, { exact: true })).toBeAttached();
    const source = page.locator('article a[data-track-kind="live"]');
    await expect(source).toHaveAttribute("href", study.url);
    await expect(source).toHaveAttribute("target", "_blank");
    await expect(source).toHaveAttribute("rel", /noopener/);
    const image = page.locator("article figure img");
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const nodes = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(value => [JSON.parse(value)].flat());
    const article = nodes.find(node => node["@type"] === "Article");
    expect(article.about.url).toBe(study.url);
    expect(article.url).toBe(`${SITE_URL}${caseStudyPath(study.slug)}`);
    expect(article).not.toHaveProperty("aggregateRating");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("case studies remain readable in HTML and unknown project slugs return 404", async ({ browser, baseURL, request }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(caseStudyPath("sirikanchana"));
    await expect(page.locator("h1")).toContainText("25 คอร์ท");
    await expect(page.getByText(caseStudyLabels.th.flow, { exact: true })).toBeVisible();
  } finally { await context.close(); }
  const response = await request.get(`${CASE_STUDIES_PATH}/not-a-project`);
  expect(response.status()).toBe(404);
});

test("case study language controls translate the article and retain the KindGo launch scope", async ({ page }) => {
  await page.goto(caseStudyPath("kindgo"));
  for (const locale of ["en", "zh"] as const) {
    const header = page.locator("header").first();
    await header.locator('button[aria-haspopup="listbox"]').click();
    await header.getByRole("option").filter({ hasText: locale === "en" ? "ENGLISH" : "中文" }).getByRole("button").click();
    await expect(page.locator("h1")).toHaveText(CASE_STUDIES[2].copy[locale].title);
    await expect(page.locator("article").getByText(CASE_STUDIES[2].copy[locale].outcome, { exact: true })).toContainText("Coming soon");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
