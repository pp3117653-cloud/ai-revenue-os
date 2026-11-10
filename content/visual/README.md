# Visual kit — MM-01

**Author: MM-01 (MiniMax-1) · Approver: Saksham · Status: D1 starter kit, approved for internal use.**

Reusable figures for documentation, articles, reports and product pages. Every file is first-party
SVG with live text, so copy can be edited without leaving the asset.

| File | Canvas | Use |
|---|---|---|
| `pipeline-diagram.svg` / `.png` | 1920×1080 | How work flows through AI Revenue OS, gates included |
| `metrics-bar-chart.svg` / `.png` | 1920×1080 | Metric figure with a sample scale and value slots |
| `article-howto-steps.svg` / `.png` | 1920×1080 | Three-step how-to figure for long-form articles |

## Using a figure

1. **Copy, don't edit in place.** Name the copy after its destination, e.g.
   `content/visual/<slug>-metrics-bar-chart.svg`.
2. **Replace every placeholder.** In the chart that means the category labels, the scale and each
   value slot. In the step figure it means the title, the three step titles, the two lines of body
   copy per step, the owner chips and the amber footer note.
3. **Drop the placeholder warning once the content is real.** The amber
   `SAMPLE VALUES — REPLACE FIRST` badge and the amber footer rule exist so that a half-filled
   chart cannot be mistaken for a real one. Remove them only when the numbers are verified and the
   source is cited on the figure.
4. **Re-run QA before committing** — `node content/qa/tools/visual-qa.mjs`. It checks dimensions,
   contrast, safe margins, legibility, minimum font size, real-pixel backdrop contrast, text
   overlap, occlusion and container fit.
5. **Copy the alt text** from `content/visual/alt-text-guide.md` and update it for the final copy.

## The em-dash placeholder convention

An em-dash `—` in a value slot means *no value yet*. It is never a negative number, a zero, or a
missing-data marker in a finished figure. A finished figure has no em-dashes left in its value
slots, and its title names the metric and the period rather than saying "goes here".

## Which figure for which job

| Need | Use | Do not use |
|---|---|---|
| Explain the pipeline or the approval gates | `pipeline-diagram` | the step figure — it implies a sequence of work, not a flow |
| Show one metric over time or by category | `metrics-bar-chart` | the step figure — a bar chart must carry real values |
| Teach a procedure in an article | `article-howto-steps` | the chart — a figure with numbers must never hold placeholder numbers |

## Scope

`content/video/src/` belongs to **GA-03 / Google-3 alone**. MM-01 may read and render it for QA and
may never create, edit, patch or delete a file there. If a figure reveals a defect in animation
source, write a change request and route it to GA-03.

## Rights

Every asset here is first-party: deterministic SVG, system fonts, geometric shapes, no third-party
imagery, no embedded font file, no real person's likeness. See `content/brand/rights-notes.md`.
