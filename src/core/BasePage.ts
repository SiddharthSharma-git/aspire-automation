import { type Page } from '@playwright/test';

/**
 * Abstract base class for all Page Objects.
 *
 * Responsibilities:
 * - Holds the Playwright Page instance (constructor injection).
 * - Provides minimal shared navigation.
 *
 * Do NOT add business logic or assertions here.
 * Do NOT wrap Playwright capabilities unless there is a concrete framework gap.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to an absolute URL or a path relative to the configured baseURL.
   */
  protected async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
