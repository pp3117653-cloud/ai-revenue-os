# Visual QA checklist — MM-01

**Author: MM-01 (MiniMax-1) · Reviewer: MN-04 · Approver: Saksham.**

A visual asset is cleared only when every gate below passes. Gates are checked against the asset's own file, not against a description of it. Where a number is involved, it is measured — not eyeballed.

The automated half of this checklist lives in `content/qa/tools/visual-qa.mjs`. It renders each SVG in headless Chromium, measures real text geometry, and writes `content/qa/mm01-visual-qa-report.json` plus one proof PNG per asset.

```bash
node content/qa/tools/visual-qa.mjs
echo "exit $?"   # 0 = every asset passed, 1 = at least one failed
```

---

## Gate 1 — Dimensions

- [ ] Canvas is exactly one of the approved formats: 1920×1080 (16:9), 1080×1920 (9:16), or a documented doc size.
- [ ] Exported raster is 1:1 with the SVG `viewBox`; no rescaling, no letterboxing.
- [ ] File is PNG for raster delivery, and the PNG dimensions were confirmed after export.

## Gate 2 — Contrast

- [ ] Every text/background pair measured with the WCAG 2.1 relative-luminance formula.
- [ ] Body and headline text **≥ 4.5:1**. Large text (≥ 24px bold / ≥ 32px regular) and meaningful shape boundaries **≥ 3:1**.
- [ ] `--line` (`#2a3342`, 1.53:1) is used only for decorative hairlines, never for a meaningful border, input edge, or focus ring. Use `--line-strong` (`#556378`, 3.19:1).
- [ ] No text sits on an image region without a solid panel behind it.

## Gate 3 — Safe margins and UI-overlay zones

- [ ] All text inside the format's text-safe rectangle (see `content/brand/brand-rules.md` §3).
- [ ] No text inside any declared UI-overlay exclusion (YouTube duration badge, Reels action rail, Shorts title band).
- [ ] No text or key visual bleeds off the canvas edge.

## Gate 4 — Legibility

- [ ] Headline height at 168px width **≥ 6px** (measured, not estimated).
- [ ] Headline occupies **35–80%** of frame width at 168px.
- [ ] No text run overlaps another text run, and no text is occluded by a shape drawn after it.
- [ ] No text spills outside the panel, chip, badge or card it belongs to.
- [ ] Body copy is not smaller than 3% of canvas height.

## Gate 5 — Asset rights

- [ ] Asset is registered in `content/brand/rights-notes.md` with author, source, licence, third-party elements, model-generated flag, and likeness flag.
- [ ] No stock, scraped, or unlicensed imagery; no embedded font files; no third-party logos.
- [ ] **No real person's likeness**, and no AI-generated image depicting a real person, without written permission attached.
- [ ] Nothing revealing client-confidential data.

## Gate 6 — Brief alignment

- [ ] The asset matches the approved brief: topic, platform, aspect ratio, duration, CTA, style.
- [ ] The headline states the approved promise and makes no claim the source material does not support.
- [ ] No invented statistic, testimonial, client name, or outcome.
- [ ] Brand rules in `content/brand/brand-rules.md` are followed, or a deviation is written down and approved.

## Gate 7 — Scope guard

- [ ] **No file under `content/video/src/` was created, edited, patched or deleted.** That path belongs to GA-03 / Google-3 alone. MM-01 may read and render it; it may not author it.
- [ ] If QA found an animation-source defect, a change request was written and routed to GA-03 instead of being fixed directly. Template: `content/video/qa/change-request-<video-id>.md`.
- [ ] No file was published, uploaded, or sent anywhere.
- [ ] All outputs landed under `content/` or `products/`.

## Gate 8 — Accessibility

- [ ] Alt text exists and follows `content/visual/alt-text-guide.md`.
- [ ] SVG carries `<title>` and `<desc>`, and `role="img"`.
- [ ] Alt text matches the final asset, re-checked after any headline swap.

---

## Review record

Each QA run appends to `content/qa/mm-01-checkpoint-<date>.md`:

```text
ASSET=path
DIMENSIONS=wxh
CONTRAST_MIN=ratio (pair)
SAFE_AREA=violations
LEGIBILITY=headline px @168px / width share %
RIGHTS=status
BRIEF_ALIGNMENT=pass|fail|not_applicable
SCOPE=content/video/src untouched: yes
STATUS=PASS|FAIL|BLOCKED
REVIEWER=MN-04
APPROVAL=Saksham
```

## Known limits of the automated harness

- It measures **geometry and colour**, not meaning. A headline that is legible, in-frame and high-contrast can still be wrong for the brief — a human check is still required for Gate 6.
- It checks the SVG source, not a hand-edited PNG. If someone edits the raster directly, re-export from the SVG.
- It resolves fonts through the system stack; glyph metrics differ slightly across machines, which is why Gate 4 is measured in the same environment the asset is exported in.
- A green report means the measurable gates passed. It is not an approval to publish.
