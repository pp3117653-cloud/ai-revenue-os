# Thumbnail and poster-frame kit — MM-01

**Author: MM-01 (MiniMax-1) · Approver: Saksham · Status: D1 starter kit, approved for internal use.**

Two editable thumbnail templates, one reusable visual-QA harness, and the rules that keep them compliant.

| File | Canvas | Use |
|---|---|---|
| `youtube-16x9-template.svg` | 1920×1080 | YouTube landscape thumbnail, blog and doc hero |
| `youtube-16x9-template.png` | 1920×1080 | Flat export of the above |
| `reel-9x16-template.svg` | 1080×1920 | Instagram Reel and YouTube Shorts cover |
| `reel-9x16-template.png` | 1080×1920 | Flat export of the above |
| `content/qa/tools/visual-qa.mjs` | — | Renders, measures and checks every MM-01 asset |
| `content/qa/tools/assets-spec.json` | — | Safe areas, exclusions and contrast pairs per asset |

---

## Using a template

1. **Copy, don't edit in place.** Work on a copy named after the video, e.g. `content/thumbnails/<video-id>-youtube-16x9.svg`.
2. **Replace the three text runs**, and nothing else:
   - the eyebrow (`AI REVENUE OS`) — channel or category label;
   - the two headline lines — the promise, in the viewer's language;
   - the supporting line — one line that earns the click;
   - the duration badge — the real runtime, e.g. `90 SEC`.
3. **Drop the key visual into the dashed slot.** For a video, that is the poster frame captured from the approved render. For a product, it is a diagram or a chart MM-01 produced.
4. **Re-run QA** before committing. The harness will fail the build on a safe-area breach, a contrast regression, an overlapping text run, a headline that is too small at 168px, or text that spills out of its container.
5. **Copy the alt text** from `content/visual/alt-text-guide.md` and update it for the new headline.

## Safe areas

Exact pixel rectangles. The harness enforces them; this is for humans.

| | YouTube 16:9 | Reel 9:16 |
|---|---|---|
| Canvas | 1920×1080 | 1080×1920 |
| Text safe area | x 96–1824, y 72–1008 | x 72–1008, y 300–1380 |
| UI exclusions | duration badge, x 1536–1824, y 920–1008 | Reels action rail, x 872–1008, y 980–1620 · Shorts title band, x 72–872, y 1560–1780 |
| Key-visual slot | x 1090–1824, y 180–900 | x 72–856, y 870–1380 |

The Reel template deliberately leaves the lower ~540px empty. That region is covered by the caption, handle and interface on Reels and Shorts — filling it is the most common way a vertical cover becomes unreadable in-feed.

## Poster frames

A poster frame is a still from an approved render. The render pipeline writes frames to `content/video/renders/<video-id>/frames/` and the MP4 to `content/video/renders/<video-id>/<video-id>.mp4`; GitHub Actions deletes the frame folder after encoding, so **a poster frame must be captured from the finished MP4, not from the deleted frames**.

- Capture at the video's native resolution (1080×1920 for vertical).
- Pick the frame that carries the strongest single idea, with no animation mid-transition and no caption cut in half.
- Keep any on-frame text inside the same text-safe rectangle as the thumbnail.
- Save the poster frame to `content/video/renders/<video-id>/` and record it in the rights register before it is used.
- **MM-01 never modifies `content/video/src/`.** If the source needs a change to produce a better poster frame, write a change request and route it to GA-03 — see `content/visual/visual-qa-checklist.md` §7.

## Rebuilding the exports

```bash
node content/qa/tools/visual-qa.mjs
```

This re-renders every PNG, re-measures it, rewrites `content/qa/mm01-visual-qa-report.json`, and regenerates the proof PNGs in `content/qa/proof/` showing the safe area, the UI exclusions and the measured text boxes. Exit code `0` means every asset passed; `1` means at least one failed, with the reason printed.

The proof PNGs are internal QA evidence. They are not publishable artwork.

## Adding a new asset

1. Create the SVG under `content/thumbnails/` or `content/visual/`.
2. Add an entry to `content/qa/tools/assets-spec.json` with the canvas, safe area, exclusions, headline class and the contrast pairs to enforce.
3. Give the headline text elements `class="headline"` so the legibility check can find them.
4. Run the harness until it reports `PASS`.
5. Register the asset in `content/brand/rights-notes.md` and add alt text to `content/visual/alt-text-guide.md`.

## Rights

Every asset here is first-party: deterministic SVG, system fonts, geometric shapes, no third-party imagery, no embedded font file, no real person's likeness. See `content/brand/rights-notes.md`.
