import { test, expect } from '../../src/fixtures';
import { envConfig } from '../../src/config/envConfig';

/**
 * Login test suite — Aspire 2.0
 *
 * Current scope (Phase 4 — launch verification):
 *   LOGIN-000: Application loads and is reachable
 *
 * Upcoming (after UI inspection):
 *   LOGIN-001: Valid user can log in successfully       @smoke
 *   LOGIN-002: Invalid credentials show error           @regression
 *   LOGIN-003: Invalid password shows error             @regression
 *   LOGIN-004: Blank username validation                @regression
 *   LOGIN-005: Blank password validation                @regression
 *   LOGIN-006: Both fields blank validation             @regression
 */
test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test(
    'should load the Aspire application @smoke',
    async ({ page }) => {
      // Verify the app is reachable and renders a page with an Aspire title.
      // This confirms baseURL resolves, the network path is open, and the
      // SPA has bootstrapped enough to set the document title.
      await expect(page).toHaveURL(envConfig.baseUrl);
      await expect(page).toHaveTitle(/Aspire/i);
    },
  );
});
