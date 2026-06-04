import puppeteer from "puppeteer";

const shots = [
  { url: "https://test-cursor-one.vercel.app/", out: "public/showcase/ban-suk-jai.jpg" },
  { url: "https://rental-luxury.vercel.app/", out: "public/showcase/aurelia-residences.jpg" },
  { url: "https://termgame-iota.vercel.app/", out: "public/showcase/termgame.jpg" },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

for (const { url, out } of shots) {
  console.log("Capturing", url);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3000));
  await page.screenshot({ path: out, type: "jpeg", quality: 88, fullPage: false });
  console.log("Saved", out);
}

await browser.close();
