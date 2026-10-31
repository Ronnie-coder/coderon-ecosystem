/**
 * Copies the supplied brand kit into the project, then deletes the kit folder so it isn't deployed twice.
 *   ha-motors-brand/svg/*  -> public/brand/
 *   ha-motors-brand/web/favicon.ico, icon.svg, apple-icon.png, opengraph-image.png -> app/
 *   ha-motors-brand/web/icon-192.png, icon-512.png -> public/
 * Run: npm run brand
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const kit = join(root, "ha-motors-brand");
if (!existsSync(kit)) {
  console.log("[brand] no ha-motors-brand/ folder found, nothing to import.");
  process.exit(0);
}

const svgDir = join(kit, "svg");
const brandOut = join(root, "public", "brand");
mkdirSync(brandOut, { recursive: true });
if (existsSync(svgDir)) {
  for (const f of readdirSync(svgDir)) {
    if (f.endsWith(".svg")) copyFileSync(join(svgDir, f), join(brandOut, f));
  }
}

const web = join(kit, "web");
const toApp = ["favicon.ico", "icon.svg", "apple-icon.png", "opengraph-image.png"];
const toPublic = ["icon-192.png", "icon-512.png"];
for (const f of toApp) if (existsSync(join(web, f))) copyFileSync(join(web, f), join(root, "app", f));
for (const f of toPublic) if (existsSync(join(web, f))) copyFileSync(join(web, f), join(root, "public", f));

// Logo.tsx reads this list to decide whether the full lockups are available.
const files = readdirSync(brandOut).filter((f) => f.endsWith(".svg")).sort();
writeFileSync(join(root, "lib", "brand-manifest.json"), `${JSON.stringify(files)}\n`);

rmSync(kit, { recursive: true, force: true });
console.log(`[brand] imported ${files.length} logo file(s) and removed ha-motors-brand/.`);
