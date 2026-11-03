import { readFile } from "node:fs/promises";

// IndexNow uses a publicly hosted ownership file, not a password/API token.
// Run after production deployment. Never submit demo/customer document URLs.
const site = new URL("https://www.limitcode.shop");
const key = (await readFile(new URL("../public/indexnow.txt", import.meta.url), "utf8")).trim();
if (!/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error("Invalid IndexNow ownership key");

const keyLocation = new URL("/indexnow.txt", site).href;
const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15_000), redirect: "error" });
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error("Production ownership file does not match. Deploy before submitting.");
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", site), { signal: AbortSignal.timeout(15_000) });
if (!sitemapResponse.ok) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))];
if (urlList.length === 0 || urlList.length > 10_000) throw new Error("Unexpected sitemap URL count");
for (const value of urlList) {
  const url = new URL(value);
  if (url.origin !== site.origin || url.search || /^\/(demo|api|private|quotation)(\/|$)/.test(url.pathname)) {
    throw new Error("Sitemap includes a non-marketing or non-canonical URL; submission stopped.");
  }
}

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ mode: "dry-run", urlCount: urlList.length, urls: urlList }, null, 2));
} else {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: site.hostname, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30_000),
  });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow returned HTTP ${response.status}`);
  console.log(JSON.stringify({
    engine: "IndexNow", status: response.status, urlCount: urlList.length,
    result: response.status === 202 ? "Received; ownership verification pending" : "URLs received",
    note: "Receipt does not confirm indexing, rankings, or AI citations.",
  }, null, 2));
}
