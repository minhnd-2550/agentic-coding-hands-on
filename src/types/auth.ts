export type LoginErrorType =
  | "domain_restricted"
  | "auth_cancelled"
  | "auth_failed"
  | "rate_limited";

export type RateLimitConfig = {
  maxAttempts: number;
  windowMinutes: number;
};
