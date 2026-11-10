# Brand and visual rules — AI Revenue OS

**Status: PROPOSED (D1).** Written by MM-01 because the MM-01 run instructions require reading brand rules and the repository had none. Nothing here overrides the owner's judgment. Every value is derived from `docs/styles.css`, the owner-authored CEO dashboard, so this file formalises the existing look rather than inventing a new one. Saksham approves or amends it; until then MM-01 treats it as the working standard for internal QA.

Author: MM-01 (MiniMax-1) · Last updated: 2026-11-10 · Owner: Saksham

---

## 1. Colour tokens

| Token | Hex | Role | On `#0b0d12` |
|---|---|---|---|
| `--bg` | `#0b0d12` | canvas | — |
| `--panel` | `#12161e` | card / key-visual panel | — |
| `--panel2` | `#181d27` | chip / stage box fill | — |
| `--line` | `#2a3342` | hairline dividers **only** — decorative, never load-bearing | 1.53:1 |
| `--line-strong` | `#556378` | visible borders, panel edges, meaningful outlines | 3.19:1 |
| `--text` | `#eef2f7` | headline and body text | 17.29:1 |
| `--muted` | `#9ca8ba` | supporting lines, captions, labels | 8.07:1 |
| `--lime` | `#c7f36a` | primary accent, eyebrow, badge | 15.23:1 |
| `--cyan` | `#78e0d2` | secondary accent, rules, slot labels | 12.39:1 |
| `--amber` | `#ffca68` | approval gates, warnings, CEO markers | 12.86:1 |
| `--red` | `#ff8585` | constraint, danger, blocked | 8.28:1 |
| `--on-lime` | `#18200e` | text placed on a lime fill | 13.15:1 on lime |

**Rule 1.** `--line` at 1.53:1 is a divider, nothing more. Never use it for a border that carries meaning, an input edge, or a focus ring. Use `--line-strong`.

**Rule 2.** Every text/background pair must measure **≥ 4.5:1**. Large text (≥ 24px bold or ≥ 32px regular) and UI shape boundaries may use **≥ 3:1**. All pairs used by MM-01 assets are recorded in `content/qa/tools/assets-spec.json` and re-measured on every QA run.

## 2. Typography

- Stack: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` — the same stack as the dashboard. No webfonts, no network dependency, no licensed font files.
- Weights used: 500 (supporting), 600 (labels), 700 (headlines in diagrams, gate labels), 800 (display headlines, role IDs, eyebrows).
- Eyebrows and badges use letter-spacing `0.16em`–`0.20em` and uppercase.
- Display headlines use negative letter-spacing (`-0.03em` ≈ `-4px` at 104px).

**Font caveat.** Text stays live in the SVG so it stays editable, translatable and readable by assistive tech. Because the stack is system-resolved, glyph metrics differ slightly between machines. If a final published asset must be pixel-identical everywhere, convert the text to outlines in the export step and keep the live-text SVG as the editable master.

## 3. Formats and safe margins

| Format | Canvas | Aspect | Text-safe area | UI-overlay exclusions |
|---|---|---|---|---|
| YouTube landscape | 1920×1080 | 16:9 | x 96–1824, y 72–1008 | bottom-right badge: x 1536–1824, y 920–1008 |
| Reel / Shorts vertical | 1080×1920 | 9:16 | x 72–1008, y 300–1380 | Reels action rail: x 872–1008, y 980–1620 · Shorts title band: x 72–872, y 1560–1780 |
| Doc diagram | 1920×1080 | 16:9 | x 60–1860, y 60–1016 | none |

Safe areas are house rules, not platform guarantees. Platform UI moves; re-verify before each publish.

## 4. Legibility thresholds

- **Headline height at 168px width ≥ 6px.** 168px is the YouTube sidebar thumbnail width and the narrowest feed card; a headline that survives there survives everywhere. Measured: 20.85px (YouTube template), 33.42px (Reel template).
- **Headline occupies 35–80% of frame width at 168px.** Below 35% it is decoration, not a headline. Above 80% it is at risk of clipping on narrow crops. Measured: 45.9% and 72.8%.
- Body copy never shrinks below 3% of the canvas height (32px at 1080, 36px at 1920) in a 9:16 asset.
- Never place critical text over a busy image region. If the key visual is photographic, put the headline on a solid panel.

## 5. Rights rules

1. Default to **first-party, deterministic assets**: SVG, system fonts, geometric shapes, text. No stock photography, no scraped images, no unlicensed logos.
2. Every asset ships with a rights note in `content/brand/rights-notes.md` recording author, source, licence, third-party elements, model-generated vs human-authored, and real-person likeness.
3. **No real person's likeness without written permission attached to the asset.** AI-generated images that depict a real person are treated the same way — prohibited by default.
4. Generated imagery, when used, must be recorded as model-generated in the rights note and must not depict a real person, a real brand, or a recognisable place.
5. Anything uncertain about copyright or privacy goes to Saksham before use. See `briefs/approval-policy.md`.
6. MM-01 never publishes, uploads, or posts. It prepares assets and rights notes; MN-04 prepares drafts; Saksham approves and publishes.

## 6. Alt text

Every shipped image carries alt text that describes function and content, not keywords. Full rules and a worked example per asset: `content/visual/alt-text-guide.md`.

## 7. Scope boundary

`content/video/src/` belongs to **GA-03 / Google-3 alone**. MM-01 may read it to run QA and may render it, but never creates, edits, patches or deletes a file there. If a thumbnail or poster frame reveals a defect in animation source, MM-01 writes a change request and routes it to GA-03. See `content/visual/visual-qa-checklist.md` §7.

## 8. Change log

| Date | Change | By |
|---|---|---|
| 2026-11-10 | Initial proposal. Tokens derived from `docs/styles.css`; safe areas, legibility thresholds, rights and alt-text rules established. | MM-01 |
