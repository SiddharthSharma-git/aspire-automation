import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

/**
 * Load .env from the project root explicitly.
 * dotenv.config() is a no-op if the file does not exist, so this is safe
 * in CI where variables are injected via the environment directly.
 * This runs before defineConfig() evaluates so BASE_URL is always available.
 */
dotenv.config();

const BASE_URL = process.env['BASE_URL'] ?? '';
const ENV = process.env['ENV'] ?? 'qa';

/**
 * SLOWMO: optional millisecond delay injected between every Playwright action.
 * Use for local visual debugging only — never set in CI.
 *
 * Usage:
 *   SLOWMO=1000 npx playwright test --headed --project=chromium
 */
const SLOWMO = process.env['SLOWMO'] ? parseInt(process.env['SLOWMO'], 10) : 0;

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

    /* Slow motion for local headed debugging — 0 in CI and normal runs */
    launchOptions: {
      slowMo: SLOWMO,
    },

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
