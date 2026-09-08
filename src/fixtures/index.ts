import { test as base, expect } from '@playwright/test';

/**
 * Re-export expect so tests only need one import source.
 */
export { expect };

/**
 * Application fixture type.
 *
 * Add page objects and business flows here as they are built in later phases.
 * Each entry becomes an injectable parameter in test({ fixture }) callbacks.
 *
 * Phase 4 example:
 *   loginFlow: LoginFlow;
 *
 * Phase 5+ examples:
 *   candidateFlow: CandidateFlow;
 *   jobFlow:       JobFlow;
 */
type AppFixtures = {
  // Phase 4: loginFlow: LoginFlow;
};

/**
 * Root test fixture for the Aspire automation framework.
 *
 * All test files must import { test } from this module instead of
 * '@playwright/test' directly. This keeps the fixture contract
 * centralised and avoids scattered overrides across test files.
 *
 * Usage:
 *   import { test, expect } from '../../fixtures';
 */
export const test = base.extend<AppFixtures>({});
