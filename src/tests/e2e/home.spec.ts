import { test, expect } from '@playwright/test';
import { gotoHome } from './helpers';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page);
  });

  test('exposes the main sections via anchor navigation', async ({ page }) => {
    const sections = [
      'About',
      'Skills',
      'Experience',
      'Projects',
      'Education',
      'Contact',
    ];
    const nav = page.getByRole('navigation', {
      name: /site navigation|primary/i,
    });
    for (const label of sections) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible();
    }
  });

  test('highlights the active section as the user scrolls', async ({
    page,
  }) => {
    // Click the Experience link; it should become the active nav item.
    const experienceLink = page
      .getByRole('navigation', { name: /primary/i })
      .getByRole('link', { name: 'Experience' });
    await experienceLink.click();
    await page
      .getByRole('heading', { name: /Work Experience/i })
      .waitFor({ state: 'visible', timeout: 10_000 });

    await expect(experienceLink).toHaveAttribute('aria-current', 'true', {
      timeout: 10_000,
    });
  });

  test('offers a dark / light theme toggle', async ({ page }) => {
    const toggle = page.getByRole('button', {
      name: /toggle theme|switch to (dark|light) theme/i,
    });
    await expect(toggle).toBeVisible();
  });

  test('shows the resume download link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: /download resume/i }),
    ).toBeVisible();
  });
});

test.describe('Motion layer', () => {
  test('renders the hero headline as real, selectable text', async ({
    page,
  }) => {
    await gotoHome(page);

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    // SplitText wraps words in spans; the sentence must survive intact.
    await expect(h1).toContainText('Vigesh');
  });

  test('anchor navigation scrolls the target clear of the sticky navbar', async ({
    page,
  }) => {
    await gotoHome(page);

    const projectsLink = page
      .getByRole('navigation', { name: /primary/i })
      .getByRole('link', { name: 'Projects' });
    await projectsLink.click();

    await expect
      .poll(
        async () =>
          page.evaluate(() => {
            const el = document.getElementById('projects');
            return el ? Math.round(el.getBoundingClientRect().top) : null;
          }),
        { timeout: 10_000 },
      )
      .toBeLessThan(220);

    const top = await page.evaluate(() => {
      const el = document.getElementById('projects');
      return el ? el.getBoundingClientRect().top : 9999;
    });
    // Must sit below the 64px navbar rather than underneath it.
    expect(top).toBeGreaterThan(0);
    expect(top).toBeLessThan(220);
  });

  test('theme toggle actually switches the document theme', async ({
    page,
  }) => {
    await gotoHome(page);

    const before = await page.evaluate(
      () => document.documentElement.className,
    );
    const toggle = page
      .getByRole('button', {
        name: /toggle theme|switch to (dark|light) theme/i,
      })
      .first();
    await toggle.click();
    await page.waitForTimeout(800);

    const after = await page.evaluate(() => document.documentElement.className);
    expect(after).not.toBe(before);
  });

  test('exposes all six accent themes in the colour picker', async ({
    page,
  }) => {
    await gotoHome(page);

    const colorButton = page.getByRole('button', {
      name: /change accent color/i,
    });
    await colorButton.scrollIntoViewIfNeeded();
    await colorButton.click();
    await expect(page.getByRole('menuitemradio')).toHaveCount(6, {
      timeout: 10_000,
    });
    await expect(
      page.getByRole('menuitemradio', { name: /forest/i }),
    ).toBeVisible();
  });
});

test.describe('Reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('skips the preloader, smooth scroll and custom cursor', async ({
    page,
  }) => {
    await page.goto('/');
    // Give hydration a moment; the curtain must never appear.
    await page.waitForTimeout(2000);

    await expect(page.locator('[aria-label="Loading site"]')).toHaveCount(0);
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.documentElement.classList.contains('lenis'),
        ),
      )
      .toBe(false);
    await expect(page.locator('.mix-blend-difference')).toHaveCount(0);
  });

  test('leaves all hero copy visible and readable', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Vigesh');

    // No word may be left at low opacity.
    const opacities = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h1 span, h1 div'))
        .map((el) => Number(getComputedStyle(el).opacity))
        .filter((o) => o < 0.9),
    );
    expect(opacities).toHaveLength(0);
  });

  test('still allows full navigation and anchor scrolling', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForTimeout(1200);

    await page
      .getByRole('navigation', { name: /primary/i })
      .getByRole('link', { name: 'Contact' })
      .click();

    await expect
      .poll(
        async () =>
          page.evaluate(() => {
            const el = document.getElementById('contact');
            return el ? el.getBoundingClientRect().top : null;
          }),
        { timeout: 8000 },
      )
      .toBeLessThan(220);
  });
});
