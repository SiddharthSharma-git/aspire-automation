/**
 * Lazy, typed environment configuration.
 *
 * Values are read from process.env at property-access time.
 * This ensures module import never throws during test collection
 * or typecheck — only when a property is actually accessed at test runtime.
 *
 * Required variables must be present before running tests.
 * See .env.example for the full list and placeholder values.
 *
 * Usage:
 *   import { envConfig } from '../config/envConfig';
 *   const url = envConfig.baseUrl;
 */

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[EnvConfig] Required environment variable "${name}" is not set.\n` +
        'Copy .env.example to .env and populate all required values before running tests.',
    );
  }
  return value;
}

class EnvironmentConfig {
  /** Application base URL. Required. Set via BASE_URL env var. */
  get baseUrl(): string {
    return requireEnvVar('BASE_URL');
  }

  /** Target environment label (dev | qa | uat | staging | prod). Defaults to "qa". */
  get env(): string {
    return process.env['ENV'] ?? 'qa';
  }

  /**
   * Primary test user email / username. Required.
   * Never log or expose this value.
   */
  get testUsername(): string {
    return requireEnvVar('TEST_USERNAME');
  }

  /**
   * Primary test user password. Required.
   * Never log, print, or store this value beyond process.env scope.
   */
  get testPassword(): string {
    return requireEnvVar('TEST_PASSWORD');
  }
}

export const envConfig = new EnvironmentConfig();
