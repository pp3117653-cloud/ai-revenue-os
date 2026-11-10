#!/usr/bin/env node
/**
 * MM-01 visual QA harness (Thumbnail and Visual QA, role MM-01).
 *
 * Measures real, browser-rendered geometry for every MM-01 SVG asset:
 *   1. exact pixel dimensions of the rendered output
 *   2. every text run's bounding box vs. the asset's declared text-safe rectangle
 *   3. every text run vs. declared UI-overlay exclusion zones
 *   4. legibility at reduced thumbnail widths (320px feed card, 168px sidebar)
 *   5. measured foreground/background contrast for every declared colour pair
 *
 * Writes a JSON report and one proof PNG per asset (asset + safe-area overlay
 * + measured text boxes). Read the JSON, do not trust the PNG by eye.
 *
 * Usage: node content/qa/tools/visual-qa.mjs [specPath]
 * Author: MM-01 (MiniMax-1). Rights: first-party, no third-party assets.
 */
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/* Resolve Playwright from a local install, a global install, or the tool cache. */
const require = createRequire(import.meta.url);
function loadChromium() {
  const candidates = [
    'playwright',
    '/usr/local/lib/node_modules/playwright',
    '/usr/lib/node_modules/playwright',
    path.join(process.env.HOME || '/root', '.npm-global/lib/node_modules/playwright'),
  ];
  for (const c of candidates) {
    try { return require(c).chromium; } catch { /* next */ }
  }
  throw new Error('Playwright not found. Install with: npm install --no-save playwright && npx playwright install chromium');
}
const chromium = loadChromium();

/* Locate a usable Chromium binary: explicit env, PLAYWRIGHT_BROWSERS_PATH, or the default cache. */
function findChromiumExecutable() {
  const fs = require('node:fs');
  const roots = [
    process.env.CHROMIUM_EXECUTABLE,
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    path.join(process.env.HOME || '/root', '.cache/ms-playwright'),
    '/root/.cache/ms-playwright',
  ].filter(Boolean);
  const names = ['chrome-linux/chrome', 'chrome-linux/headless_shell', 'chrome-linux/chrome-headless-shell-linux64/chrome-headless-shell'];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    if (fs.statSync(root).isFile()) return root;
    const versions = fs.readdirSync(root).filter((d) => d.startsWith('chromium')).sort().reverse();
    for (const v of versions) {
      for (const n of names) {
        const p = path.join(root, v, n);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return null; // fall back to Playwright's own resolution
}
const CHROMIUM_EXECUTABLE = findChromiumExecutable();

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../..');
const SPEC_PATH = process.argv[2] || path.join(HERE, 'assets-spec.json');

/* ---------- colour maths (WCAG 2.1 relative luminance) ---------- */
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* ---------- render + measure ---------- */
async function measure(page, svgPath, spec, scaleWidth) {
  const abs = path.resolve(REPO, svgPath);
  const svgText = await readFile(abs, 'utf8');
  const vb = svgText.match(/viewBox="0 0 (\d+) (\d+)"/);
  const nativeW = Number(vb[1]);
  const nativeH = Number(vb[2]);
  const w = scaleWidth || nativeW;
  const h = Math.round((nativeH / nativeW) * w);

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:#0b0d12}
    svg{display:block}
  </style></head><body>${svgText.replace(/width="\d+" height="\d+"/, `width="${w}" height="${h}"`)}</body></html>`;

  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts && document.fonts.ready);

  const boxes = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('svg text').forEach((el) => {
      if (el.closest('[data-mm01-guide="1"]')) return;      // guide layer is not export content
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      out.push({
        text: (el.textContent || '').trim().slice(0, 60),
        id: el.id || null,
        cls: el.getAttribute('class') || null,
        x: +r.x.toFixed(2), y: +r.y.toFixed(2),
        w: +r.width.toFixed(2), h: +r.height.toFixed(2),
        fontSize: parseFloat(cs.fontSize),
        fontWeight: cs.fontWeight,
        fill: cs.fill,
      });
    });
    return out;
  });

  /* Document-order geometry for occlusion checks: a shape drawn AFTER a text run
     hides it. Catches the classic "headline slides under the image panel" defect
     that a safe-area check alone cannot see. */
  const occlusion = await page.evaluate(() => {
    const sel = 'svg text, svg rect, svg circle, svg ellipse, svg path, svg polygon, svg image';
    const nodes = [...document.querySelectorAll(sel)].filter((el) => !el.closest('[data-mm01-guide="1"]'));
    const items = [];
    nodes.forEach((el, i) => {
      let b;
      try { b = el.getBBox(); } catch { return; }
      if (!b || (b.width <= 0 && b.height <= 0)) return;
      const cs = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const isText = tag === 'text';
      const fill = cs.fill;
      const op = parseFloat(cs.opacity || '1');
      const explicitFill = el.getAttribute('fill');
      const isPathLike = tag === 'path' || tag === 'polygon' || tag === 'polyline';
      const opaque = !isText && fill && fill !== 'none' && fill !== 'transparent' && op >= 0.5
        && !(isPathLike && explicitFill === null);   // stroke-only path is not an occluder
      items.push({
        i, isText, opaque,
        x: b.x, y: b.y, w: b.width, h: b.height,
        label: isText ? (el.textContent || '').trim().slice(0, 50) : tag,
      });
    });
    const hit = (a, b) => {
      if (!(a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y)) return 0;
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      const small = Math.min(a.w * a.h, b.w * b.h);
      return small > 0 ? (ox * oy) / small : 0;
    };
    const issues = [];
    for (const t of items.filter((n) => n.isText)) {
      for (const s of items) {
        if (s.isText) {
          if (s.i <= t.i) continue;
          if (hit(t, s) > 0.2) issues.push({ type: 'text_overlaps_text', text: t.label, other: s.label });
        } else {
          if (!s.opaque || s.i <= t.i) continue;   // only later-drawn opaque shapes can hide text
          if (hit(t, s) > 0.02) issues.push({ type: 'text_occluded_by_shape', text: t.label, other: s.label });
        }
      }
    }

    /* Container fit: a text run that starts inside a panel, chip or box must end
       inside it. Catches labels that spill over a card or badge edge. */
    const contains = (s, p) => p.x >= s.x - 1 && p.x <= s.x + s.w + 1 && p.y >= s.y - 1 && p.y <= s.y + s.h + 1;
    const overflow = [];
    for (const t of items.filter((n) => n.isText)) {
      const start = { x: t.x, y: t.y };
      const holders = items
        .filter((s) => !s.isText && s.i < t.i && contains(s, start))
        .sort((a, b) => a.w * a.h - b.w * b.h);
      const c = holders[0];
      if (!c) continue;
      const pad = 2;
      const inside = t.x >= c.x - pad && t.x + t.w <= c.x + c.w + pad
                 && t.y >= c.y - pad && t.y + t.h <= c.y + c.h + pad;
      if (!inside) {
        overflow.push({
          type: 'text_overflows_container',
          text: t.label,
          container: c.label,
          text_right: +(t.x + t.w).toFixed(1),
          container_right: +(c.x + c.w).toFixed(1),
        });
      }
    }
    return { issues, overflow };
  });

  return { nativeW, nativeH, renderedW: w, renderedH: h, boxes, occlusion: occlusion.issues, overflow: occlusion.overflow };
}

/* ---------- geometry checks ---------- */
function checkSafe(boxes, spec, scale) {
  const s = spec.safe;
  const s0 = { x: s.x0 / scale, y: s.y0 / scale, w: (s.x1 - s.x0) / scale, h: (s.y1 - s.y0) / scale };
  const violations = [];
  for (const b of boxes) {
    const inside = b.x >= s0.x - 0.6 && b.y >= s0.y - 0.6 && b.x + b.w <= s0.x + s0.w + 0.6 && b.y + b.h <= s0.y + s0.h + 0.6;
    if (!inside) {
      violations.push({ type: 'outside_text_safe', text: b.text, box: { x: b.x, y: b.y, w: b.w, h: b.h } });
    }
    for (const ex of spec.exclusions || []) {
      const e = { x: ex.x0 / scale, y: ex.y0 / scale, w: (ex.x1 - ex.x0) / scale, h: (ex.y1 - ex.y0) / scale };
      const overlap = b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y;
      if (overlap) {
        violations.push({ type: 'ui_overlap', zone: ex.id || 'exclusion', text: b.text, box: { x: b.x, y: b.y, w: b.w, h: b.h } });
      }
    }
  }
  return violations;
}

function headlineMetrics(boxes, spec, renderedW) {
  const heads = boxes.filter((b) => (b.cls || '').includes(spec.headlineClass));
  if (!heads.length) return null;
  const top = Math.min(...heads.map((b) => b.y));
  const bottom = Math.max(...heads.map((b) => b.y + b.h));
  const left = Math.min(...heads.map((b) => b.x));
  const right = Math.max(...heads.map((b) => b.x + b.w));
  return {
    heightPx: +(bottom - top).toFixed(2),
    widthPx: +(right - left).toFixed(2),
    widthShareOfFrame: +(((right - left) / renderedW) * 100).toFixed(1),
    lines: heads.length,
  };
}

/* ---------- clean export PNG (asset as shipped, no guides) ---------- */
async function exportPng(page, svgPath, outPath) {
  const abs = path.resolve(REPO, svgPath);
  const svgText = await readFile(abs, 'utf8');
  const vb = svgText.match(/viewBox="0 0 (\d+) (\d+)"/);
  const w = Number(vb[1]);
  const h = Number(vb[2]);
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#0b0d12}svg{display:block}</style></head>
    <body>${svgText}</body></html>`;
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await mkdir(path.resolve(REPO, path.dirname(outPath)), { recursive: true });
  await page.screenshot({ path: path.resolve(REPO, outPath) });
}

/* ---------- proof PNG ---------- */
async function proof(page, svgPath, spec, report, outPath) {
  const abs = path.resolve(REPO, svgPath);
  const svgText = await readFile(abs, 'utf8');
  const w = report.nativeW;
  const h = report.nativeH;
  const s = spec.safe;
  const overlay = `
    <g data-mm01-guide="1">
      <rect x="${s.x0}" y="${s.y0}" width="${s.x1 - s.x0}" height="${s.y1 - s.y0}"
            fill="none" stroke="#ffca68" stroke-width="4" stroke-dasharray="14 12"/>
      ${(spec.exclusions || []).map((e) => `<rect x="${e.x0}" y="${e.y0}" width="${e.x1 - e.x0}" height="${e.y1 - e.y0}"
            fill="#ff8585" fill-opacity="0.18" stroke="#ff8585" stroke-width="4"/>`).join('')}
      ${report.boxes.map((b) => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"
            fill="none" stroke="#78e0d2" stroke-width="2"/>`).join('')}
      <text x="${s.x0 + 8}" y="${s.y0 - 12}" font-family="sans-serif" font-size="26" fill="#ffca68">TEXT SAFE AREA</text>
    </g>`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#0b0d12}svg{display:block}</style></head>
    <body>${svgText.replace('</svg>', overlay + '</svg>').replace(/width="\d+" height="\d+"/, `width="${w}" height="${h}"`)}</body></html>`;
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.screenshot({ path: path.resolve(REPO, outPath) });
}

/* ---------- main ---------- */
const spec = JSON.parse(await readFile(SPEC_PATH, 'utf8'));
const browser = await chromium.launch({
  headless: true,
  ...(CHROMIUM_EXECUTABLE ? { executablePath: CHROMIUM_EXECUTABLE } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
const report = { generated_at: new Date().toISOString(), author: 'MM-01 (MiniMax-1)', assets: [] };

for (const a of spec.assets) {
  const native = await measure(page, a.svg, a, null);
  const small = await measure(page, a.svg, a, a.scaleChecks.width);
  const scale = native.renderedW / a.scaleChecks.width;

  const violations = [...checkSafe(native.boxes, a, 1)];
  for (const o of native.occlusion) violations.push({ type: o.type, text: o.text, box: { other: o.other } });
  for (const o of native.overflow) violations.push({ type: o.type, text: o.text, box: { container: o.container, text_right: o.text_right, container_right: o.container_right } });
  const headNative = headlineMetrics(native.boxes, a, native.renderedW);
  const headSmall = headlineMetrics(small.boxes, a, small.renderedW);

  const contrast = (a.contrast || []).map((c) => {
    const r = ratio(c.fg, c.bg);
    return { ...c, ratio: +r.toFixed(2), aa_text: r >= 4.5, aa_large_ui: r >= 3.0 };
  });

  const legibility = [];
  if (headNative && headSmall) {
    legibility.push({
      check: 'headline_height_at_' + a.scaleChecks.width + 'px',
      value: headSmall.heightPx,
      min: a.scaleChecks.minHeadlineHeightPx,
      pass: headSmall.heightPx >= a.scaleChecks.minHeadlineHeightPx,
    });
    legibility.push({
      check: 'headline_width_share_at_' + a.scaleChecks.width + 'px',
      value: headSmall.widthShareOfFrame,
      min: a.scaleChecks.minHeadlineWidthSharePct,
      max: a.scaleChecks.maxHeadlineWidthSharePct,
      pass: headSmall.widthShareOfFrame >= a.scaleChecks.minHeadlineWidthSharePct
            && headSmall.widthShareOfFrame <= a.scaleChecks.maxHeadlineWidthSharePct,
    });
  }
  const contrastFail = contrast.filter((c) => !c.aa_text);
  const contrastUiFail = contrast.filter((c) => !c.aa_large_ui);

  const proofPath = a.proof || `content/qa/proof/${path.basename(a.svg, '.svg')}-proof.png`;
  await mkdir(path.resolve(REPO, path.dirname(proofPath)), { recursive: true });
  await proof(page, a.svg, a, native, proofPath);
  if (a.png) await exportPng(page, a.svg, a.png);

  report.assets.push({
    svg: a.svg,
    png: a.png,
    proof: proofPath,
    dimensions: { width: native.nativeW, height: native.nativeH, aspect: `${native.nativeW}:${native.nativeH}` },
    safe_area: a.safe,
    exclusions: a.exclusions || [],
    text_boxes: native.boxes,
    safe_area_violations: violations,
    headline_native: headNative,
    headline_at_small_scale: headSmall,
    legibility_checks: legibility,
    contrast,
    status: violations.length === 0 && contrastFail.length === 0 && contrastUiFail.length === 0
      && legibility.every((l) => l.pass) ? 'PASS' : 'FAIL',
  });
}
await browser.close();

const outFile = path.join(REPO, 'content/qa/mm01-visual-qa-report.json');
await writeFile(outFile, JSON.stringify(report, null, 2));
const failed = report.assets.filter((a) => a.status === 'FAIL');
console.log(`MM-01 visual QA: ${report.assets.length - failed.length}/${report.assets.length} assets PASS`);
for (const a of report.assets) {
  console.log(`  [${a.status}] ${a.svg} ${a.dimensions.width}x${a.dimensions.height}`);
  for (const v of a.safe_area_violations) console.log(`      ! ${v.type}: "${v.text}" ${JSON.stringify(v.box)}`);
  for (const c of a.contrast) if (!c.aa_text) console.log(`      ! contrast ${c.fg} on ${c.bg} = ${c.ratio}`);
  for (const l of a.legibility_checks) if (!l.pass) console.log(`      ! ${l.check} = ${l.value} (min ${l.min})`);
}
console.log(`report: content/qa/mm01-visual-qa-report.json`);
if (failed.length) process.exitCode = 1;
