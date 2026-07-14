// Regenerate /public/showcase/<slug>.jpg thumbnails from the live demo pages.
// Usage: node scripts/capture-demo-thumbs.mjs [baseUrl]
import puppeteer from "puppeteer";

const BASE = process.argv[2] || "http://localhost:3001";
const SLUGS = [
  "corporate", "restaurant", "shop", "booking", "dashboard",
  "court-booking", "fleet-ops", "field-crm", "clinic-admin", "kitchen-board",
  "hotel-pms", "gym-admin", "pet-clinic", "laundry-ops", "tutor-admin",
  "venue-booking", "auto-detail", "cowork-desk", "dispatch", "ai-cms",
];

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });

for (const slug of SLUGS) {
  try {
    await page.goto(`${BASE}/demo/${slug}`, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: `public/showcase/${slug}.jpg`, type: "jpeg", quality: 82 });
    console.log("ok  ", slug);
  } catch (e) {
    console.log("FAIL", slug, e.message.slice(0, 80));
  }
}
await browser.close();
