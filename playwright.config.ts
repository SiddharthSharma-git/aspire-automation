import { defineConfig, devices } from '@playwright/test';

/**
 * Environment configuration.
 * Set BASE_URL and ENV in a .env file (see .env.example) or as shell exports.
 * Playwright does not load .env automatically — populate via your shell or
 * a CI secret manager before running tests.
 */
const BASE_URL = process.env['BASE_URL'] ?? '';
const ENV = process.env['ENV'] ?? 'qa';

if (!BASE_URL) {
  console.warn(
    '[playwright.config] BASE_URL is not set. ' +
      'Copy .env.example to .env and populate BASE_URL before running tests.',
  );
}

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
