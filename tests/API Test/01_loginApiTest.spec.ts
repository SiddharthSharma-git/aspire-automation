import { test, expect } from '../../src/fixtures';
import { envConfig } from '../../src/config/envConfig';
import { HttpStatus } from '../../API/testdata/commonAPIResponse';
import { type LoginResponse } from '../../API/pageobjects/LoginApi';

/**
 * Login API suite — POST /api/account/loginNew
 *
 * API-LOGIN-001: Valid credentials return a token and user details        @smoke
 * API-LOGIN-002: Credentials of a non-existent user are rejected          @regression
 */
test.describe('Login API', () => {
  test('API-LOGIN-001: valid credentials return a token @smoke', async ({ apiManager }) => {
    const response = await apiManager
      .getLoginApi()
      .login(envConfig.testUsername, envConfig.testPassword);

    expect(response.status()).toBe(HttpStatus.ok);
    const body = (await response.json()) as LoginResponse;
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
    expect(body.loginResponseUserDTO.email).toBeTruthy();
    expect(body.roles.length).toBeGreaterThan(0);
  });

  test('API-LOGIN-002: non-existent user is rejected @regression', async ({ apiManager }) => {
    const response = await apiManager
      .getLoginApi()
      .login('no.such.user@example.invalid', 'NotARealPassword1!');

    expect(response.status()).toBe(HttpStatus.badRequest);
  });
});
