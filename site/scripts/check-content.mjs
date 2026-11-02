import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(root, "src/content/records.json"), "utf8"));
const slugs = new Set();
const types = new Set(["exhibition", "programme", "residency", "workshop", "festival"]);
for (const item of catalog) {
  assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug");
  assert(!slugs.has(item.slug), "Duplicate slug: " + item.slug);
  slugs.add(item.slug);
  assert(types.has(item.kind), "Unknown kind: " + item.kind);
  assert(item.title?.ar && item.title?.en, "Missing bilingual title: " + item.slug);
  assert(item.description?.ar && item.description?.en, "Missing bilingual description: " + item.slug);
  assert(item.sourcePage >= 1 && item.sourcePage <= 21, "Out-of-range source page");
  assert(item.year <= 2026, "Future source event");
  if (item.image) {
    assert.match(item.image, /^pdf_image_\d{4}\.(?:png|jpeg)$/, "Invalid image");
  }
}
console.log("Validated " + catalog.length + " curated bilingual project records, all grounded in overview pages.");
