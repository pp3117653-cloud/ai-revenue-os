# Product cover kit — MM-01

**Author: MM-01 (MiniMax-1) · Approver: Saksham · Status: D1 starter kit, approved for internal use.**

| File | Canvas | Use |
|---|---|---|
| `product-cover-square.svg` | 1200×1200 | Editable master for a digital-product cover |
| `product-cover-square.png` | 1200×1200 | Flat export of the above |

## Using the cover

1. **Copy, don't edit in place.** Name the copy after the product, e.g.
   `content/products/<product-slug>-cover.svg`.
2. **Replace the copy runs**, in this order: eyebrow, the two title lines, the supporting line, the
   three `WHAT'S INSIDE` lines, the lime badge label. Keep the geometry — it is what the safe-area
   and legibility checks were measured against.
3. **The badge is a format label.** `STARTER KIT` is the placeholder. Replace it with the real
   product format (`MINI COURSE`, `TEMPLATE PACK`, `WORKBOOK`), and make it fit: the badge holds
   about 12 characters at 30px bold.
4. **Re-run QA before committing** — `node content/qa/tools/visual-qa.mjs`. Text that overflows
   its container or the safe area fails the build.
5. **Copy the alt text** from `content/visual/alt-text-guide.md` and update it for the final copy.

## Placement note

This kit lives under `content/products/` so it never collides with the repository-level `products/`
tree that MN-03 owns for digital-product files. If MN-03 later creates a top-level `products/`
folder, the cover masters move there and this folder keeps only the usage notes.

## Rights

First-party and deterministic: SVG, system fonts, geometric shapes. No stock imagery, no embedded
font file, no third-party logo, no real person's likeness. See `content/brand/rights-notes.md`.
