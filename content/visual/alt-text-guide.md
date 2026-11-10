# Alt-text guide — AI Revenue OS

**Author: MM-01 (MiniMax-1) · Applies to every image, thumbnail, poster frame, diagram and chart MM-01 ships.**

Alt text is read aloud by screen readers and shown when an image fails to load. It describes **what the image does and shows**, not a list of keywords.

## Rules

1. **Describe the function first.** A reader who cannot see the image should learn what it is for, then what is in it.
2. **One or two sentences.** Long alt text belongs in a visible caption or in the body copy, not in the `alt` attribute.
3. **No keyword stuffing.** "AI revenue OS thumbnail, business, automation, SaaS, growth" helps nobody. Describe the actual scene.
4. **Do not repeat surrounding text.** If the caption next to the image already says "Step 3 — GA-03 writes the animation source", the alt text should not open with the same sentence.
5. **Include the text that appears inside the image** when that text carries the meaning (a headline, a label, a number). Quote it.
6. **State the meaningful data, not just the chart type.** "Bar chart of monthly revenue" is weak. "Bar chart of monthly revenue, rising from ₹40,000 in January to ₹118,000 in June" is useful.
7. **Never invent.** If an asset's content is unknown or unverified, say so rather than guessing.
8. **Decorative images get empty alt** (`alt=""`) so screen readers skip them. A divider or a pure ornament is decorative.

## Template

```text
<Purpose — what this image is for>. <Content — what is shown, including the meaningful on-image text and any key number>.
```

## Worked examples

### `content/thumbnails/youtube-16x9-template.png`

> Thumbnail template for a 16 by 9 video. On the left, a lime label reading "AI Revenue OS" above the placeholder headline "HEADLINE HERE / SECOND LINE", a grey line reading "One line that earns the click", and a lime badge reading "90 SEC". On the right, a dashed empty frame marked "KEY VISUAL" for a poster frame or diagram.

### `content/thumbnails/reel-9x16-template.png`

> Vertical video thumbnail template for Reels and Shorts. A lime label reading "AI Revenue OS" sits above the placeholder headline "HEADLINE HERE / SECOND LINE", a grey line reading "One line that earns the click", and a lime badge reading "90 SEC". The lower half holds a dashed empty frame marked "KEY VISUAL", kept clear of the right-hand action rail. The bottom of the frame is left empty for the caption and interface overlay.

### `content/visual/pipeline-diagram.png`

> Flow diagram of how work moves through AI Revenue OS. Six steps run down the centre: GA-02 audience and prospect research; MN-03 editorial brief and script; GA-03 animation source, outlined in lime and tagged "only author"; GitHub Actions rendering the MP4 and poster frames; MM-01 producing thumbnails, alt text and visual QA; and Saksham approving then publishing. GA-01 offer research feeds in from the left and MN-01 does a read-only render check beside GA-03. Amber gates mark the points where the CEO approves the brief and the title and caption. A red strip along the bottom states that only GA-03 may create or modify files under content/video/src/.

## Short-form alt text for a platform field

Most platforms cap alt text well below what a screen reader can use. When a platform requires a short field, keep the purpose and the single most important visual fact:

- YouTube thumbnail: `Thumbnail reading "HEADLINE HERE" with an empty key-visual frame on the right.`
- Reel cover: `Vertical cover reading "HEADLINE HERE" above an empty key-visual frame.`
- Diagram in a doc: `Six-step pipeline from research to published video, with CEO approval gates.`

## Rules for poster frames

Poster frames are still images of a video scene, so:

- Describe the **scene** and any on-screen caption text.
- Do not describe motion — a still frame has no motion to describe.
- If the poster frame is used purely as a thumbnail with overlaid headline text, use the thumbnail alt text above, because that is what the reader encounters.

## Checklist before shipping

- [ ] Alt text exists for every shipped image (or empty alt is justified as decorative).
- [ ] It states the purpose, then the content.
- [ ] On-image headline text is quoted exactly.
- [ ] No keyword stuffing, no filler like "image of".
- [ ] Nothing claimed that the image does not actually show.
- [ ] Alt text matches the final asset, not an earlier draft — re-check after any headline swap.
