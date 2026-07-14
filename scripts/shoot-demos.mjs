import puppeteer from "puppeteer";
import { mkdirSync } from "fs";

const OUT = process.argv[2] || "/private/tmp/claude-501/-Users-code-web-limitcode/18b24f0f-0a70-4b36-ae03-ac44e5a7748a/scratchpad/shots";
mkdirSync(OUT, { recursive: true });

const routes = process.argv[3]
  ? process.argv[3].split(",")
  : [
      "demo/hotel-pms", "demo/booking", "demo/restaurant", "demo/shop", "demo/corporate",
      "demo/pet-clinic", "demo/gym-admin", "demo/court-booking", "demo/venue-booking",
      "demo/auto-detail", "demo/laundry-ops", "demo/cowork-desk", "demo/tutor-admin",
      "demo/clinic-admin", "demo/kitchen-board", "demo/dispatch", "demo/fleet-ops",
      "demo/field-crm", "demo/ai-cms", "demo/dashboard", "showcase",
    ];

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1360, height: 900, deviceScaleFactor: 1 });

for (const r of routes) {
  const name = r.replace(/\//g, "_");
  try {
    await page.goto(`http://localhost:3000/${r}`, { waitUntil: "networkidle2", timeout: 40000 });
    await new Promise((res) => setTimeout(res, 700));
    await page.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 70, fullPage: false });
    console.log("ok", name);
  } catch (e) {
    console.log("FAIL", name, e.message.slice(0, 80));
  }
}
await browser.close();
