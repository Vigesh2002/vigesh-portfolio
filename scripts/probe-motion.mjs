import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';

const browser = await chromium.launch({ executablePath: EXECUTABLE });

// Reduced-motion context — this is where the uncaught error appeared.
{
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  const logs = [];
  page.on('pageerror', (e) => logs.push(`PAGEERROR: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      logs.push(`${m.type().toUpperCase()}: ${m.text()}`);
    }
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  console.log('=== REDUCED MOTION LOGS ===');
  logs.forEach((l) => console.log('  ' + l));
  console.log(
    'html class:',
    await page.evaluate(() => document.documentElement.className),
  );
  await context.close();
}

// Normal context — probe Lenis class timing.
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const logs = [];
  page.on('pageerror', (e) => logs.push(`PAGEERROR: ${e.message}`));

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  for (const t of [200, 600, 1200, 2500]) {
    await page.waitForTimeout(t === 200 ? 200 : 400);
    const state = await page.evaluate(() => ({
      html: document.documentElement.className,
      bodyOverflow: document.body.style.overflow,
      hasLenisStyles: document.querySelectorAll('html.lenis').length,
    }));
    console.log(`t~${t}ms:`, JSON.stringify(state));
  }
  console.log('=== NORMAL LOGS ===');
  logs.forEach((l) => console.log('  ' + l));
  await context.close();
}

await browser.close();
