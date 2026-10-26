import { test, expect } from '@playwright/test';
import { gotoHome } from './helpers';

test.describe('Contact form', () => {
  test('rejects invalid input before reaching the server', async ({ page }) => {
    await gotoHome(page);
    const submit = page.getByRole('button', { name: /send message/i });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();

    // Zod field errors on the form itself (ignore unrelated page alerts).
    const formAlerts = page.locator("form [role='alert']");
    await expect(formAlerts).toHaveCount(3, { timeout: 10_000 });
    await expect(formAlerts.filter({ hasText: /name/i })).toBeVisible();
    await expect(formAlerts.filter({ hasText: /email/i })).toBeVisible();
    await expect(formAlerts.filter({ hasText: /message/i })).toBeVisible();
  });

  test('shows a client-side error when the endpoint is unreachable', async ({
    page,
  }) => {
    // Force 500 responses on the API route.
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'boom' }),
      }),
    );

    await gotoHome(page);
    await page.getByRole('textbox', { name: 'Name' }).fill('Test Person');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page
      .getByRole('textbox', { name: 'Message' })
      .fill('This is a test message that is long enough.');

    const submit = page.getByRole('button', { name: /send message/i });
    await submit.scrollIntoViewIfNeeded();
    await submit.click();

    await expect(page.locator('form').getByText('boom')).toBeVisible({
      timeout: 10_000,
    });
  });
});
