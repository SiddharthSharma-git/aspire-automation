import { type Locator, type Page } from '@playwright/test';

/** Derive AriaRole from Page.getByRole() rather than importing a named type
 *  that is not always re-exported across Playwright versions. */
type AriaRole = Parameters<Page['getByRole']>[0];

/**
 * Portable, JSON-serialisable locator definition.
 *
 * Used in per-page locator files (src/locators/*.locators.json).
 * Resolved to a Playwright Locator at runtime via BasePage.resolveLocator().
 *
 * Resolution priority follows 04-locators.mdc:
 *   role → label → placeholder → text → testId → css
 */
export interface LocatorDef {
  /** ARIA role string — cast to AriaRole at resolution time. Pair with `name`. */
  readonly role?: string;
  /** Accessible name — used with `role` only. */
  readonly name?: string;
  /** aria-label or associated <label> text. */
  readonly label?: string;
  /** Input placeholder text. */
  readonly placeholder?: string;
  /** Visible text content. */
  readonly text?: string;
  /** Whether the label/text/placeholder match must be exact. Defaults to Playwright default. */
  readonly exact?: boolean;
  /** data-testid attribute value. */
  readonly testId?: string;
  /** Stable CSS selector — fallback only. */
  readonly css?: string;
}

/**
 * Abstract base class for all Page Objects.
 *
 * Responsibilities:
 * - Holds the Playwright Page instance (constructor injection).
 * - Provides resolveLocator() so Page Objects can declare locators as
 *   LocatorDef references to a JSON source rather than inline strings.
 * - Provides minimal shared navigation / wait helpers.
 *
 * Do NOT add business logic or assertions here.
 * Do NOT wrap Playwright capabilities unless there is a concrete framework gap.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Resolves a LocatorDef to a Playwright Locator using semantic locators
   * in priority order defined by 04-locators.mdc.
   *
   * @throws Error if the LocatorDef has no resolvable property.
   */
  protected resolveLocator(def: LocatorDef): Locator {
    if (def.role !== undefined) {
      return this.page.getByRole(def.role as AriaRole, {
        ...(def.name !== undefined && { name: def.name }),
        ...(def.exact !== undefined && { exact: def.exact }),
      });
    }
    if (def.label !== undefined) {
      return this.page.getByLabel(def.label, { exact: def.exact });
    }
    if (def.placeholder !== undefined) {
      return this.page.getByPlaceholder(def.placeholder, { exact: def.exact });
    }
    if (def.text !== undefined) {
      return this.page.getByText(def.text, { exact: def.exact });
    }
    if (def.testId !== undefined) {
      return this.page.getByTestId(def.testId);
    }
    if (def.css !== undefined) {
      return this.page.locator(def.css);
    }
    throw new Error(
      `[BasePage.resolveLocator] LocatorDef has no resolvable property: ${JSON.stringify(def)}`,
    );
  }

  /**
   * Navigate to an absolute URL or a path relative to the configured baseURL.
   */
  protected async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for DOM content to be loaded.
   * Prefer Playwright auto-waiting in page actions; use this only for
   * navigations that require an explicit readiness check.
   */
  protected async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
