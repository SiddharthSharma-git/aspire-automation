import { test, expect } from '../../src/fixtures';
import { type Page } from '@playwright/test';
import { envConfig } from '../../src/config/envConfig';

/**
 * Shared login helper — performs the full login flow as a precondition.
 * Temporary: will be replaced by LoginFlow once the Page Object layer is built.
 */
async function loginAsTestUser(page: Page): Promise<void> {
  await expect(page.locator('#email')).toBeVisible();
  await page.locator('#email').fill(envConfig.testUsername);
  await page.locator('#password').fill(envConfig.testPassword);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/dashboard/);
}

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
      await page.locator('button[type="submit"]').click();

      // Verify successful login — page must land on the dashboard.
      await expect(page).toHaveURL(/\/dashboard/);
    },
  );
});

/**
 * Logout test suite — Aspire 2.0
 *
 * LOGIN-013: Authenticated user can log out and return to login page  @regression
 */
test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login$/);
    await loginAsTestUser(page);
  });

  test(
    'LOGIN-013: authenticated user should log out and return to the login page @regression',
    async ({ page }) => {
      // Click the profile dropdown icon to open the logout panel.
      // Source XPath: //*[local-name()='svg' and @data-icon='down']
      // CSS attr selector preferred over namespace XPath per 04-locators.mdc.
      await page.locator('[data-icon="down"]').click();

      // Click the LOG OUT button in the slide-out panel.
      // Source XPath: //button[normalize-space()='LOG OUT']
      await page.getByRole('button', { name: 'LOG OUT' }).click();

      // Verify the user is redirected back to the login page.
      await expect(page).toHaveURL(/\/login$/);

      // Verify the login page heading is visible — confirms full logout.
      // Source XPath: //h1[normalize-space()='Welcome to Aspire 2.0']
      await expect(
        page.getByRole('heading', { name: 'Welcome to Aspire 2.0' }),
      ).toBeVisible();
    },
  );
});

