import { type APIResponse } from '@playwright/test';
import { type ApiHelper } from '../utilities/ApiHelper';

/** Shape of a successful POST /api/account/loginNew response (observed on live app). */
export interface LoginResponse {
  readonly token: string;
  readonly loginResponseUserDTO: { readonly email: string; readonly username: string };
  readonly roles: readonly string[];
}

/** Login endpoint: path, request body and token extraction. */
export class LoginApi {
  private static readonly endpoint = '/api/account/loginNew';

  constructor(private readonly apiHelper: ApiHelper) {}

  /** Raw login call — use for both positive and negative assertions. */
  login(username: string, password: string): Promise<APIResponse> {
    return this.apiHelper.post(LoginApi.endpoint, {
      data: { username, userPassword: password },
    });
  }

  /**
   * Logs in and returns the bearer token.
   * @throws Error with status code if login is not successful (never includes the response body).
   */
  async getToken(username: string, password: string): Promise<string> {
    const response = await this.login(username, password);
    if (!response.ok()) {
      throw new Error(`[LoginApi.getToken] Login failed with status ${response.status()}`);
    }
    const body = (await response.json()) as LoginResponse;
    return body.token;
  }
}
