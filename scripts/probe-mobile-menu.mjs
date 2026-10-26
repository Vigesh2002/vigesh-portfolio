import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';
const BASE = 'http://localhost:3000';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
});
const page = await context.newPage();

page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));

await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(1000);

const btn = page.getByRole('button', { name: /open menu/i });
console.log('menu button count:', await btn.count());
console.log(
  'menu button visible:',
  await btn
    .first()
    .isVisible()
    .catch(() => false),
);

console.log(
  'preloader present:',
  await page.locator('[aria-label="Loading site"]').count(),
);
console.log(
  'body overflow:',
  JSON.stringify(await page.evaluate(() => document.body.style.overflow)),
);

await btn.first().click();
await page.waitForTimeout(1200);

console.log(
  'aria-expanded after click:',
  await page
    .getByRole('button', { name: /menu/i })
    .first()
    .getAttribute('aria-expanded')
    .catch((e) => 'err ' + e.message),
);

console.log('dialog count:', await page.getByRole('dialog').count());
console.log(
  'any role=dialog in DOM:',
  await page.evaluate(
    () => document.querySelectorAll('[role="dialog"]').length,
  ),
);
console.log(
  'html:',
  await page.evaluate(
    () =>
      document.getElementById('mobile-menu')?.innerHTML?.slice(0, 200) ??
      'no container',
  ),
);

await context.close();
await browser.close();
