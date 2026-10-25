import { expect, test } from "@playwright/test";
import { dictionaries } from "../src/lib/i18n/messages";
import { PRESS_FEATURE } from "../src/lib/press";
import { LINE_URL } from "../src/lib/site";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/visitors", (route) => route.fulfill({ json: { visitors: 1234 } }));
  await page.route("**/_vercel/**", (route) => route.abort());
});

test("home loads without client errors or horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#news-heading")).toHaveText(dictionaries.th.press.title);
  await expect(page.locator("html")).toHaveAttribute("lang", "th");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("news preserves the team photo, date, credits and original article link", async ({ page }) => {
  await page.goto("/#news");
  const news = page.locator("#news");
  const photo = news.locator("img").first();
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveAttribute("alt", dictionaries.th.press.imageAlt);
  await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(news.locator("figcaption")).toContainText(PRESS_FEATURE.publisher);
  await expect(news.locator("time")).toHaveAttribute("datetime", PRESS_FEATURE.publishedAt);
  const source = news.getByRole("link", { name: dictionaries.th.press.readMore });
  await expect(source).toHaveAttribute("href", PRESS_FEATURE.url);
  await expect(source).toHaveAttribute("target", "_blank");
  await expect(source).toHaveAttribute("rel", /noopener/);
});

test("news navigation works on desktop and mobile without a duplicate hash", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header").first();
  const menu = header.getByRole("button", { name: dictionaries.th.nav.menu, exact: true });
  if (await menu.isVisible()) await menu.click();
  await header.getByRole("link", { name: dictionaries.th.nav.news, exact: true }).filter({ visible: true }).click();
  await expect(page).toHaveURL(/\/#news$/);
  await expect(page.locator("#news-heading")).toBeInViewport();
  if (await menu.isVisible()) await expect(menu).toHaveAttribute("aria-expanded", "false");
});

for (const locale of ["en", "zh"] as const) {
  test(`language switch to ${locale} translates news and persists after reload`, async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header").first();
    await header.locator('button[aria-haspopup="listbox"]').click();
    await header.getByRole("option").filter({ hasText: locale === "en" ? "ENGLISH" : "中文" }).getByRole("button").click();
    await expect(page.locator("#news-heading")).toHaveText(dictionaries[locale].press.title);
    await expect(page.locator("html")).toHaveAttribute("lang", locale === "zh" ? "zh-CN" : "en");
    await page.reload();
    await expect(page.locator("#news-heading")).toHaveText(dictionaries[locale].press.title);
  });
}

test("LINE buttons keep the correct destination without sending a message", async ({ page }) => {
  await page.goto("/");
  const buttons = page.locator('a[data-track-event="line_click"]');
  expect(await buttons.count()).toBeGreaterThan(0);
  for (const button of await buttons.all()) {
    await expect(button).toHaveAttribute("href", LINE_URL);
    await expect(button).toHaveAttribute("rel", /noopener/);
  }
});

test("AI tools list shows the verified GPT-6.1 Sol label", async ({ page }) => {
  await page.goto("/");
  const label = page.locator("li").getByText("GPT-6.1 Sol", { exact: true });
  await label.scrollIntoViewIfNeeded();
  await expect(label).toBeVisible();
  await expect(page.getByText("GPT-6 Sol", { exact: true })).toHaveCount(0);
});

test("visitor counter shows a formatted mocked number only on the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("footer").getByRole("status")).toContainText(": 1,234");
  await page.goto("/contact");
  await expect(page.locator("footer").getByRole("status")).toHaveCount(0);
});

test("visitor counter shows a dash instead of a fabricated count on failure", async ({ page }) => {
  await page.route("**/api/visitors", (route) => route.fulfill({ status: 503, json: { visitors: null } }));
  await page.goto("/");
  await expect(page.locator("footer").getByRole("status")).toContainText(": —");
});

test("company profile print button invokes print and hides its toolbar in print layout", async ({ page }) => {
  await page.addInitScript(() => {
    window.print = () => { document.documentElement.dataset.printCalled = "true"; };
  });
  await page.goto("/company-profile");
  await page.getByRole("button", { name: /บันทึก.*PDF/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-print-called", "true");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".cp-toolbar")).toBeHidden();
  await expect(page.locator(".cp-sheet").first()).toBeVisible();
});

test("ERP quick-create opens from the query and cancels without creating a customer", async ({ page }) => {
  await page.goto("/demo/erp/crm/customers?new=1&source=test");
  await expect(page.getByRole("heading", { name: "สร้างลูกค้าใหม่ (B2B)" })).toBeVisible();
  await page.getByRole("button", { name: "ยกเลิก", exact: true }).click();
  await expect(page.getByRole("heading", { name: "สร้างลูกค้าใหม่ (B2B)" })).toBeHidden();
  await expect(page).toHaveURL(/customers\?source=test$/);
});

test("ERP search starts fresh each time it is opened", async ({ page }) => {
  await page.goto("/demo/erp/finance/ar");
  const search = page.getByPlaceholder("พิมพ์เพื่อค้นหา ลูกค้า / SKU / เอกสาร... ");
  await page.keyboard.press("ControlOrMeta+k");
  await search.fill("test query");
  await search.press("Escape");
  await expect(search).toBeHidden();
  await page.keyboard.press("ControlOrMeta+k");
  await expect(search).toHaveValue("");
});
