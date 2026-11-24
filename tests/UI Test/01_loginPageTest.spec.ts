import { test, expect } from '../../src/fixtures';
import { envConfig } from '../../src/config/envConfig';

/**
 * Login / logout suite — Aspire 2.0
 *
 * LOGIN-001: Valid user can log in successfully                       @smoke
 * LOGIN-013: Authenticated user can log out and return to login page  @regression
 *
 * Planned: LOGIN-002..006 (invalid / blank credential validation).
 */
test.describe('Login', () => {
  test.beforeEach(async ({ poManager }) => {
    await poManager.getLoginPage().open();
  });

  test('LOGIN-001: valid user should log in and land on the dashboard @smoke', async ({ page, poManager }) => {
    const loginPage = poManager.getLoginPage();

    // Preconditions: SPA routed to the login page and rendered the form.
    await expect(page).toHaveURL(/\/login$/);
    await expect(page).toHaveTitle(/Aspire/i);
    await expect(loginPage.emailInput).toBeVisible();

    // Credentials come from env vars via envConfig — never hardcoded.
    await loginPage.loginUser(envConfig.testUsername, envConfig.testPassword);

    await expect(page).toHaveURL(/\/dashboard/);
  });
});

test.describe('Logout', () => {
  test.beforeEach(async ({ page, poManager }) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.open();
    await loginPage.loginUser(envConfig.testUsername, envConfig.testPassword);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('LOGIN-013: authenticated user should log out and return to the login page @regression', async ({
    page,
    poManager,
  }) => {
    await poManager.getNavigationBar().logout();

    await expect(page).toHaveURL(/\/login$/);
    await expect(poManager.getLoginPage().welcomeHeading).toBeVisible();
  });
});
