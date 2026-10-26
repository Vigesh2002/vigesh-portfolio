import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('http://localhost:3000/', { waitUntil: 'load' });

const snapshot = () =>
  page.evaluate(() => ({
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
    htmlClass: document.documentElement.className,
    preloader: document.querySelectorAll('[aria-label="Loading site"]').length,
    // Can the page actually be scrolled programmatically?
    scrollY: window.scrollY,
  }));

for (const t of [0, 300, 800, 1500, 2500, 4000, 6000]) {
  if (t > 0) await page.waitForTimeout(t === 300 ? 300 : 400);
  console.log(`t~${t}ms`, JSON.stringify(await snapshot()));
}

console.log('--- try scrolling after preloader ---');
await page.evaluate(() => window.scrollTo(0, 1500));
await page.waitForTimeout(600);
console.log(
  'scrollY after scrollTo:',
  await page.evaluate(() => window.scrollY),
);
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(1200);
console.log('scrollY after wheel:', await page.evaluate(() => window.scrollY));

console.log('--- second visit (preloader should not replay) ---');
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(2500);
console.log('after reload:', JSON.stringify(await snapshot()));

await context.close();
await browser.close();
