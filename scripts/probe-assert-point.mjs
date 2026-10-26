import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'no-preference',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto('http://localhost:3000/', { waitUntil: 'load' });

console.log(
  'early preloader count:',
  await page.locator('[aria-label="Loading site"]').count(),
);

await page
  .waitForSelector('[aria-label="Loading site"]', {
    state: 'detached',
    timeout: 10000,
  })
  .catch(() => console.log('waitForSelector timed out'));

console.log(
  'preloader count now:',
  await page.locator('[aria-label="Loading site"]').count(),
);
console.log(
  'state at assertion point:',
  JSON.stringify(
    await page.evaluate(() => ({
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      htmlClass: document.documentElement.className,
      flag: sessionStorage.getItem('portfolio:preloader-played'),
      hasReveal: !!document.querySelector('[class*="opacity-0"]'),
    })),
  ),
);

// Now wait longer and see whether it eventually clears.
for (const wait of [1000, 2000, 3000]) {
  await page.waitForTimeout(wait);
  console.log(
    `+${wait}ms:`,
    JSON.stringify(
      await page.evaluate(() => ({
        bodyOverflow: document.body.style.overflow,
        preloader: document.querySelectorAll('[aria-label="Loading site"]')
          .length,
      })),
    ),
  );
}

console.log('errors:', errors.slice(0, 5));
await context.close();
await browser.close();
