import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [videoId, durationArg = '30', fpsArg = '30'] = process.argv.slice(2);
if (!videoId) throw new Error('Usage: node scripts/render-video.mjs <video-id> <duration-seconds> <fps>');
const duration = Number(durationArg);
const fps = Number(fpsArg);
const source = path.resolve(`content/video/src/${videoId}/index.html`);
const out = path.resolve(`content/video/renders/${videoId}/frames`);
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto(`file://${source}`);
await page.waitForLoadState('networkidle');
for (let frame = 0; frame < duration * fps; frame += 1) {
  const time = frame / fps;
  await page.evaluate((t) => {
    if (typeof window.__setVideoTime === 'function') window.__setVideoTime(t);
    else document.documentElement.style.setProperty('--video-time', `${t}s`);
  }, time);
  await page.screenshot({ path: path.join(out, `frame-${String(frame).padStart(6, '0')}.png`) });
}
await browser.close();
