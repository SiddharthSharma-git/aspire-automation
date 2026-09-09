import { test, expect } from '../../src/fixtures';
import { envConfig } from '../../src/config/envConfig';

/**
 * Login test suite — Aspire 2.0
 *
 * LOGIN-001: Valid user can log in successfully         @smoke
 * LOGIN-002: Invalid credentials show error             @regression
 * LOGIN-003: Invalid password shows error               @regression
 * LOGIN-004: Blank username validation                  @regression
 * LOGIN-005: Blank password validation                  @regression
 * LOGIN-006: Both fields blank validation               @regression
 */
test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Verify the SPA has routed to the login page before each test.
    await expect(page).toHaveURL(/\/login$/);
    await expect(page).toHaveTitle(/Aspire/i);
  });

  test(
    'LOGIN-001: valid user should log in and land on the dashboard @smoke',
    async ({ page }) => {
      // Verify the email input is visible.
      // Locator: CSS ID (#email) — explicit id attribute, stable.
      // Note: once LoginPage is built these move to LoginPage page actions.
      await expect(page.locator('#email')).toBeVisible();

      // Enter credentials from env vars — never hardcode in source.
      await page.locator('#email').fill(envConfig.testUsername);
      await page.locator('#password').fill(envConfig.testPassword);

      // Click the LOGIN submit button.
      // Using button[type="submit"] CSS selector (converted from XPath //button[@type='submit']).
      // Note: getByRole('button', { name: 'LOGIN' }) is architecturally preferred per 04-locators.mdc
      // but this explicit type selector is used per project requirement.
      await page.locator('button[type="submit"]').click();

      // Verify successful login — page must land on the dashboard.
      await expect(page).toHaveURL(/\/dashboard/);
    },
  );
});
