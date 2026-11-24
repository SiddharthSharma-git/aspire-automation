import { type Page } from '@playwright/test';
import { BasePage } from '../../src/core/BasePage';

/**
 * Header / profile navigation shown to authenticated users.
 */
export class NavigationBar extends BasePage {
  // Source XPath: //*[local-name()='svg' and @data-icon='down']
  readonly profileMenuIcon = this.page.locator('[data-icon="down"]');
  // Source XPath: //button[normalize-space()='LOG OUT']
  readonly logOutButton = this.page.getByRole('button', { name: 'LOG OUT' });

  constructor(page: Page) {
    super(page);
  }

  /** Open the profile panel and click LOG OUT. */
  async logout(): Promise<void> {
    await this.profileMenuIcon.click();
    await this.logOutButton.click();
  }
}
