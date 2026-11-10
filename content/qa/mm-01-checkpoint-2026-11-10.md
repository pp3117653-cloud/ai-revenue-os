# MM-01 run checkpoint — 2026-11-10

**Role:** MM-01 — Thumbnail and Visual QA · **Account:** MiniMax-1 · **Cycle day:** D1
**Issue:** https://github.com/pp3117653-cloud/ai-revenue-os/issues/1
**Schedule:** every 12 hours at 10:25 and 22:25 Asia/Kolkata (cron `25 10,22 * * *`), created and verified
**Model:** `minimax/MiniMax-M1` · **Run bound:** 45 min, max 2 retries · **Retries used:** 0

---

## Final report

```text
ASSET_PATHS=content/thumbnails/youtube-16x9-template.svg
            content/thumbnails/youtube-16x9-template.png
            content/thumbnails/reel-9x16-template.svg
            content/thumbnails/reel-9x16-template.png
            content/visual/pipeline-diagram.svg
            content/visual/pipeline-diagram.png
            content/brand/brand-rules.md
            content/brand/rights-notes.md
            content/visual/alt-text-guide.md
            content/visual/visual-qa-checklist.md
            content/thumbnails/README.md
            content/qa/tools/visual-qa.mjs
            content/qa/tools/assets-spec.json
            content/qa/mm01-visual-qa-report.json
            content/qa/proof/youtube-16x9-template-proof.png
            content/qa/proof/reel-9x16-template-proof.png
            content/qa/proof/pipeline-diagram-proof.png

RIGHTS_NOTES=content/brand/rights-notes.md — every asset first-party and deterministic (SVG, system fonts,
            geometric shapes). No stock or scraped imagery, no embedded font file, no third-party logo,
            no real-person likeness, model-generated=no. Registered before commit.

PURPOSE=Establish the measurable visual standard MM-01 applies to every later thumbnail, poster frame,
         diagram and alt-text asset, and ship reusable templates plus a repeatable QA gate so visual
         work is checked by measurement rather than by eye.

REVIEW_STATUS=PASS — 3/3 assets. Dimensions, contrast, safe margins, UI-overlay exclusions, legibility
         at 168px, text overlap, text occlusion and container fit all measured.
         Reviewer for completed video packages: MN-04.

BLOCKERS=No approved video brief and no animation source exist yet, so no poster frame could be captured
         from a real render and no brief-alignment check could run against a real video asset.
         Also: the repository had no brand-rules file and no MM-01 Issue; both were created this run
         (brand rules are PROPOSED and need Saksham's ratification).

APPROVALS=1) Saksham — ratify content/brand/brand-rules.md.
          2) Saksham — any future publishing or upload (none performed).
          3) MN-04 — reviewer on the completed video package.
         No publishing, no upload, no outreach, no client access, no external action taken.

NEXT_ACTION=Next run: re-read the brief set and the current backlog day, look for a newly approved brief
         under content/video/briefs/, and if GA-03 has published source under content/video/src/, render
         it and produce the first real poster frame plus a brief-aligned thumbnail. Route any source
         defect to GA-03 via a change request. If the brief set is still empty, extend the kit (product
         cover templates, chart templates, long-form article diagrams) instead of inventing video work.
```

## Setup confirmation

```text
ROLE_ID=MM-01
ACCOUNT=MiniMax-1
REPOSITORY_ACCESS=connected
SCHEDULE=created
SCHEDULE_TIME=10:25 and 22:25 Asia/Kolkata
DRY_RUN=passed
ANIMATION_CODE_AUTHOR=no
EXTERNAL_ACTIONS=approval_gated
LAST_CHECKPOINT=https://github.com/pp3117653-cloud/ai-revenue-os/issues/1
BLOCKER=none
```

## Commits this run

| SHA | Message |
|---|---|
| `6978c38` | MM-01: add exported reel thumbnail PNG |
| `1a049e6` | MM-01: add visual QA harness, brand rules, rights register, alt-text guide, QA checklist, thumbnail templates and pipeline diagram (D1) |
| `7819aef` | MM-01: add exported thumbnail and diagram PNGs (D1) |
| `b34f9b9` | MM-01: add exported reel PNG and QA proof renders (D1) |
| `7ed7951` | MM-01: add QA proof render for pipeline diagram (D1) |

## Evidence

`node content/qa/tools/visual-qa.mjs` → **3/3 assets PASS**, exit 0.

| Asset | Canvas | Text runs | Safe-area violations | Headline @168px | Min contrast |
|---|---|---|---|---|---|
| `youtube-16x9-template.svg` | 1920×1080 | 10 | 0 | 20.85px / 45.9% width | 7.53:1 |
| `reel-9x16-template.svg` | 1080×1920 | 8 | 0 | 33.42px / 72.8% width | 7.53:1 |
| `pipeline-diagram.svg` | 1920×1080 | 21 | 0 | n/a | 7.53:1 |

Thresholds: contrast ≥ 4.5:1 for text, ≥ 3:1 for large text and shape boundaries, headline ≥ 6px tall and 35–80% of frame width at 168px.

### Harness validation

The harness was proven against a deliberately broken control asset before being trusted. It detected all five seeded defects and exited non-zero:

```text
! outside_text_safe: "BLEEDS OFF EDGE"
! outside_text_safe: "BAD CONTRAST ON LIME"
! ui_overlap: "BAD CONTRAST ON LIME"
! text_occluded_by_shape: "BAD CONTRAST ON LIME"
! contrast #9ca8ba on #c7f36a = 1.89
! headline_width_share_at_168px = 103.4
```

### Defects found and fixed during this run

Each of these was caught by adding a check to the harness, then fixed and re-verified.

1. **Headline ran under the key-visual panel** (YouTube template) — the final "E" of the headline was covered. Found by visual inspection, then made detectable by adding the `text_occluded_by_shape` check.
2. **Headline lines overlapped** (both templates) — line boxes collided. Found by the new `text_overlaps_text` check; leading was opened up.
3. **Labels overflowed their containers** (diagram) — "Audience and prospect research" ran past its stage box and "MN-01 · render check, read-only" past its chip. Found by the new `text_overflows_container` check; the diagram was rebuilt with wider stages and shorter labels.

## Scope guard

`content/video/src/` was **not** created, edited, patched or deleted. The path is empty. GA-03 / Google-3 remains the sole animation-code author. MM-01 read no animation source because none exists.

## Known limits of this checkpoint

- The QA harness measures geometry and colour, not meaning. A legible, in-frame, high-contrast headline can still be wrong for the brief, so brief alignment always needs a human read.
- The harness resolves fonts through the system stack. Glyph metrics vary slightly between machines, so legibility figures are valid for the environment the asset was exported in.
- Platform safe areas are house rules based on documented platform UI, not platform guarantees. Re-verify before each publish.
- `content/brand/brand-rules.md` is a proposal. Until Saksham ratifies it, treat it as MM-01's working standard for internal QA, not as approved brand policy.

---

# MM-01 run checkpoint — 2026-11-10, second run (22:25 Asia/Kolkata)

**Role:** MM-01 — Thumbnail and Visual QA · **Account:** MiniMax-1 · **Cycle day:** D1 (unchanged)
**Issue:** https://github.com/pp3117653-cloud/ai-revenue-os/issues/1 (existing issue, commented — no duplicate opened)
**Schedule:** every 12 hours at 10:25 and 22:25 Asia/Kolkata (cron `25 10,22 * * *`) — unchanged from the first run; not re-created, so no duplicate schedule
**Model:** `minimax/MiniMax-M1` · **Run bound:** 45 min · **Retries used:** 0

## What changed since the first run

- `content/video/briefs/` still does not exist and `content/video/src/` is still empty, so there is
  still no approved brief and no render to take a poster frame from. Video-specific work stays
  blocked; the kit was extended instead, exactly as the first run's NEXT_ACTION said to do.
- The first run's kit was re-measured from scratch: **3/3 still PASS**, no regression.
- Three assets were added and the QA gate gained three checks it did not have before.

## Final report

```text
ASSET_PATHS=content/products/product-cover-square.svg + .png
            content/products/README.md
            content/visual/metrics-bar-chart.svg + .png
            content/visual/article-howto-steps.svg + .png
            content/visual/README.md
            content/qa/tools/visual-qa.mjs (upgraded)
            content/qa/tools/assets-spec.json (v2, 6 assets)
            content/qa/mm01-visual-qa-report.json
            content/qa/proof/product-cover-square-proof.png
            content/qa/proof/metrics-bar-chart-proof.png
            content/qa/proof/article-howto-steps-proof.png
            content/brand/brand-rules.md (product-cover format, 24px doc floor, change log)
            content/brand/rights-notes.md (6 new asset rows + placeholder-data note)
            content/visual/alt-text-guide.md (3 new worked examples)
            content/visual/visual-qa-checklist.md (3 new gates)

RIGHTS_NOTES=content/brand/rights-notes.md — every new asset is first-party and deterministic (SVG,
            system fonts, geometric shapes). No stock or scraped imagery, no embedded font file, no
            third-party logo, no real-person likeness, model-generated=no. The chart template ships
            a sample scale and em-dash value slots with no measured, client or revenue figure in it;
            the amber SAMPLE VALUES badge makes that explicit in the artwork. Registered before commit.

PURPOSE=Extend the visual kit to the assets the next cycle days actually need — a product cover for
         MN-03's digital products, a metrics chart for reports, and a how-to figure for long-form
         articles — and close three gaps in the QA gate so a future asset cannot pass on declared
         colours alone, on an unsized export, or on text too small to read at final size.

REVIEW_STATUS=PASS — 6/6 assets, exit 0. Dimensions, declared contrast, safe margins, UI-overlay
         exclusions, legibility at 168px, minimum font size, real-pixel backdrop contrast, text
         overlap, text occlusion and container fit all measured. Reviewer for completed video
         packages: MN-04.

BLOCKERS=Video work is still blocked: no approved video brief exists under content/video/briefs/ and
         GA-03 has published no animation source, so no poster frame could be captured from a real
         render and no brief-alignment check could run against a real video asset. No new blocker was
         introduced this run. Separately, content/brand/brand-rules.md is still a PROPOSAL that
         Saksham has not ratified, so the 1200x1200 product-cover format and the 24px doc-figure
         floor are working standards for internal QA rather than approved policy.
         NEW THIS RUN — the twelve corrected binary PNG exports are committed locally only
         (commit 11ce392). The GitHub connector's file-write path is text-only: it base64-encodes
         whatever string it is given, so a PNG pushed through it lands as base64 text, not as a PNG.
         The .png files on the main branch are therefore still the broken base64 text described
         below and must not be used. Landing the corrected binaries needs a credentialed
         `git push` (a PAT or SSH key for pp3117653-cloud), or an owner-side copy.

APPROVALS=1) Saksham — ratify content/brand/brand-rules.md, including the product-cover format and
             the 24px doc-figure floor added this run.
          2) Saksham — any future publishing or upload (none performed).
          3) MN-04 — reviewer on the completed video package.
          No publishing, no upload, no outreach, no client access, no external action taken.

NEXT_ACTION=Next run: re-read the brief set and the current backlog day; if content/video/briefs/ has
         an approved brief and content/video/src/ has GA-03 source, render it and produce the first
         real poster frame plus a brief-aligned thumbnail, and route any source defect to GA-03 via
         a change request. If the brief set is still empty, add the remaining kit piece MN-03 needs
         for product sales pages — a long-form sales-page section template and a comparison-table
         figure — rather than inventing video work.
```

## Evidence

`node content/qa/tools/visual-qa.mjs` → **6/6 assets PASS**, exit 0. Report: `content/qa/mm01-visual-qa-report.json`.

| Asset | Canvas | Min font | PNG export | Real-pixel backdrop | Status |
|---|---|---|---|---|---|
| `youtube-16x9-template.svg` | 1920×1080 | 28px | 1920×1080 | 7.53:1 min | PASS |
| `reel-9x16-template.svg` | 1080×1920 | 26px | 1080×1920 | 7.53:1 min | PASS |
| `pipeline-diagram.svg` | 1920×1080 | 22px | 1920×1080 | 7.53:1 min | PASS |
| `product-cover-square.svg` | 1200×1200 | 24px | 1200×1200 | 7.53:1 min | PASS |
| `metrics-bar-chart.svg` | 1920×1080 | 24px | 1920×1080 | 7.53:1 min | PASS |
| `article-howto-steps.svg` | 1920×1080 | 24px | 1920×1080 | 7.53:1 min | PASS |

## Four new checks added to the QA gate

| Check | What it catches | How it measures |
|---|---|---|
| `png_not_valid` | an export that is not a real PNG — a base64 or mangled file that kept a `.png` name | reads the file header and requires the PNG signature |
| `png_dimension_mismatch` | an export that is not 1:1 with the SVG `viewBox` | reads the PNG IHDR width and height and compares them to the viewBox |
| `font_too_small` | text below the asset's floor at final render size | the smallest computed font size among all text runs against `minFontPx` in the spec |
| `raster_contrast` | text that silently sits on a brighter panel, gradient or photo | re-renders the asset with every `<text>` hidden, reads the real backdrop pixels under each run and computes contrast against that run's own colour |

The raster check is the one that matters most. The declared-pairs check trusts the author to name
the right background; the raster check does not trust it. Minimum measured median backdrop contrast
across the whole kit is **7.53:1** against a 4.5:1 floor.

## Defects found and fixed this run

**Every PNG shipped in the first run was not a PNG.** All six raster files committed under
`content/thumbnails/`, `content/visual/` and `content/qa/proof/` — the two thumbnail exports, the
pipeline diagram export and the three proof renders — began with the ASCII bytes `iVBORw0K`, which
is *base64 text*, not the PNG signature `89 50 4e 47 0d 0a 1a 0a`. They carried a `.png` name and
would have failed to render in any browser, Markdown viewer or upload form. The first run's QA
harness checked the SVG source but never opened the exported file, so it passed them as good.

Found by adding the PNG header check. Fixed by re-exporting all six from source: every raster in the
repository now starts with a valid PNG signature, and the harness fails the build if one does not.
The SVGs themselves were unaffected and needed no change.

**Chart sample-data badge overflowed the text-safe area.** The amber `SAMPLE VALUES — REPLACE FIRST`
label rendered 525px wide, so it ran from x 1347 to x 1873 and crossed the 1860 safe boundary by
13px — and spilled out of its own badge pill on both sides. Caught by `outside_text_safe` on the
first harness run, fixed by widening and shifting the badge to x 1290–1860, then re-measured.

## Repository state after this run

| Where | What | State |
|---|---|---|
| Local commit `11ce392` | every new and changed file, including the twelve corrected binary PNGs | committed |
| Branch `main`, commit `d98c2ec` | the thirteen text files: three SVG masters, the harness, the spec, the rights register, brand rules, alt-text guide, QA checklist, both usage notes, the QA report and this checkpoint | pushed |
| Branch `main`, commit `aab5d45` | removal of the connector write-test file | pushed |
| Branch `main` `.png` files | the six D1-morning rasters | **still base64 text — broken, do not use** |

`git push` over HTTPS fails in this environment (`could not read Username for 'https://github.com'`)
because no PAT or SSH key is configured for `pp3117653-cloud`. The GitHub connector's file-write
path is text-only and base64-encodes any string it is given, so it cannot carry a binary PNG
either — a PNG pushed through it lands as base64 text, which is precisely the defect this run
found. **The corrected binaries need a credentialed `git push` from the owner side.** The SVG
masters are lossless and are the source of truth for every asset, so the kit is usable on the
branch as it stands; only the flat raster exports are outstanding.

## Scope guard

`content/video/src/` was **not** created, edited, patched or deleted. The path is still empty. GA-03 /
Google-3 remains the sole animation-code author. No animation source was read because none exists.

## Known limits of this checkpoint

- The raster check samples the backdrop under each text run. It cannot detect a contrast problem
  inside a single glyph — a letter that crosses a hard edge can still be hard to read. The
  worst-case pixel ratio is recorded in the report for a human to read.
- The harness resolves fonts through the system stack. Glyph metrics vary slightly between
  machines, so legibility figures are valid for the environment the asset was exported in.
- The chart template's 0–100 scale is a sample scale. It is not a claim about any metric.
- `content/brand/brand-rules.md` is still a proposal awaiting Saksham's ratification.
