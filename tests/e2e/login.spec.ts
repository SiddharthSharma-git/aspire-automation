import { test, expect } from '../../src/fixtures';

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
      // Verify the SPA has routed to the login path and rendered the form.
      // URL: the app redirects from '/' to '/login' client-side after bootstrap.
      await expect(page).toHaveURL(/\/login$/);
      await expect(page).toHaveTitle(/Aspire/i);

      // Verify the email input is visible.
      // Locator: CSS ID (#email) — explicit id attribute, stable.
      // Note: once LoginPage is built in Phase 4 this moves to a page action.
      await expect(page.locator('#email')).toBeVisible();
    },
  );
});
