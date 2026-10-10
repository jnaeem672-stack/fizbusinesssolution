/**
 * Renders FIZBS social post images (1080x1350, navy + gold) from a week file.
 *
 * Usage (from any folder where playwright@1.56 and @fontsource/cairo@5.0.18 are installed):
 *   node /path/to/repo/marketing/social/render.mjs /path/to/repo/marketing/social/<week>.json <outDir>
 *
 * Each post in the week file needs: slug, design { layout, eyebrow, title, ... }.
 * Layouts:
 *   list   -> items: string[]   (numbered = true for 1,2,3 circles; otherwise ticks)
 *   rows   -> rows: [label, value][] (price/date style rows), note?: string
 *   image  -> text: string, image: absolute path or https URL
 * Common: eyebrow, title (wrap the gold part in <em>...</em>), cta, ar (true for Arabic RTL).
 * Output: <outDir>/<slug>.jpg (JPEG q90)
 */
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(path.join(process.cwd(), 'noop.js'));
const { chromium } = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
const [weekFile, outDir] = process.argv.slice(2);
if (!weekFile || !outDir) { console.error('usage: render.mjs <week.json> <outDir>'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const week = JSON.parse(fs.readFileSync(weekFile, 'utf8'));

const JAKARTA = path.join(REPO, 'src/fonts/plus-jakarta-sans-latin.woff2');
const C700 = require.resolve('@fontsource/cairo/files/cairo-arabic-700-normal.woff2');
const C800 = require.resolve('@fontsource/cairo/files/cairo-arabic-800-normal.woff2');
const esc = (s) => String(s).replace(/&(?!amp;|lt;|gt;)/g, '&amp;');

const CAP = `<svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#C9A227" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;
const css = `
@font-face{font-family:J;src:url(file://${JAKARTA}) format('woff2');font-weight:200 800}
@font-face{font-family:C;src:url(file://${C700});font-weight:700}
@font-face{font-family:C;src:url(file://${C800});font-weight:800}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;font-family:J,sans-serif;color:#fff;background:#0B1D3A;overflow:hidden}
.wrap{position:relative;width:1080px;height:1350px;padding:80px 84px 70px;display:flex;flex-direction:column;background:linear-gradient(140deg,#0B1D3A 0%,#0B1D3A 55%,#17325E 100%)}
.dots{position:absolute;inset:0;opacity:.18;background-image:radial-gradient(#C9A227 1.6px,transparent 1.6px);background-size:34px 34px}
.glow{position:absolute;right:-220px;top:-220px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(201,162,39,.35),transparent 65%)}
.logo{position:relative;display:flex;align-items:center;gap:18px;direction:ltr}
.logo .mark{width:84px;height:84px;border-radius:22px;background:#0F2547;border:2px solid rgba(201,162,39,.5);display:flex;align-items:center;justify-content:center}
.logo .word{font-weight:800;font-size:44px;letter-spacing:-1px}.logo .word b{color:#C9A227}
.logo .tag{font-size:15px;font-weight:700;letter-spacing:3.5px;color:rgba(255,255,255,.7);text-transform:uppercase}
.content{position:relative;margin:auto 0;padding:40px 0}
.eyebrow{display:inline-block;background:#C9A227;color:#0B1D3A;font-weight:800;font-size:24px;letter-spacing:2px;text-transform:uppercase;padding:12px 26px;border-radius:999px}
h1{font-size:84px;line-height:1.08;font-weight:800;letter-spacing:-2px;margin-top:34px}
h1 em{font-style:normal;color:#C9A227}
.list{margin-top:44px;display:flex;flex-direction:column;gap:22px}
.item{display:flex;gap:22px;align-items:flex-start;font-size:38px;font-weight:600;line-height:1.3}
.num{flex:0 0 58px;height:58px;border-radius:50%;background:#C9A227;color:#0B1D3A;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center}
.tick{flex:0 0 52px;height:52px;border-radius:50%;border:3px solid #C9A227;color:#C9A227;font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center}
.small{font-size:24px;color:rgba(255,255,255,.75);margin-top:30px;line-height:1.4}
.lead{font-size:30px;color:#fff;margin-top:26px;line-height:1.4}
.row{display:flex;justify-content:space-between;align-items:center;gap:20px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:26px 32px;font-size:32px;font-weight:600}
.row b{color:#C9A227;font-size:38px;font-weight:800;white-space:nowrap}
.foot{position:relative;display:flex;align-items:center;justify-content:space-between;gap:20px;direction:ltr}
.cta{background:#fff;color:#0B1D3A;font-weight:800;font-size:30px;padding:22px 34px;border-radius:20px}
.wa{white-space:nowrap;font-size:24px;font-weight:700;color:rgba(255,255,255,.85);text-align:right;line-height:1.35}
.ar{direction:rtl;font-family:C,J,sans-serif}
.ar h1{letter-spacing:0;line-height:1.35;font-size:76px}
.ar .item{font-size:38px;font-weight:700}
.ar .eyebrow{letter-spacing:0;font-size:28px}
.imgbox{margin-top:36px;border-radius:24px;overflow:hidden;border:3px solid rgba(201,162,39,.6);background:#fff;height:470px}
.imgbox img{width:100%;height:100%;object-fit:cover;object-position:top}
`;
const logo = `<div class="logo"><div class="mark">${CAP}</div><div><div class="word"><b>FIZ</b>BS</div><div class="tag">Assignment &amp; Dissertation Help</div></div></div>`;
const foot = (cta) => `<div class="foot"><div class="cta">${esc(cta)}</div><div class="wa">WhatsApp<br>+971 54 380 0388</div></div>`;

function body(d) {
  let inner = `<span class="eyebrow">${esc(d.eyebrow)}</span><h1>${d.title}</h1>`;
  if (d.layout === 'list') {
    inner += `<div class="list">${d.items.map((t, i) => `<div class="item"><div class="${d.numbered ? 'num' : 'tick'}">${d.numbered ? i + 1 : '✓'}</div><div>${esc(t)}</div></div>`).join('')}</div>`;
  } else if (d.layout === 'rows') {
    inner += `<div class="list" style="margin-top:40px;gap:18px">${d.rows.map(([a, b]) => `<div class="row">${esc(a)}<b>${esc(b)}</b></div>`).join('')}</div>`;
    if (d.note) inner += `<p class="small">${esc(d.note)}</p>`;
  } else if (d.layout === 'image') {
    const src = /^https?:/.test(d.image) ? d.image : `file://${path.resolve(REPO, d.image)}`;
    inner += `<p class="lead">${esc(d.text)}</p><div class="imgbox"><img src="${src}"></div>`;
  }
  return `${logo}<div class="content${d.ar ? ' ar' : ''}">${inner}</div>${foot(d.cta)}`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const post of week.posts) {
  if (!post.design) continue;
  const html = `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="wrap"><div class="dots"></div><div class="glow"></div>${body(post.design)}</div></body></html>`;
  const tmp = path.join(outDir, `${post.slug}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto(`file://${tmp}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => document.querySelector('.foot').getBoundingClientRect().bottom > 1350 || document.documentElement.scrollHeight > 1350);
  await page.screenshot({ path: path.join(outDir, `${post.slug}.jpg`), type: 'jpeg', quality: 90 });
  fs.unlinkSync(tmp);
  console.log(post.slug, overflow ? 'WARNING: content too long, shorten text' : 'ok');
}
await browser.close();
