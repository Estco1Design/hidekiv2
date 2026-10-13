import { readdirSync, writeFileSync } from "node:fs";
const assets = readdirSync("public", { recursive: true })
  .filter((p) => /\.(svg|png|jpg|jpeg|webp|avif|mp4|webm)$/i.test(p))
  .map((p) => "/" + p.replaceAll("\\", "/"));
writeFileSync(
  "src/data/media-assets.json",
  JSON.stringify(assets, null, 2) + "\n",
);
console.log(`Indexed ${assets.length} local media assets.`);
