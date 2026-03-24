import type { RateLimitConfig } from "@/types/auth";

const ALLOWED_DOMAIN = "sun-asterisk.com";

export function isAllowedDomain(email: string): boolean {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1];
  if (!domain) return false;
  return domain.toLowerCase() === ALLOWED_DOMAIN;
}

export function getRateLimitConfig(): RateLimitConfig {
  const maxAttempts = parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS ?? "", 10);
  const windowMinutes = parseInt(
    process.env.RATE_LIMIT_WINDOW_MINUTES ?? "",
    10
  );

  return {
    maxAttempts: Number.isNaN(maxAttempts) ? 5 : maxAttempts,
    windowMinutes: Number.isNaN(windowMinutes) ? 15 : windowMinutes,
  };
}
