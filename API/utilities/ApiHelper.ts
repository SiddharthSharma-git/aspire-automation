import { type APIRequestContext, type APIResponse } from '@playwright/test';

export interface RequestOptions {
  /** Extra request headers (e.g. Authorization). */
  readonly headers?: Record<string, string>;
  /** JSON request body. */
  readonly data?: unknown;
}

/**
 * Thin HTTP helper over an injected APIRequestContext.
 *
 * The context comes from Playwright's `request` fixture, so it is created per
 * test, uses the configured baseURL, and is disposed automatically.
 * Returns the raw APIResponse; callers (API page objects / tests) decide what to assert.
 */
export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  get(endPoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.get(endPoint, options);
  }

  post(endPoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.post(endPoint, options);
  }

  put(endPoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.put(endPoint, options);
  }

  patch(endPoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.patch(endPoint, options);
  }

  delete(endPoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.delete(endPoint, options);
  }
}
