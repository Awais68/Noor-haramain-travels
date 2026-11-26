// scripts/optimize-images.mjs
// ---------------------------------------------------------------------------
// Reusable image pipeline for any LOCAL raster/SVG assets this project adds
// later (e.g. a logo, an OG image, a hero-video poster, brochure photos).
//
//   Input : src/assets/original/**  (PNG, JPG/JPEG, WebP, SVG)  — git-ignored
//   Output: public/images/**        (AVIF + WebP + fallback, responsive widths)
//
// For each raster image it writes, per width, an .avif, a .webp, and a
// fallback (.jpg for photos / .png for images with alpha). SVGs are minified
// with SVGO and copied through. Re-run any time with `npm run images:optimize`.
//
// NOTE: today the site's photography is served from the Unsplash CDN (already
// AVIF/WebP + resized), so src/assets/original is empty and this script is a
// no-op until you drop files in. That's expected — it's here for future assets.
// ---------------------------------------------------------------------------

import { readdir, mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, extname, basename } from "node:path";
import sharp from "sharp";
import { optimize as svgoOptimize } from "svgo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SRC = join(root, "src/assets/original");
const OUT = join(root, "public/images");

const WIDTHS = [320, 640, 960, 1280, 1920];
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out; // directory doesn't exist yet
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

async function processRaster(file) {
  const rel = relative(SRC, file);
  const name = basename(rel, extname(rel));
  const outDir = join(OUT, dirname(rel));
  await mkdir(outDir, { recursive: true });

  const input = await readFile(file);
  const img = sharp(input);
  const meta = await img.metadata();
  const hasAlpha = meta.hasAlpha;
  const srcW = meta.width || Math.max(...WIDTHS);
  const widths = [...new Set(WIDTHS.filter((w) => w <= srcW).concat(srcW))].sort((a, b) => a - b);

  let written = 0;
  let bytes = 0;
  for (const w of widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true });
    const targets = [
      { ext: "avif", pipe: base.clone().avif({ quality: 50 }) },
      { ext: "webp", pipe: base.clone().webp({ quality: 72 }) },
      hasAlpha
        ? { ext: "png", pipe: base.clone().png({ compressionLevel: 9, palette: true }) }
        : { ext: "jpg", pipe: base.clone().jpeg({ quality: 78, mozjpeg: true }) },
    ];
    for (const t of targets) {
      const buf = await t.pipe.toBuffer();
      await writeFile(join(outDir, `${name}-${w}.${t.ext}`), buf);
      written += 1;
      bytes += buf.length;
    }
  }
  console.log(`  ${rel}  →  ${written} files  (${kb(bytes)})  widths: ${widths.join(", ")}`);
}

async function processSvg(file) {
  const rel = relative(SRC, file);
  const outDir = join(OUT, dirname(rel));
  await mkdir(outDir, { recursive: true });
  const raw = await readFile(file, "utf8");
  const { data } = svgoOptimize(raw, {
    multipass: true,
    plugins: ["preset-default", { name: "removeDimensions" }],
  });
  await writeFile(join(OUT, rel), data);
  console.log(`  ${rel}  →  svg minified (${kb(Buffer.byteLength(raw))} → ${kb(Buffer.byteLength(data))})`);
}

async function main() {
  try {
    await stat(SRC);
  } catch {
    await mkdir(SRC, { recursive: true });
  }

  const files = await walk(SRC);
  if (files.length === 0) {
    console.log("No source images in src/assets/original — nothing to optimize.");
    console.log("Drop PNG/JPG/SVG files there and re-run `npm run images:optimize`.");
    return;
  }

  console.log(`Optimizing ${files.length} source file(s) → public/images …`);
  for (const f of files) {
    const ext = extname(f).toLowerCase();
    if (ext === ".svg") await processSvg(f);
    else if (RASTER.has(ext)) await processRaster(f);
    else console.log(`  (skipped unsupported: ${relative(SRC, f)})`);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
