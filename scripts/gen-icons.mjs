import sharp from "sharp";
import { readFile, writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";

const logo = "public/brand/lcs-logo.png";

async function main() {
  const input = sharp(logo);

  await input.clone().resize(32, 32).png().toFile("src/app/icon.png");
  await input.clone().resize(180, 180).png().toFile("src/app/apple-icon.png");
  await input.clone().resize(16, 16).png().toFile("public/favicon-16x16.png");
  await input.clone().resize(32, 32).png().toFile("public/favicon-32x32.png");
  await input.clone().resize(192, 192).png().toFile("public/icon-192.png");
  await input.clone().resize(512, 512).png().toFile("public/icon-512.png");

  // 32x32 PNG wrapped as favicon.ico (widely supported)
  const buf32 = await input.clone().resize(32, 32).png().toBuffer();
  await writeFile("src/app/favicon.ico", buf32);

  if (existsSync("src/app/favicon.ico.bak")) {
    await unlink("src/app/favicon.ico.bak");
  }

  console.log("Generated favicon + app icons from LCS logo");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
