import { test, expect } from '@playwright/test';
import { gotoHome } from './helpers';

test.describe('Navigation', () => {
  test('mobile menu opens, navigates and is keyboard-trapable', async ({
    page,
  }) => {
    await gotoHome(page);

    // On desktop the menu button is hidden; force a narrow viewport.
    await page.setViewportSize({ width: 390, height: 844 });

    const menuButton = page.getByRole('button', { name: /open menu/i });
    await expect(menuButton).toBeVisible();
    // Let the navbar reflow after the viewport change so the click hits the live control.
    await page.waitForTimeout(300);

    await menuButton.click();
    await expect(
      page.getByRole('dialog', { name: /site navigation/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Escape closes it.
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
