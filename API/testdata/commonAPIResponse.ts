/**
 * HTTP status codes asserted by API tests.
 *
 * `badRequest` and `unauthorized` reflect behaviour observed on the live QA app:
 * - POST /api/account/loginNew with unknown user  -> 400
 * - GET  /api/dashboard/summaryCounts, no token   -> 401
 */
export const HttpStatus = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
} as const;
