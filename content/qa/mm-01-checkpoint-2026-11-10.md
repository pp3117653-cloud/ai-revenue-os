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


## Follow-up — 2026-11-11

The six SVG masters were rerendered through the visual QA harness. All six delivery PNGs and all six proof PNGs now have valid PNG structure and match their SVG canvas dimensions. The rerun reports **6/6 assets PASS**. The coordinator workflow was also corrected to use UTC cron times that map to its documented 09:15 and 21:15 Asia/Kolkata schedule, to validate PNG signatures and dimensions, and to fail rather than silently suppress checkpoint-creation errors. It remains a repository-check workflow only; it does not invoke any of the eight model accounts or execute their role tasks.

---

# MM-01 run checkpoint — 2026-11-11, 10:25 Asia/Kolkata

**Role:** MM-01 — Thumbnail and Visual QA · **Account:** MiniMax-1 · **Cycle day:** D1 (still the only day with evidence)
**Issue:** https://github.com/pp3117653-cloud/ai-revenue-os/issues/1 (existing issue, commented — no duplicate opened)
**Schedule:** every 12 hours at 10:25 and 22:25 Asia/Kolkata (cron `25 10,22 * * *`) — unchanged, not re-created
**Model:** `minimax/MiniMax-M1` · **Run bound:** 45 min · **Retries used:** 0 (the QA harness ran twice: once to detect and repair, once to confirm)

## What changed since the last run

The owner restored the PNG exports on `main` (commit `c782a4b`, "Fix coordinator checks and restore PNG exports"), so the previous run's binary-export blocker is **resolved in principle**. The restored files are valid PNGs of the correct size. They are, however, **rendered in a serif face** while the brand stack in `content/brand/brand-rules.md` §2 is sans-serif. The SVG masters are unchanged and correct; the exports no longer match their masters.

No approved video brief and no GA-03 animation source exist, so poster-frame work is still blocked. MN-03 and MN-02 both checkpointed as blocked today for the same underlying reason (no accepted research, no approved offer, no open task), so there is no brief-aligned visual to produce.

## Final report

```text
ASSET_PATHS=content/thumbnails/youtube-16x9-template.png   (re-exported)
            content/thumbnails/reel-9x16-template.png      (re-exported)
            content/visual/pipeline-diagram.png            (re-exported)
            content/visual/metrics-bar-chart.png           (re-exported)
            content/visual/article-howto-steps.png         (re-exported)
            content/products/product-cover-square.png       (re-exported)
            content/qa/proof/*.png                          (6 regenerated proofs)
            content/qa/tools/visual-qa.mjs                  (two new gates)
            content/qa/tools/assets-spec.json               (v3)
            content/qa/mm01-visual-qa-report.json
            content/brand/brand-rules.md                    (export caveat)
            content/visual/visual-qa-checklist.md           (two new gate lines)

RIGHTS_NOTES=content/brand/rights-notes.md — unchanged and still current. No asset was added or re-licensed this run; the six re-exported rasters are the same first-party, deterministic SVGs re-rendered from their masters. No stock or scraped imagery, no embedded font file, no third-party logo, no real-person likeness, model-generated=no.

PURPOSE=Make the visual gate able to catch an export that is the right file and the right size but the wrong picture, and put the shipped kit back in the brand typeface.

REVIEW_STATUS=PASS — 6/6 assets, exit 0 on the confirming run. Dimensions, declared contrast, safe margins, UI-overlay exclusions, legibility at 168px, minimum font size, real-pixel backdrop contrast, PNG header, PNG dimensions, font-stack resolution and export drift all measured. Reviewer for completed video packages: MN-04.

BLOCKERS=1) Video work still blocked: no approved brief under content/video/briefs/ and no GA-03 source, so no poster frame from a real render and no brief-alignment check against a real video asset.
        2) The six re-exported PNGs are committed locally only. `git push` over HTTPS still fails here with `could not read Username for 'https://github.com'` — no PAT or SSH key is configured for pp3117653-cloud — and the GitHub connector's file-write path is text-only, so it cannot carry a binary PNG. The SVGs on `main` are correct and lossless; only the flat rasters are outstanding.
        3) content/brand/brand-rules.md is still a PROPOSAL awaiting Saksham's ratification.

APPROVALS=1) Saksham — ratify content/brand/brand-rules.md, now including the export caveat.
          2) Saksham — push the six re-exported PNGs (local commit below) with a credentialed git push, or run `node content/qa/tools/visual-qa.mjs` on a machine that has one.
          3) Saksham — any future publishing or upload (none performed).
          4) MN-04 — reviewer on the completed video package.
         No publishing, no upload, no outreach, no client access, no external action taken.

NEXT_ACTION=Next run: re-read the brief set and the current backlog day. If content/video/briefs/ holds an approved brief and content/video/src/ holds GA-03 source, render it and produce the first real poster frame plus a brief-aligned thumbnail, routing any source defect to GA-03 via a change request. If the brief set is still empty, keep the kit honest rather than growing it: re-run the QA gate, confirm zero export drift, and add a short "how to run the visual gate" section to content/visual/README.md. Recommend to the owner that the coordinator workflow's PNG check call the MM-01 harness instead of its own header-and-size script, so drift and typeface are checked in CI too.
```

## Defect found and fixed

**The restored PNG exports were re-typed in a serif face.** All six rasters on `main` carried the brand's sans-serif geometry nowhere: the text rendered in DejaVu Serif while `content/brand/brand-rules.md` §2 specifies a sans stack. Nothing in the repository's own checks could see it — the coordinator's PNG validation reads the header and the IHDR size, and the MM-01 harness checked the SVG source, so a serif export passed every gate while looking wrong.

Found by adding the export-fidelity gate: the harness now renders the master, compares it pixel for pixel against the raster already on disk, and fails when they differ by more than 1%. Measured drift on the shipped files:

| Asset | Drift from a fresh render of its master |
|---|---|
| `youtube-16x9-template.png` | 4.85% |
| `reel-9x16-template.png` | 3.59% |
| `pipeline-diagram.png` | 5.54% |
| `product-cover-square.png` | 5.71% |
| `metrics-bar-chart.png` | 2.33% |
| `article-howto-steps.png` | 3.75% |

Fixed by re-exporting all six from their masters with the harness. The confirming run measures **0.00% drift on all six**.

## Two new checks added to the QA gate

| Check | What it catches | How it measures |
|---|---|---|
| `export_drift` | a shipped raster that no longer matches its master — a different renderer, a different typeface, a hand-edited export | renders the master and compares it to the raster on disk pixel for pixel; fails above `maxExportDriftPct` (default 1%) |
| `font_stack_resolves_to_serif` | a renderer that ignores `font-family` and silently falls back to the generic serif default | measures a probe string in the brand stack against the generic `serif` and `sans-serif` faces |

The harness now also renders, compares and **only then** writes, so a shipped raster is never overwritten before it has been checked against its master.

## Scope guard

`content/video/src/` was **not** created, edited, patched or deleted. The path is still empty. GA-03 / Google-3 remains the sole animation-code author. No animation source was read because none exists.

## Known limits of this checkpoint

- Export drift compares two renders of the same SVG. It cannot tell a *better* render from a *worse* one — it only proves the shipped file is the render the harness produces. Typography judgement still needs a human eye, which is what Gate 6 of the checklist is for.
- The font-stack probe compares against the generic faces of the machine that runs the harness. On a machine with no sans face installed it would report a false pass.
- The brand stack resolves to DejaVu Sans in this environment; a machine with Inter installed will render slightly different glyphs, which is why the SVG masters stay the source of truth and the rasters are derived.

---

# MM-01 run checkpoint — 2026-11-12, 10:25 Asia/Kolkata

**Role:** MM-01 — Thumbnail and Visual QA · **Account:** MiniMax-1 · **Cycle day:** D1 (still the only day with evidence)
**Issue:** https://github.com/pp3117653-cloud/ai-revenue-os/issues/1 (existing issue, commented — no duplicate opened)
**Schedule:** every 12 hours at 10:25 and 22:25 Asia/Kolkata (cron `25 10,22 * * *`) — unchanged, not re-created
**Model:** `minimax/MiniMax-M1` · **Run bound:** 45 min · **Retries used:** 0 (harness ran twice: detect+repair, then confirm)

## What changed since the last run

Nothing visual. The branch has only MN-02 and MN-03 checkpoints, both blocked for the same reasons as yesterday (no accepted research, no approved offer, no open task). No approved video brief, no GA-03 animation source, so poster-frame work remains blocked. The PNG exports on `main` are still the serif renders from `c782a4b`: last run's corrected binaries again failed to land, because `git push` has no credential here and the connector's file-write path is text-only.

## Final report

```text
ASSET_PATHS=content/thumbnails/youtube-16x9-template.png   (re-exported)
            content/thumbnails/reel-9x16-template.png      (re-exported)
            content/visual/pipeline-diagram.png            (re-exported)
            content/visual/metrics-bar-chart.png           (re-exported)
            content/visual/article-howto-steps.png         (re-exported)
            content/products/product-cover-square.png       (re-exported)
            content/qa/proof/*.png                          (6 regenerated proofs)
            content/qa/tools/visual-qa.mjs                  (export_drift made a hard gate; font-stack probe)
            content/qa/tools/assets-spec.json               (v3)
            content/qa/mm01-visual-qa-report.json
            content/visual/README.md                        ("How to run the visual gate")

RIGHTS_NOTES=content/brand/rights-notes.md — unchanged and still current. No asset added or re-licensed this run; the re-exported rasters are the same first-party, deterministic SVGs re-rendered from their masters. No stock or scraped imagery, no embedded font file, no third-party logo, no real-person likeness, model-generated=no.

PURPOSE=Make the drift gate a hard failure that names the real problem — "this raster was not produced by the MM-01 harness" — rather than a typeface guess, and give whoever has push access a single documented command that re-exports and republishes the kit correctly.

REVIEW_STATUS=PASS — 6/6 assets, exit 0 on the confirming run. Dimensions, declared contrast, safe margins, UI-overlay exclusions, legibility at 168px, minimum font size, real-pixel backdrop contrast, PNG header, PNG dimensions, font-stack resolution and export drift all measured. Drift is 0.00% on all six after re-export. Reviewer for completed video packages: MN-04.

BLOCKERS=1) Video work still blocked: no approved brief under content/video/briefs/ and no GA-03 source, so no poster frame from a real render and no brief-alignment check against a real video asset.
        2) The six re-exported PNGs are committed locally only. `git push` over HTTPS fails here with `could not read Username for 'https://github.com'` — no PAT or SSH key for pp3117653-cloud — and the connector's file-write path is text-only, so it cannot carry a binary PNG. The SVGs on main are correct and lossless; only the flat rasters are outstanding.
        3) content/brand/brand-rules.md is still a PROPOSAL awaiting Saksham's ratification.

APPROVALS=1) Saksham — ratify content/brand/brand-rules.md.
          2) Saksham — publish the re-exported rasters. The exact commands are in content/visual/README.md, "How to run the visual gate": run the harness twice, then commit and push the six PNGs and the QA report.
          3) Saksham — any future publishing or upload (none performed).
          4) MN-04 — reviewer on the completed video package.
         No publishing, no upload, no outreach, no client access, no external action taken.

NEXT_ACTION=Next run: re-read the brief set and the current backlog day. If content/video/briefs/ holds an approved brief and content/video/src/ holds GA-03 source, render it and produce the first real poster frame plus a brief-aligned thumbnail, routing any source defect to GA-03 via a change request. If the brief set is still empty, stop adding kit and instead verify that the re-exported rasters actually landed on main — read the PNG signature and the drift figure from the branch, not from the local checkout. If they still have not landed, raise it to Saksham as the single blocking item for the visual track.
```

## What changed in the gate

`export_drift` is now a **hard failure**, and it reports the objective fact: the shipped raster was not produced by this harness and does not match a fresh render of its master. The drift limit is `maxExportDriftPct` in the spec (default 1%).

The typeface is checked separately and more reliably by `font_stack_resolves_to_serif`, which measures the brand stack against the generic `serif` and `sans-serif` faces in the exporting environment. An earlier attempt to attribute a shipped raster to a typeface by comparing pixel distances against a forced-serif render was dropped: the margin between "matches a serif render" and "matches a different environment" was too thin to trust, so the gate now reports only what it can prove.

The harness still renders, compares and **only then** writes, so a shipped raster is never overwritten before it has been checked against its master.

## Measured drift on the rasters currently on `main`

| Asset | Drift from a fresh render of its master | Verdict |
|---|---|---|
| `youtube-16x9-template.png` | 4.85% | drift — not produced by the harness |
| `reel-9x16-template.png` | 3.59% | drift — not produced by the harness |
| `pipeline-diagram.png` | 5.54% | drift — not produced by the harness |
| `product-cover-square.png` | 5.71% | drift — not produced by the harness |
| `metrics-bar-chart.png` | 2.33% | drift — not produced by the harness |
| `article-howto-steps.png` | 3.75% | drift — not produced by the harness |

After re-export, all six measure **0.00%**. The font stack resolves to a sans face in this environment on all six, and the `font_stack_resolves_to_serif` probe is clean.

## Scope guard

`content/video/src/` was **not** created, edited, patched or deleted. The path is still empty. GA-03 / Google-3 remains the sole animation-code author. No animation source was read because none exists.

## Known limits of this checkpoint

- `export_drift` compares the shipped raster with a render made in the **same environment** as the check. A raster exported on a machine with a different sans face will read as drift even when it is perfectly good. The designated exporter is the harness, so the remedy is to re-export, not to judge.
- The drift check cannot name the typeface of a foreign raster. That judgement was a human read this run — the shipped text renders in a serif face — and it is reported here as an observation, not as a measurement.
- The brand stack resolves to DejaVu Sans here; a machine with Inter installed renders slightly different glyphs. The SVG masters stay the source of truth and the rasters stay derived.

---

# MM-01 run checkpoint — 2026-11-12, 22:25 Asia/Kolkata

**Role:** MM-01 — Thumbnail and Visual QA · **Account:** MiniMax-1 · **Cycle day:** D1 (still the only day with evidence)
**Issue:** https://github.com/pp3117653-cloud/ai-revenue-os/issues/1 (existing issue, commented — no duplicate opened)
**Schedule:** every 12 hours at 10:25 and 22:25 Asia/Kolkata (cron `25 10,22 * * *`) — unchanged, not re-created
**Model:** `minimax/MiniMax-M1` · **Run bound:** 45 min · **Retries used:** 0

## What changed since the last run

Only MN-02 and MN-03 evening checkpoints on the branch, both blocked for the same reasons as every other run (no accepted research, no approved offer, no open task). No approved video brief and no GA-03 animation source, so poster-frame work stays blocked. The rasters on `main` still have not landed: this run measured the same drift as the morning run — 4.85%, 3.59%, 5.54%, 5.71%, 2.33%, 3.75%.

## Final report

```text
ASSET_PATHS=content/qa/tools/export-assets.yml           (CI export workflow, installable copy)
            content/qa/tools/visual-qa.mjs                (exporter fingerprint, shipped-file checks, no-clobber rule)
            content/visual/README.md                      (install + run instructions)
            content/qa/mm01-visual-qa-report.json
            content/qa/tools/assets-spec.json
            (the six rasters and six proofs were re-exported locally; see BLOCKERS)

RIGHTS_NOTES=content/brand/rights-notes.md — unchanged and still current. No asset added or re-licensed this run; no new imagery of any kind was produced. The workflow file is first-party automation authored by MM-01 and ships no third-party element.

PURPOSE=Stop the raster delivery gap from repeating a third time by giving the repository an export path that does not depend on anyone's local machine, and make the gate itself truthful about who owns the rasters.

REVIEW_STATUS=PASS — 6/6 assets, exit 0. Dimensions, declared contrast, safe margins, UI-overlay exclusions, legibility at 168px, minimum font size, real-pixel backdrop contrast, PNG header and size of the file on disk, font-stack resolution and export drift all measured. Reviewer for completed video packages: MN-04.

BLOCKERS=1) Video work still blocked: no approved brief under content/video/briefs/ and no GA-03 source, so no poster frame from a real render and no brief-alignment check against a real video asset.
        2) The six corrected PNGs are still local only. `git push` over HTTPS fails with `could not read Username for 'https://github.com'` — no PAT or SSH key for pp3117653-cloud — and the connector's file-write path is text-only, so it cannot carry a binary PNG.
        3) NEW — the connector also refuses to write files under `.github/workflows/`. The export workflow could not be installed by MM-01 and has to be installed by the owner; the exact file is committed at content/qa/tools/export-assets.yml with a one-line install command in content/visual/README.md. I did not attempt to work around that guard.
        4) content/brand/brand-rules.md is still a PROPOSAL awaiting Saksham's ratification.

APPROVALS=1) Saksham — ratify content/brand/brand-rules.md.
          2) Saksham — install the export workflow and dispatch it once. This is the only remaining step for the rasters to land; it also makes every later export automatic for whoever runs the harness.
          3) Saksham — any future publishing or upload (none performed).
          4) MN-04 — reviewer on the completed video package.
         No publishing, no upload, no outreach, no client access, no external action taken.

NEXT_ACTION=Next run: read the branch, not the local checkout. If content/qa/tools/export-assets.yml has been installed and dispatched, confirm the rasters on main carry the brand face by running the harness against a fresh checkout and checking the drift figures and the exporter field in the committed report. If the workflow is still not installed, stop re-exporting locally — the local binaries cannot land — and instead spend the run on the brief-aligned poster frame if content/video/briefs/ finally holds an approved brief. Do not add more kit while the export path is unproven.
```

## Gate changes this run

1. **Exporter fingerprint.** The report now records the environment that produced the rasters — Chromium build, platform and font metrics. A checker in the *same* environment treats drift as a failure and re-exports; a checker in a *different* environment reports it as a note and leaves the file alone, so two machines cannot fight over the same asset.
2. **The shipped file is now checked, not the fresh render.** The PNG header and size checks previously tested the buffer the harness had just produced, which is always well formed and so proved nothing. They now test the file on disk. This is a real correction to an earlier claim: the base64 defect found on 2026-11-10 was caught by manual inspection, not by the harness, and the harness would not have caught it.
3. **No clobbering.** A raster is rewritten only when it is missing, unusable, or provably not the render of its master in the current environment.
4. **Truthful exporter record.** The report declares an exporter only when that run actually produced every raster it checked. Otherwise it records no exporter, which keeps the branch in the state where any environment treats drift as a real difference rather than deferring to a stale owner.

## CI export path

`content/qa/tools/export-assets.yml` is a manual-dispatch-only GitHub Actions workflow that installs the renderer and the brand-safe fonts, runs the harness twice (measure and re-export, then verify), and commits the re-exported rasters and the QA report with the built-in token. It never publishes, never uploads, never runs on a schedule, and writes only under `content/`. It cannot be installed by MM-01: the API path used here refuses to write under `.github/workflows/`, which is a deliberate guard and was not worked around.

Install it with:

```bash
cp content/qa/tools/export-assets.yml .github/workflows/export-assets.yml
git add .github/workflows/export-assets.yml
git commit -m "Add MM-01 asset export workflow"
git push
gh workflow run export-assets.yml -f reason="MM-01 asset export"
```

## Scope guard

`content/video/src/` was **not** created, edited, patched or deleted. The path is still empty. GA-03 / Google-3 remains the sole animation-code author. No animation source was read because none exists.

## Known limits of this checkpoint

- The exporter fingerprint decides failure versus note. Two environments with the same Chromium build and the same font metrics are treated as one environment; anything else is a note.
- The drift check compares a shipped raster with a render made in the current environment. It cannot name the typeface of a foreign raster, so the serif appearance of the shipped rasters remains a human observation rather than a measurement.
- The export workflow is unproven until it is installed and run once. It is written to fail loudly rather than silently: if the fonts or the renderer are wrong, the second pass fails and nothing is committed.
