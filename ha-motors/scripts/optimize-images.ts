/**
 * Photo pipeline (runs automatically before every build via "prebuild").
 *
 * 1. Originals go in /images-src (git-ignored, so GPS data never reaches the repo),
 *    named after the photo key, e.g. images-src/adrich-bmw-workshop.jpg
 * 2. Each original is auto-rotated from EXIF, stripped of ALL metadata (EXIF, GPS, XMP),
 *    capped at 1280px wide (never upscaled), and written to /public/images as .jpg + .webp.
 * 3. As a safety net, any file already in /public/images that still carries EXIF/XMP is
 *    re-encoded without it.
 * 4. lib/photo-manifest.json is rebuilt with the real dimensions. The site shows a
 *    "photo coming soon" frame for any photo missing from the manifest.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const srcDir = join(root, "images-src");
const outDir = join(root, "public", "images");
const manifestPath = join(root, "lib", "photo-manifest.json");
const MAX_WIDTH = 1280;
const INPUT_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif", ".heic"]);

mkdirSync(outDir, { recursive: true });

async function writeClean(input: string | Buffer, name: string): Promise<void> {
  // sharp drops all metadata unless .withMetadata()/.keepMetadata() is called. We never call it.
  const base = sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(outDir, `${name}.jpg`));
  await base.clone().webp({ quality: 80 }).toFile(join(outDir, `${name}.webp`));
}

async function main(): Promise<void> {
  let processed = 0;
  if (existsSync(srcDir)) {
    for (const file of readdirSync(srcDir)) {
      const { name, ext } = parse(file);
      if (!INPUT_EXT.has(ext.toLowerCase())) continue;
      await writeClean(join(srcDir, file), name);
      processed++;
    }
  }

  const manifest: Record<string, { width: number; height: number }> = {};
  for (const file of readdirSync(outDir)) {
    const { name, ext } = parse(file);
    if (ext.toLowerCase() !== ".jpg") continue;
    const path = join(outDir, file);
    let meta = await sharp(path).metadata();
    if (meta.exif || meta.xmp || meta.iptc) {
      const buf = await sharp(path).toBuffer(); // read into memory before overwriting
      await writeClean(buf, name);
      meta = await sharp(join(outDir, file)).metadata();
      console.log(`[images] stripped leftover metadata from ${file}`);
    }
    if (!existsSync(join(outDir, `${name}.webp`))) {
      await sharp(path).webp({ quality: 80 }).toFile(join(outDir, `${name}.webp`));
    }
    if (meta.width && meta.height) manifest[name] = { width: meta.width, height: meta.height };
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`[images] processed ${processed} original(s); ${Object.keys(sorted).length} photo(s) ready.`);
}

main().catch((err: unknown) => {
  console.error("[images] failed:", err);
  process.exit(1);
});
