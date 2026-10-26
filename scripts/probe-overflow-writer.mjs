import { chromium } from '@playwright/test';

const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const context = await browser.newContext();
const page = await context.newPage();

// Trap writes to body.style.overflow and report the stack that causes them.
await page.addInitScript(() => {
  window.__overflowWrites = [];
  Object.defineProperty(document, '___ready', { value: true });
  // Patch after DOM is available.
  const patch = () => {
    const proto = CSSStyleDeclaration.prototype;
    const orig = Object.getOwnPropertyDescriptor(proto, 'overflow');
    if (!orig || !orig.set) return;
    Object.defineProperty(proto, 'overflow', {
      configurable: true,
      get() {
        return orig.get.call(this);
      },
      set(value) {
        if (document.body && this === document.body.style) {
          window.__overflowWrites.push({
            value,
            stack: new Error().stack,
            t: Math.round(performance.now()),
          });
        }
        return orig.set.call(this, value);
      },
    });
  };
  patch();
});

await page.goto('http://localhost:3000/', { waitUntil: 'load' });
await page
  .waitForSelector('[aria-label="Loading site"]', {
    state: 'detached',
    timeout: 10000,
  })
  .catch(() => {});
await page.waitForTimeout(1000);

console.log(
  'preloader count:',
  await page.locator('[aria-label="Loading site"]').count(),
);
console.log(
  'body.style.overflow:',
  JSON.stringify(await page.evaluate(() => document.body.style.overflow)),
);

const writes = await page.evaluate(() => window.__overflowWrites);
console.log('\n=== body.style.overflow writes ===');
writes.forEach((w) => {
  console.log(`t=${w.t}ms  value=${JSON.stringify(w.value)}`);
  console.log(
    w.stack
      .split('\n')
      .slice(1, 6)
      .map((l) => '    ' + l.trim())
      .join('\n'),
  );
});

await context.close();
await browser.close();
