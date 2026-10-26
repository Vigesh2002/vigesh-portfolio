import { expect, type Page } from '@playwright/test';

/**
 * Waits for the first-visit entry curtain to finish.
 *
 * The preloader renders only on a first visit in a session, and Playwright
 * gives every test a fresh context, so it is present in almost every test. It
 * covers the viewport at z-100, so any click before it lifts is intercepted.
 *
 * Under `prefers-reduced-motion` the curtain never mounts and this resolves
 * immediately.
 */
export async function waitForPreloader(page: Page): Promise<void> {
  const preloader = page.locator('[aria-label="Loading site"]');
  await preloader.waitFor({ state: 'detached', timeout: 15_000 }).catch(() => {
    // Falls through to the assertion below so a stuck curtain fails loudly
    // with a useful message rather than a bare timeout.
  });
  await expect(preloader).toHaveCount(0);
}

/**
 * Waits until client effects have run. The preloader can unmount via its hard
 * cap while the dev server is still hydrating under parallel test workers;
 * interactive controls need a beat after that before clicks are reliable.
 */
async function waitForClientReady(page: Page): Promise<void> {
  await page
    .waitForFunction(
      () =>
        document.documentElement.classList.contains('lenis') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      { timeout: 10_000 },
    )
    .catch(() => {
      // Reduced motion / blocked Lenis still allows tests to proceed.
    });
  await page.waitForTimeout(200);
}

/** `goto` plus the curtain wait, for the common home-page entry point. */
export async function gotoHome(page: Page, path = '/'): Promise<void> {
  await page.goto(path);
  await waitForPreloader(page);
  await waitForClientReady(page);
}
