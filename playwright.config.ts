import { defineConfig, devices } from '@playwright/test';

/**
 * Environment configuration.
 * Playwright Test (>=1.45) automatically loads .env and .env.local from the
 * project root before evaluating this config. No dotenv dependency needed.
 *
 * If BASE_URL is still unset after loading, tests will fail at navigation
 * time with a clear "invalid URL" message — no silent failures.
 */
const BASE_URL = process.env['BASE_URL'] ?? '';
const ENV = process.env['ENV'] ?? 'qa';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left in source */
  forbidOnly: !!process.env['CI'],

  /* Retry on CI only */
  retries: process.env['CI'] ? 2 : 0,

  /* Parallel workers: fixed in CI, automatic locally */
  workers: process.env['CI'] ? 4 : undefined,

  /* Global test timeout */
  timeout: 30_000,

  /* Web-first assertion timeout */
  expect: {
    timeout: 10_000,
  },

  /* Reporters: HTML for local review, list for CI log readability */
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],

  use: {
    baseURL: BASE_URL || undefined,

    /* Collect traces and screenshots for failing tests */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',

    /* Action and navigation timeouts */
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  /* Browser projects — expand per assignment requirements */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Output directories */
  outputDir: 'test-results',
});
