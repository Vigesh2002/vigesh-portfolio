import { defineConfig, devices } from '@playwright/test';

/**
 * `CHROMIUM_PATH` lets a machine reuse a locally installed Chromium when the
 * pinned Playwright build is unavailable (e.g. an offline or throttled CDN).
 * Left unset, Playwright uses its own managed download as normal.
 */
const chromiumPath = process.env.CHROMIUM_PATH;

export default defineConfig({
  name: 'portfolio',
  testDir: 'src/tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    ...(chromiumPath
      ? { launchOptions: { executablePath: chromiumPath } }
      : {}),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
