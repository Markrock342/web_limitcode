/**
 * Capture real UI screenshots for open-source live demos.
 * Usage: node scripts/capture-oss-demos.mjs
 */
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { OPEN_SOURCE_DEMOS } from "../src/lib/open-source-demos.ts";

const OUT_DIR = "public/showcase";
fs.mkdirSync(OUT_DIR, { recursive: true });

const chromePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  headless: true,
  executablePath: chromePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });
await page.setUserAgent(
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
);

async function dismissOverlays() {
  await page.evaluate(() => {
    const texts = ["accept", "agree", "got it", "ok", "allow all", "allow", "close", "dismiss", "okay"];
    for (const el of document.querySelectorAll("button, [role='button'], a")) {
      const t = (el.textContent || "").trim().toLowerCase();
      if (texts.some((x) => t === x || t.startsWith(x))) {
        try {
          el.click();
        } catch {
          /* ignore */
        }
      }
    }
  });
}

async function tryEspoLogin() {
  try {
    await page.waitForSelector("button, .btn", { timeout: 10000 });
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll("button, a.btn, input[type=submit]")];
      const login = btns.find((b) => /login|เข้าสู่ระบบ/i.test(b.textContent || b.value || ""));
      login?.click();
    });
    await new Promise((r) => setTimeout(r, 4000));
  } catch {
    /* keep whatever loaded */
  }
}

let ok = 0;
let fail = 0;

for (const demo of OPEN_SOURCE_DEMOS) {
  const slug = demo.slug.replace(/^oss-/, "");
  const out = path.join(OUT_DIR, `oss-${slug}.jpg`);
  const url = demo.liveUrl;
  if (!url) continue;

  process.stdout.write(`→ ${slug} … `);
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await new Promise((r) => setTimeout(r, slug === "drawio" || slug === "grafana" ? 7000 : 3000));
    await dismissOverlays();
    if (slug === "espocrm") await tryEspoLogin();
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: out, type: "jpeg", quality: 84, fullPage: false });
    const size = fs.statSync(out).size;
    if (size < 12_000) throw new Error(`tiny file ${size}b`);
    console.log(`ok (${Math.round(size / 1024)}kb)`);
    ok += 1;
  } catch (e) {
    console.log(`FAIL ${e.message?.slice(0, 90) || e}`);
    fail += 1;
  }
}

await browser.close();
console.log(`\nDone: ${ok} ok, ${fail} fail / ${OPEN_SOURCE_DEMOS.length}`);
