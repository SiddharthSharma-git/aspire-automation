import { type APIResponse } from '@playwright/test';
import { type ApiHelper } from '../utilities/ApiHelper';

/** Shape of GET /api/dashboard/summaryCounts (observed on live app). */
export interface SummaryCounts {
  readonly collegeCount: number;
  readonly quizQuestionCount: number;
  readonly codingQuestionCount: number;
}

/** Dashboard endpoints (authenticated with a bearer token). */
export class DashboardApi {
  private static readonly summaryCountsEndpoint = '/api/dashboard/summaryCounts';

  constructor(private readonly apiHelper: ApiHelper) {}

  /** Pass `token` undefined to call the endpoint unauthenticated. */
  getSummaryCounts(token?: string): Promise<APIResponse> {
    return this.apiHelper.get(DashboardApi.summaryCountsEndpoint, {
      headers: token === undefined ? {} : { Authorization: `Bearer ${token}` },
    });
  }
}
