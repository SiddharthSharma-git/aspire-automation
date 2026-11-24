import { type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { NavigationBar } from './NavigationBar';

/**
 * Single entry point that builds the page objects for one Playwright Page.
 * Tests obtain pages through getters instead of constructing them directly
 * (same role as POManager in the Prism reference framework).
 */
export class POManager {
  private readonly loginPage: LoginPage;
  private readonly navigationBar: NavigationBar;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.navigationBar = new NavigationBar(page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getNavigationBar(): NavigationBar {
    return this.navigationBar;
  }
}
