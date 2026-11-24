import { test, expect } from '../../src/fixtures';
import { envConfig } from '../../src/config/envConfig';
import { HttpStatus } from '../../API/testdata/commonAPIResponse';
import { type SummaryCounts } from '../../API/pageobjects/DashboardApi';

/**
 * Dashboard API suite — GET /api/dashboard/summaryCounts
 *
 * API-DASH-001: Authenticated request returns summary counts   @smoke
 * API-DASH-002: Request without a token is rejected            @regression
 */
test.describe('Dashboard API', () => {
  test('API-DASH-001: authenticated request returns summary counts @smoke', async ({
    apiManager,
  }) => {
    const token = await apiManager
      .getLoginApi()
      .getToken(envConfig.testUsername, envConfig.testPassword);

    const response = await apiManager.getDashboardApi().getSummaryCounts(token);

    expect(response.status()).toBe(HttpStatus.ok);
    const body = (await response.json()) as SummaryCounts;
    expect(typeof body.collegeCount).toBe('number');
    expect(typeof body.quizQuestionCount).toBe('number');
    expect(typeof body.codingQuestionCount).toBe('number');
  });

  test('API-DASH-002: request without a token is rejected @regression', async ({
    apiManager,
  }) => {
    const response = await apiManager.getDashboardApi().getSummaryCounts();

    expect(response.status()).toBe(HttpStatus.unauthorized);
  });
});
