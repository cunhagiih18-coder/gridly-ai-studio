// Downloads the image assets at build time (Vercel build machines have internet)
// and converts them to optimized WebP in public/assets.
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import sharp from "sharp";

const FIG = "https://www.figma.com/api/mcp/asset/";
const BH = "https://mir-s3-cdn-cf.behance.net/projects/808/";

const assets = [
  // [output name, url, max width]
  ["hero", FIG + "7b7049c6-ca37-44e4-a1ae-7eb9abbadec6.png", 2400],
  ["diagnostico", FIG + "f6a136a7-22f5-4e16-b610-e24afd970bbe.png", 2400],
  ["lancamentos", FIG + "cd614fbd-b369-4695-96cb-aebf9b10a1f0.png", 2400],
  ["cubes", FIG + "e05ae913-d426-4e53-a501-ac514129f521.png", 900],
  ["paginas", FIG + "c17688a9-1217-4327-b28e-de71e730761f.png", 1200],
  ["p-cbef", FIG + "0d709360-2df5-4dd2-89c5-040f292293f9.png", 1200],
  ["p-biomecanica", BH + "6d2b48233376235.Y3JvcCwxNDE2LDExMDcsMCww.png", 900],
  ["p-podologia", BH + "f64b96240602361.Y3JvcCwxNDE3LDExMDgsMCww.png", 900],
  ["p-diogo", BH + "60cc27240603275.Y3JvcCwxNDE3LDExMDksMCww.png", 900],
  ["p-llubiana", BH + "c552e1257158429.Y3JvcCwxMzkzLDEwOTAsMyww.png", 900],
  ["p-cristianne", BH + "6226a3257158057.Y3JvcCwxMjc4LDEwMDAsNjAsMA.png", 900],
  ["p-scarpa", BH + "50d3cf257159265.Y3JvcCw4MDgsNjMyLDAsMA.png", 900],
  ["p-contima", BH + "714063257106377.Y3JvcCwxNDE3LDExMDksMCww.png", 900],
  ["p-agni", BH + "d0aae7257161323.Y3JvcCwxMzczLDEwNzQsMTMsMA.png", 900],
];

await mkdir("public/assets", { recursive: true });
for (const f of ["index.html", "styles.css", "main.js"]) await copyFile(f, "public/" + f);
// Figma URLs are temporary: if one expired, reuse the copy already live on the site.
const LIVE = "https://gridly-ai-studio.vercel.app/assets/";
let failed = 0;
for (const [name, url, width] of assets) {
  try {
    let res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) res = await fetch(LIVE + name + ".webp");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    const out = await sharp(buf).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    await writeFile(`public/assets/${name}.webp`, out);
    console.log("ok", name, out.length);
  } catch (e) {
    failed++;
    console.error("FAILED", name, e.message);
  }
}
if (failed) {
  console.error(failed + " asset(s) failed");
  process.exit(1);
}
