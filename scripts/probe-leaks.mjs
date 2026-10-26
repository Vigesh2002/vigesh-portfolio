import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const BASE = 'http://localhost:3000';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();

// Count GSAP ScrollTriggers and ticker registrations across navigations.
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(3000);

const snap = () =>
  page.evaluate(() => ({
    triggers: window.ScrollTrigger?.getAll?.().length ?? 'n/a',
    dom: document.querySelectorAll('*').length,
    lenis: document.documentElement.classList.contains('lenis'),
  }));

console.log('baseline:', JSON.stringify(await snap()));

const routes = ['/projects', '/resume', '/', '/projects', '/'];
for (let i = 0; i < 4; i++) {
  for (const r of routes) {
    await page.goto(`${BASE}${r}`, { waitUntil: 'load' });
    await page.waitForTimeout(500);
  }
}

await page.waitForTimeout(2000);
console.log('after 20 route navigations:', JSON.stringify(await snap()));

// Client-side navigation too (no full reload).
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(2500);
for (const r of ['/projects', '/', '/projects', '/']) {
  await page.click(`a[href="${r === '/' ? '#about' : r}"]`).catch(async () => {
    await page.goto(`${BASE}${r}`, { waitUntil: 'load' });
  });
  await page.waitForTimeout(700);
}
await page.waitForTimeout(1500);
console.log('after client-side navs:', JSON.stringify(await snap()));

await context.close();
await browser.close();
