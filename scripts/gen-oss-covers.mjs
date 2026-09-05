import fs from "fs";
import path from "path";
import sharp from "sharp";
import { OPEN_SOURCE_DEMOS } from "../src/lib/open-source-demos.ts";

const outDir = "public/showcase/oss-covers";
fs.mkdirSync(outDir, { recursive: true });

const palette = [
  ["#0b1f3a", "#1479ef"],
  ["#0f172a", "#0ea5e9"],
  ["#111827", "#7c3aed"],
  ["#052e1c", "#10b981"],
  ["#1e1b4b", "#6366f1"],
  ["#3b0764", "#d946ef"],
  ["#431407", "#f97316"],
  ["#082f49", "#06b6d4"],
];

async function fetchLogo(domain) {
  const urls = [
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 80) continue;
      return buf;
    } catch {
      /* next */
    }
  }
  return null;
}

const W = 960;
const H = 600;
let ok = 0;
let fail = 0;
const mapping = {};

for (let i = 0; i < OPEN_SOURCE_DEMOS.length; i++) {
  const demo = OPEN_SOURCE_DEMOS[i];
  const slug = demo.slug.replace(/^oss-/, "");
  const file = path.join(outDir, `${slug}.jpg`);

  if (demo.preview && demo.preview.startsWith("/showcase/oss-") && !demo.preview.includes("oss-covers")) {
    mapping[demo.slug] = demo.preview;
    continue;
  }

  const [c1, c2] = palette[i % palette.length];
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;

  let composites = [];
  const domain = demo.openSource?.domain;
  if (domain) {
    const logo = await fetchLogo(domain);
    if (logo) {
      try {
        const badge = await sharp(logo)
          .resize(120, 120, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .png()
          .toBuffer();
        const framed = await sharp({
          create: {
            width: 168,
            height: 168,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
          },
        })
          .composite([{ input: badge, gravity: "centre" }])
          .png()
          .toBuffer();
        composites.push({
          input: framed,
          top: Math.round(H / 2 - 130),
          left: Math.round(W / 2 - 84),
        });
        ok++;
      } catch {
        fail++;
      }
    } else {
      fail++;
    }
  }

  const title = demo.name.replace(/[<>&]/g, "");
  const labelSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="78%" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="40" font-weight="700" fill="#ffffff">${title}</text>
  </svg>`);
  composites.push({ input: labelSvg, top: 0, left: 0 });

  await sharp(Buffer.from(svg)).composite(composites).jpeg({ quality: 82 }).toFile(file);
  mapping[demo.slug] = `/showcase/oss-covers/${slug}.jpg`;
  process.stdout.write(".");
}

fs.writeFileSync("scripts/.oss-cover-map.json", JSON.stringify(mapping, null, 2));
console.log("\ndone", { ok, fail, total: OPEN_SOURCE_DEMOS.length, files: fs.readdirSync(outDir).length });
