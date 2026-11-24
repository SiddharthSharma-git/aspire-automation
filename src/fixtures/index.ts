import { test as base, expect } from '@playwright/test';
import { APIManager } from '../../API/pageobjects/APIManager';
import { POManager } from '../../UI/pageobjects/POManager';

/**
 * Re-export expect so tests only need one import source.
 */
export { expect };

/**
 * Application fixture type.
 * Each entry becomes an injectable parameter in test({ fixture }) callbacks.
 */
type AppFixtures = {
  /** UI page-object factory bound to the test's own Page (isolated per test). */
  poManager: POManager;
  /** API page-object factory bound to the test's own request context (isolated per test). */
  apiManager: APIManager;
};

/**
 * Root test fixture for the Aspire automation framework.
 *
 * All test files must import { test } from this module instead of
 * '@playwright/test' directly. This keeps the fixture contract
 * centralised and avoids scattered overrides across test files.
 */
export const test = base.extend<AppFixtures>({
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },
  apiManager: async ({ request }, use) => {
    await use(new APIManager(request));
  },
});
