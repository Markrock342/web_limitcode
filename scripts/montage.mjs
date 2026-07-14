import sharp from "sharp";
import { readdirSync } from "fs";

const DIR = process.argv[2];
const OUT = process.argv[3];
const files = process.argv[4]
  ? process.argv[4].split(",").map((f) => `${DIR}/${f}`)
  : readdirSync(DIR).filter((f) => f.endsWith(".jpg")).map((f) => `${DIR}/${f}`);

const W = 680, H = 450, COLS = 2;
const rows = Math.ceil(files.length / COLS);
const tiles = [];
for (let i = 0; i < files.length; i++) {
  const buf = await sharp(files[i]).resize(W, H, { fit: "cover", position: "top" }).toBuffer();
  const labeled = await sharp(buf)
    .composite([{
      input: Buffer.from(
        `<svg width="${W}" height="34"><rect width="${W}" height="34" fill="black" opacity="0.75"/><text x="10" y="23" font-size="17" font-family="Helvetica" fill="white">${files[i].split("/").pop()}</text></svg>`
      ),
      top: 0, left: 0,
    }])
    .toBuffer();
  tiles.push({ input: labeled, top: Math.floor(i / COLS) * H, left: (i % COLS) * W });
}
await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: "#222" } })
  .composite(tiles)
  .jpeg({ quality: 72 })
  .toFile(OUT);
console.log("saved", OUT, files.length, "tiles");
