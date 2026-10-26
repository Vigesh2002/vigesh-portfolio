import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const context = await browser.newContext();
const page = await context.newPage();

const logs = [];
page.on('pageerror', (e) => logs.push(`PAGEERROR: ${e.message}\n${e.stack}`));
page.on('console', (m) => {
  if (m.type() === 'error') logs.push(`CONSOLE ERROR: ${m.text()}`);
});

await page.goto('http://localhost:3000/', { waitUntil: 'load' });

// Instrument: record gsap ticker activity + the timeline's own state.
await page.evaluate(() => {
  window.__ticks = 0;
  const rafOrig = window.requestAnimationFrame;
  // Count frames to see whether rAF is actually running.
  const count = () => {
    window.__ticks++;
    rafOrig(count);
  };
  rafOrig(count);
});

for (const t of [1000, 2500, 4000]) {
  await page.waitForTimeout(t === 1000 ? 1000 : 1500);
  const s = await page.evaluate(() => {
    const p = document.querySelector('[aria-label="Loading site"]');
    return {
      ticks: window.__ticks,
      preloaderDisplay: p ? getComputedStyle(p).display : 'gone',
      preloaderTransform: p ? getComputedStyle(p).transform : 'gone',
      count: p ? p.querySelector('span')?.textContent : 'gone',
      bodyOverflow: document.body.style.overflow,
      sessionFlag: sessionStorage.getItem('portfolio:preloader-played'),
    };
  });
  console.log(`t~${t}ms`, JSON.stringify(s));
}

console.log('\n=== ERRORS ===');
logs.forEach((l) => console.log(l));
if (!logs.length) console.log('(none)');

await context.close();
await browser.close();
