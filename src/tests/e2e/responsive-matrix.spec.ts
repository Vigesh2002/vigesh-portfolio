import { test, expect } from '@playwright/test';
import { gotoHome } from './helpers';

/**
 * Plan verification matrix: compact mobile through ultra-wide.
 * Decorative layers (glows, marquee, cursor) may extend past the viewport
 * intentionally; the page itself must not scroll horizontally.
 */
const VIEWPORTS = [
  { width: 320, height: 568, label: 'small-mobile' },
  { width: 375, height: 812, label: 'xs-mobile' },
  { width: 390, height: 844, label: 'standard-mobile' },
  { width: 768, height: 1024, label: 'tablet' },
  { width: 1024, height: 768, label: 'laptop' },
  { width: 1440, height: 900, label: 'desktop' },
  { width: 1920, height: 1080, label: 'qhd' },
  { width: 2560, height: 1440, label: 'ultrawide' },
];

test.describe('Responsive matrix', () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.label} (${vp.width}px) has no horizontal page overflow`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await gotoHome(page);

      const { scrollWidth, clientWidth } = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        return {
          scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
          clientWidth: doc.clientWidth,
        };
      });

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });
  }

  test('content container expands beyond 1280px on large screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await gotoHome(page);

    // Navbar uses the shared Container; it must not stay locked at max-w-7xl.
    const navWidth = await page.evaluate(() => {
      const header = document.querySelector('header');
      const container = header?.querySelector('div');
      return container
        ? Math.round(container.getBoundingClientRect().width)
        : 0;
    });

    expect(navWidth).toBeGreaterThan(1400);
  });
});
