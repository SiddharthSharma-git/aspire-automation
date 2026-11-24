import { type Page } from '@playwright/test';
import { BasePage } from '../../src/core/BasePage';

/**
 * Aspire login page.
 *
 * Owns the login form locators and page-level actions.
 * Assertions live in the tests; locators are exposed as readonly so tests can
 * run web-first assertions against them.
 */
export class LoginPage extends BasePage {
  readonly emailInput = this.page.locator('#email');
  readonly passwordInput = this.page.locator('#password');
  // Source XPath: //button[@type='submit']
  readonly loginButton = this.page.locator('button[type="submit"]');
  // Source XPath: //h1[normalize-space()='Welcome to Aspire 2.0']
  readonly welcomeHeading = this.page.getByRole('heading', { name: 'Welcome to Aspire 2.0' });

  constructor(page: Page) {
    super(page);
  }

  /** Open the application root; the SPA routes unauthenticated users to /login. */
  async open(): Promise<void> {
    await this.goto('/');
  }

  async loginUser(username: string, password: string): Promise<void> {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
