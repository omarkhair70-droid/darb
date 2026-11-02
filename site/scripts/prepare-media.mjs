import { cp, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(siteRoot, "../assets/original");
const target = path.resolve(siteRoot, "public/media");

// The first production slice serves only publisher-supplied assets that have
// identifiable, non-sensitive curatorial context. This is NOT a bulk photo dump.
// Every file remains associated with its PDF page/xref in the archive manifest.
const selected = [
  "pdf_image_0308.jpeg", // historical external view, page 1
  "pdf_image_0359.jpeg", // INBETWEEN installation, page 7
  "pdf_image_0360.jpeg", // INBETWEEN print series, page 7
  "pdf_image_0379.png",  // Jusoor programme graphic, page 9
  "pdf_image_0402.jpeg", // Fustat cyanotype, page 11
  "pdf_image_0403.jpeg", // Fustat prints and notebooks, page 11
  "pdf_image_0445.png",  // Something Else / Citadel, page 17
  "pdf_image_0449.png",  // Something Else installation, page 17
  "pdf_image_0465.jpeg", // Something Else installation, page 19
];

await mkdir(target, { recursive: true });
for (const file of selected) {
  const from = path.join(source, file);
  try {
    await stat(from);
  } catch {
    throw new Error("Missing approved archive asset: " + from +
      ". Run the build from the darb repository checkout with assets/original present.");
  }
  await cp(from, path.join(target, file));
}
console.log("Prepared " + selected.length + " attributed archive media objects.");
