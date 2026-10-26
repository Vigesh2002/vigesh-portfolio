/**
 * Smoke-verification harness for the GSAP/Lenis motion layer.
 *
 * Uses the Playwright browser already present on this machine (build 1208)
 * rather than the one the current Playwright version wants to download.
 * Run with: node scripts/verify-motion.mjs
 */
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const EXECUTABLE =
  process.env.CHROMIUM_PATH ??
  'C:/Users/user/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe';

const failures = [];
const notes = [];

function check(name, condition, detail = '') {
  const ok = Boolean(condition);
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`,
  );
  if (!ok) failures.push(name);
  return ok;
}

async function newPage(browser, { reducedMotion = 'no-preference' } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion,
  });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  return { context, page, errors };
}

const browser = await chromium.launch({ executablePath: EXECUTABLE });

try {
  // ---------------------------------------------------------------- normal run
  {
    const { context, page, errors } = await newPage(browser);

    await page.goto(BASE, { waitUntil: 'load' });

    // The curtain is gated on `useFirstVisit`, which reads sessionStorage during
    // render and therefore only mounts after hydration — it is deliberately
    // absent from the server HTML so LCP measures real content. So: wait for it
    // to appear, then wait for it to go away. (Waiting for "detached" straight
    // away resolves instantly and asserts nothing.)
    const preloader = page.locator('[aria-label="Loading site"]');
    await preloader
      .waitFor({ state: 'attached', timeout: 8000 })
      .catch(() => {});
    notes.push(
      `preloader mounted on first visit: ${(await preloader.count()) === 1}`,
    );

    await preloader
      .waitFor({ state: 'detached', timeout: 10000 })
      .catch(() => {});

    check('preloader dismisses itself', (await preloader.count()) === 0);

    check(
      'scroll lock released (body not overflow:hidden)',
      (await page.evaluate(() => document.body.style.overflow !== 'hidden')) ===
        true,
    );

    // Lenis only constructs in the effect after hydration, so poll rather than
    // asserting on the first frame.
    await page
      .waitForFunction(
        () => document.documentElement.classList.contains('lenis'),
        null,
        {
          timeout: 8000,
        },
      )
      .catch(() => {});

    check(
      'Lenis took over scrolling (html.lenis class)',
      (await page.evaluate(() =>
        document.documentElement.classList.contains('lenis'),
      )) === true,
    );

    const h1Text = await page.locator('h1').first().innerText();
    check(
      'hero headline text is intact after splitting',
      h1Text.includes('Vigesh'),
      JSON.stringify(h1Text),
    );

    check(
      'accent gradient preserved on the name',
      (await page.locator('h1 span.bg-clip-text').count()) > 0,
    );

    // Scroll progress bar should scale as we scroll.
    const barSelector = 'div.z-\\[60\\] > div';
    const before = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).transform : 'missing';
    }, barSelector);
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    const after = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).transform : 'missing';
    }, barSelector);
    check(
      'scroll progress bar reacts to scroll',
      before !== after && after !== 'missing',
      `${before} -> ${after}`,
    );

    // Anchor navigation via Lenis should land near the target section.
    await page
      .locator('nav[aria-label="Primary"] a[href="#projects"]')
      .first()
      .click();
    await page.waitForTimeout(2000);
    const projectsTop = await page.evaluate(() => {
      const el = document.getElementById('projects');
      return el ? el.getBoundingClientRect().top : null;
    });
    check(
      'anchor click scrolls to #projects clear of the navbar',
      projectsTop !== null && projectsTop > -50 && projectsTop < 220,
      `top=${Math.round(projectsTop ?? 0)}px`,
    );

    // Custom cursor should exist on a fine-pointer desktop context.
    const cursorCount = await page.evaluate(
      () => document.querySelectorAll('.mix-blend-difference').length,
    );
    notes.push(`custom cursor nodes rendered: ${cursorCount}`);
    check(
      'custom cursor mounts on desktop fine pointer',
      cursorCount >= 2,
      `nodes=${cursorCount}`,
    );

    check(
      'no uncaught page errors during motion',
      errors.length === 0,
      errors.slice(0, 3).join(' | '),
    );

    await context.close();
  }

  // ------------------------------------------------------- reduced-motion run
  {
    const { context, page, errors } = await newPage(browser, {
      reducedMotion: 'reduce',
    });

    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(1200);

    check(
      'preloader is skipped under reduced motion',
      (await page.locator('[aria-label="Loading site"]').count()) === 0,
    );

    check(
      'Lenis is not started under reduced motion',
      (await page.evaluate(() =>
        document.documentElement.classList.contains('lenis'),
      )) === false,
    );

    check(
      'custom cursor is not mounted under reduced motion',
      (await page.evaluate(
        () => document.querySelectorAll('.mix-blend-difference').length,
      )) === 0,
    );

    const h1 = await page.locator('h1').first().innerText();
    check(
      'hero headline still readable',
      h1.includes('Vigesh'),
      JSON.stringify(h1),
    );

    const heroOpacity = await page.evaluate(() => {
      const word = document.querySelector('h1 div');
      return word ? getComputedStyle(word).opacity : 'no-split-nodes';
    });
    check(
      'no words left invisible under reduced motion',
      heroOpacity === 'no-split-nodes' || Number(heroOpacity) > 0.9,
      `opacity=${heroOpacity}`,
    );

    check(
      'no uncaught page errors under reduced motion',
      errors.length === 0,
      errors.slice(0, 3).join(' | '),
    );

    await context.close();
  }

  // ------------------------------------------------------------- touch devices
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(1500);

    check(
      'no horizontal overflow on mobile',
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
      await page.evaluate(
        () => `${document.documentElement.scrollWidth} vs ${window.innerWidth}`,
      ),
    );

    check(
      'custom cursor absent on touch viewport',
      (await page.evaluate(
        () => document.querySelectorAll('.mix-blend-difference').length,
      )) === 0,
    );

    await context.close();
  }
} finally {
  await browser.close();
}

console.log('\n--- notes ---');
notes.forEach((n) => console.log(`  ${n}`));

console.log(
  `\n${failures.length === 0 ? 'ALL CHECKS PASSED' : `FAILURES: ${failures.join(', ')}`}`,
);
process.exit(failures.length === 0 ? 0 : 1);
