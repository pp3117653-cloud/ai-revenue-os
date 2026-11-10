# Asset rights register — AI Revenue OS

**Owner: MM-01 (MiniMax-1) · Approver for any third-party or model-generated asset: Saksham.**

Every asset MM-01 ships is registered here before it is committed. If an asset is not in this register, it is not cleared.

Status values: `first-party` (authored directly, deterministic, no external input) · `model-generated` (produced by an image or media model) · `licensed` (third-party under a recorded licence) · `unclear` (blocked until Saksham decides).

---

## Register

| Asset | Author | Source | Licence | Third-party elements | Model-generated | Real-person likeness | Status |
|---|---|---|---|---|---|---|---|
| `content/thumbnails/youtube-16x9-template.svg` | MM-01 | first-party | internal / repo license | none | no | no | cleared |
| `content/thumbnails/youtube-16x9-template.png` | MM-01 | first-party | internal / repo license | system fonts only (Inter fallback: no embedded font file) | no | no | cleared |
| `content/thumbnails/reel-9x16-template.svg` | MM-01 | first-party | internal / repo license | none | no | no | cleared |
| `content/thumbnails/reel-9x16-template.png` | MM-01 | first-party | internal / repo license | system fonts only | no | no | cleared |
| `content/visual/pipeline-diagram.svg` | MM-01 | first-party | internal / repo license | none | no | no | cleared |
| `content/visual/pipeline-diagram.png` | MM-01 | first-party | internal / repo license | system fonts only | no | no | cleared |
| `content/qa/proof/*.png` | MM-01 | first-party (QA evidence) | internal / repo license | none | no | no | cleared |
| `content/products/product-cover-square.svg` | MM-01 | first-party | internal / repo license | none | no | no | cleared |
| `content/products/product-cover-square.png` | MM-01 | first-party | internal / repo license | system fonts only | no | no | cleared |
| `content/visual/metrics-bar-chart.svg` | MM-01 | first-party | internal / repo license | none | no | no | cleared |
| `content/visual/metrics-bar-chart.png` | MM-01 | first-party | internal / repo license | system fonts only | no | no | cleared |
| `content/visual/article-howto-steps.svg` | MM-01 | first-party | internal / repo license | none | no | no | cleared |
| `content/visual/article-howto-steps.png` | MM-01 | first-party | internal / repo license | system fonts only | no | no | cleared |

## Notes

- **Placeholder assets carry no data.** `content/visual/metrics-bar-chart.svg` ships with a sample
  scale (0–100) and an em-dash in every value slot. It contains **no measured, client or revenue
  figure**. The amber `SAMPLE VALUES — REPLACE FIRST` badge and the amber footer rule are part of
  the artwork so a half-filled chart cannot pass as real. Replace every em-dash with a verified
  figure and cite the source before the chart is shown to anyone.
- **`content/visual/article-howto-steps.svg` and `content/products/product-cover-square.svg` are
  copy shells.** Their wording is placeholder copy marked as such, not a statement of fact.

- **No webfonts are embedded.** Every asset uses a system font stack, so no font licence travels with the asset.
- **No third-party imagery.** No stock photo, screenshot, icon pack, or scraped image is used anywhere in the MM-01 asset set.
- **No real person appears in any asset.** No likeness, portrait, or photorealistic human.
- **No trademarked logos.** The wordmark used is the plain-text string "AI Revenue OS" set in a system font. It is not a logo and carries no third-party mark.
- **`content/qa/proof/` images are internal QA evidence.** They carry the safe-area overlay and measured text boxes and must not be published or used as thumbnails.

## Template for new assets

Copy this block into the register when shipping a new asset.

```
| `path/to/asset.ext` | MM-01 | first-party \| model-generated \| licensed | licence text | third-party elements or "none" | yes/no | no (unless permission attached) | cleared \| unclear |
```

And record, in the asset's own notes file:

```text
AUTHOR=
SOURCE=first-party | model-generated | licensed
LICENCE=
THIRD_PARTY_ELEMENTS=none | <list>
MODEL_GENERATED=yes|no
MODEL_AND_VERSION=          # required when MODEL_GENERATED=yes
LIKENESS_PRESENT=no          # must be "no" unless written permission is attached
PERMISSION_REFERENCE=        # required when LIKENESS_PRESENT=yes
APPROVED_BY=
APPROVED_ON=
```

## Blocked by default

- Any image depicting a real person, even if AI-generated, until written permission is attached.
- Any asset whose licence, source, or ownership cannot be stated in one line.
- Any downloaded stock image or web asset without a recorded licence URL and retrieval date.
- Any rendering that embeds a real client logo, name, or confidential client data.
