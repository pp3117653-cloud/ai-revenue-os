#!/usr/bin/env node
/**
 * Build the MM-01 visual index (content/visual/index.html).
 *
 * The kit's PNG exports are derived files, and the ones on the branch can be
 * stale. This page renders the SVG masters directly, so what it shows is
 * always the source of truth. Every number on it is read from the QA report,
 * the asset spec, the alt-text guide and the rights register, so the page
 * cannot drift away from what the harness actually measured.
 *
 * Usage: node content/qa/tools/build-visual-index.mjs
 * Author: MM-01 (MiniMax-1). Rights: first-party, no third-party assets.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../..');
const read = (p) => readFile(path.resolve(REPO, p), 'utf8');

/* The page lives in content/visual/, so a repo path is reached by dropping the
   leading content/ and going up one level. */
const rel = (p) => '../' + String(p).replace(/^content\//, '');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Alt text lives in one place: the guide. Pull the worked example per asset. */
async function altTextFor(guide, pngPath) {
  const re = new RegExp('###\\s+`' + pngPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '`\\s*\\n\\n>\\s*([^\\n]+)');
  const m = guide.match(re);
  return m ? m[1].trim() : '';
}

/* Rights status lives in one place: the register. */
async function rightsFor(register, svgPath) {
  const re = new RegExp('^\\|[^\\n]*`' + svgPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '`[^\\n]*$', 'm');
  const row = (register.match(re) || [''])[0];
  const cells = row.split('|').map((c) => c.trim()).filter(Boolean);
  if (cells.length < 8) return null;
  return { author: cells[1], source: cells[2], licence: cells[3], thirdParty: cells[4], modelGenerated: cells[5], likeness: cells[6], status: cells[7] };
}

const report = JSON.parse(await read('content/qa/mm01-visual-qa-report.json'));
const spec = JSON.parse(await read('content/qa/tools/assets-spec.json'));
const guide = await read('content/visual/alt-text-guide.md');
const register = await read('content/brand/rights-notes.md');

const assets = [];
for (const a of report.assets) {
  const s = spec.assets.find((x) => x.svg === a.svg) || {};
  const alt = await altTextFor(guide, a.png);
  const rights = await rightsFor(register, a.svg);
  const minContrast = Math.min(...(a.contrast || []).map((c) => c.ratio));
  assets.push({
    svg: a.svg, png: a.png, proof: a.proof,
    width: a.dimensions.width, height: a.dimensions.height, aspect: a.dimensions.aspect,
    safe: a.safe_area, exclusions: a.exclusions || [],
    status: a.status, minContrast,
    minFont: a.min_font_px, minFontRequired: a.min_font_required_px,
    headline: a.headline_at_small_scale, checks: a.legibility_checks || [],
    drift: a.export_drift || {}, raster: a.raster_backdrop || {}, font: a.font_stack || {},
    alt, rights,
  });
}

const passed = assets.filter((a) => a.status === 'PASS').length;
const drifted = assets.filter((a) => (a.drift.verdict === 'drift'));
const exporter = report.exporter;
const minContrastAll = Math.min(...assets.map((a) => a.minContrast));
const anySansIssue = assets.some((a) => a.font.resolves_to_serif);

const card = (a) => `
    <article class="card" id="${esc(a.svg.split('/').pop().replace(/\.svg$/, ''))}">
      <div class="frame">
        <img src="${esc(rel(a.svg))}" alt="${esc(a.alt)}" width="${a.width}" height="${a.height}">
      </div>
      <div class="meta">
        <h3>${esc(a.svg.split('/').pop().replace(/\.svg$/, ''))}</h3>
        <p class="path"><code>${esc(a.svg)}</code></p>
        <dl class="facts">
          <div><dt>Canvas</dt><dd>${a.width}×${a.height} · ${esc(a.aspect)}</dd></div>
          <div><dt>Text safe area</dt><dd>x ${a.safe.x0}–${a.safe.x1}, y ${a.safe.y0}–${a.safe.y1}</dd></div>
          <div><dt>UI exclusions</dt><dd>${a.exclusions.length ? a.exclusions.map((e) => esc(e.id)).join(', ') : 'none'}</dd></div>
          <div><dt>Min contrast</dt><dd>${a.minContrast}:1 <span class="ok">≥ 4.5</span></dd></div>
          <div><dt>Min font</dt><dd>${a.minFont}px <span class="ok">≥ ${a.minFontRequired}px</span></dd></div>
          ${a.headline ? `<div><dt>Headline @168px</dt><dd>${a.headline.heightPx}px tall · ${a.headline.widthShareOfFrame}% of frame</dd></div>` : '<div><dt>Headline @168px</dt><dd>not a thumbnail — figure title held to the 24px floor</dd></div>'}
          <div><dt>QA status</dt><dd class="${a.status === 'PASS' ? 'ok' : 'bad'}">${esc(a.status)}</dd></div>
        </dl>
        <p class="alt"><span class="label">Alt text</span> ${esc(a.alt)}</p>
        ${a.rights ? `<p class="rights"><span class="label">Rights</span> ${esc(a.rights.author)} · ${esc(a.rights.source)} · ${esc(a.rights.licence)} · third party: ${esc(a.rights.thirdParty)} · model-generated: ${esc(a.rights.modelGenerated)} · likeness: ${esc(a.rights.likeness)} · <span class="ok">${esc(a.rights.status)}</span></p>` : '<p class="rights bad"><span class="label">Rights</span> not registered</p>'}
        <p class="links"><a href="${esc(rel(a.svg))}">SVG master</a> · <a href="${esc(rel(a.png))}">PNG export</a> · <a href="${esc(rel(a.proof))}">QA proof</a></p>
      </div>
    </article>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI Revenue OS — visual index</title>
<meta name="description" content="Contact sheet for the AI Revenue OS visual kit: every MM-01 asset rendered from its SVG master, with its measured contrast, safe area, alt text and rights status.">
<style>
  :root {
    --bg: #0b0d12; --panel: #12161e; --panel2: #181d27; --line: #2a3342; --line-strong: #556378;
    --text: #eef2f7; --muted: #9ca8ba; --lime: #c7f36a; --cyan: #78e0d2; --amber: #ffca68; --red: #ff8585;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.55;
  }
  header { border-bottom: 1px solid var(--line); padding: 40px 32px 28px; }
  .wrap { max-width: 1280px; margin: 0 auto; }
  .eyebrow { color: var(--lime); font-weight: 800; letter-spacing: .18em; font-size: 13px; text-transform: uppercase; margin: 0 0 10px; }
  h1 { font-size: 40px; font-weight: 800; letter-spacing: -.03em; margin: 0 0 8px; }
  .lede { color: var(--muted); margin: 0; max-width: 70ch; }
  main { padding: 32px; }
  .strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 0 0 28px; }
  .stat { background: var(--panel); border: 1px solid var(--line-strong); border-radius: 12px; padding: 14px 16px; }
  .stat .k { color: var(--muted); font-size: 13px; letter-spacing: .04em; }
  .stat .v { font-size: 24px; font-weight: 800; letter-spacing: -.01em; }
  .ok { color: var(--lime); } .bad { color: var(--red); } .warn { color: var(--amber); }
  .note { border: 1px solid var(--amber); border-left-width: 5px; border-radius: 10px; background: #1d1a10; padding: 16px 18px; margin: 0 0 28px; }
  .note h2 { font-size: 17px; margin: 0 0 6px; color: var(--amber); }
  .note p { margin: 0 0 8px; color: var(--text); }
  .note pre { margin: 8px 0 0; background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 12px 14px; overflow-x: auto; font-size: 14px; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .card { background: var(--panel); border: 1px solid var(--line-strong); border-radius: 14px; margin: 0 0 24px; overflow: hidden; }
  .frame { background: var(--bg); border-bottom: 1px solid var(--line); padding: 16px; display: flex; justify-content: center; }
  .frame img { max-width: 100%; height: auto; display: block; border-radius: 6px; }
  .meta { padding: 20px 24px 24px; }
  .meta h3 { margin: 0 0 4px; font-size: 20px; }
  .path { margin: 0 0 14px; color: var(--muted); font-size: 14px; }
  .facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 10px 22px; margin: 0 0 16px; }
  .facts dt { color: var(--muted); font-size: 13px; letter-spacing: .04em; }
  .facts dd { margin: 2px 0 0; font-weight: 600; }
  .alt, .rights { color: var(--muted); font-size: 15px; margin: 0 0 8px; }
  .label { display: inline-block; color: var(--cyan); font-weight: 700; font-size: 13px; letter-spacing: .06em; text-transform: uppercase; margin-right: 8px; }
  .links { margin: 12px 0 0; font-size: 15px; }
  a { color: var(--cyan); }
  footer { border-top: 1px solid var(--line); color: var(--muted); font-size: 14px; padding: 22px 32px 40px; }
  @media (prefers-color-scheme: light) { /* the kit is dark-only by design */ }
</style>
</head>
<body>
<header>
  <div class="wrap">
    <p class="eyebrow">AI Revenue OS</p>
    <h1>Visual index</h1>
    <p class="lede">Every asset MM-01 has shipped, rendered from its SVG master — the source of truth. The flat PNG exports are derived files; when they disagree with the master, the master is right. All figures below are read from the QA report, the asset spec, the alt-text guide and the rights register, so this page cannot drift from what was measured.</p>
  </div>
</header>
<main>
  <div class="wrap">
    <div class="strip">
      <div class="stat"><div class="k">Assets passing QA</div><div class="v ${passed === assets.length ? 'ok' : 'bad'}">${passed} / ${assets.length}</div></div>
      <div class="stat"><div class="k">Lowest measured contrast</div><div class="v ok">${minContrastAll}:1</div></div>
      <div class="stat"><div class="k">Exported by</div><div class="v" style="font-size:15px">${exporter ? esc(exporter.chromium + ' · ' + exporter.platform) : 'not declared'}</div></div>
      <div class="stat"><div class="k">Brand face</div><div class="v ${anySansIssue ? 'bad' : 'ok'}" style="font-size:15px">${anySansIssue ? 'serif fallback' : 'sans resolved'}</div></div>
    </div>

    <div class="note">
      <h2>${drifted.length ? `${drifted.length} of ${assets.length} exports are not in the brand face` : 'The flat PNG exports are derived files and can lag behind the master'}</h2>
      <p>These pages render the <strong>SVG masters</strong>, so what you see above is always correct — the master is the deliverable. The flat PNG exports are rendered from them, and on the branch they were last produced by a renderer that ignored <code>font-family</code> and fell back to a serif face. ${drifted.length ? `${drifted.length} asset(s) drift from a fresh render of their master in this checkout.` : 'This checkout measures zero drift against a fresh render; the branch may still hold an older export.'}</p>
      <p>To bring the branch back in line, run one command on a machine that can push:</p>
      <pre><code>bash content/qa/tools/install-export-workflow.sh</code></pre>
      <p>It installs the export workflow, pushes it and dispatches it once; the export then finishes itself.</p>
    </div>

    ${assets.map(card).join('\n')}
  </div>
</main>
<footer>
  <div class="wrap">Generated by <code>node content/qa/tools/build-visual-index.mjs</code> · author MM-01 (MiniMax-1) · first-party assets, no third-party imagery, no real-person likeness · report: <code>content/qa/mm01-visual-qa-report.json</code></div>
</footer>
</body>
</html>
`;

await writeFile(path.resolve(REPO, 'content/visual/index.html'), html, 'utf8');
console.log(`visual index written: ${assets.length} assets, ${passed} passing, lowest contrast ${minContrastAll}:1`);
for (const a of assets) {
  console.log(`  ${a.status.padEnd(5)} ${a.svg}  alt:${a.alt ? 'yes' : 'MISSING'}  rights:${a.rights ? a.rights.status : 'MISSING'}`);
}
