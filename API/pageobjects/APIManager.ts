import { type APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utilities/ApiHelper';
import { DashboardApi } from './DashboardApi';
import { LoginApi } from './LoginApi';

/**
 * Creates API page objects sharing one ApiHelper (and request context).
 * API counterpart of POManager.
 */
export class APIManager {
  private readonly loginApi: LoginApi;
  private readonly dashboardApi: DashboardApi;

  constructor(request: APIRequestContext) {
    const apiHelper = new ApiHelper(request);
    this.loginApi = new LoginApi(apiHelper);
    this.dashboardApi = new DashboardApi(apiHelper);
  }

  getLoginApi(): LoginApi {
    return this.loginApi;
  }

  getDashboardApi(): DashboardApi {
    return this.dashboardApi;
  }
}
