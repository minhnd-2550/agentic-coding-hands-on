import { describe, it, expect, vi, beforeEach } from "vitest";
import { isAllowedDomain, getRateLimitConfig } from "@/utils/auth";

describe("isAllowedDomain", () => {
  it("returns true for @sun-asterisk.com email", () => {
    expect(isAllowedDomain("user@sun-asterisk.com")).toBe(true);
  });

  it("returns true regardless of case", () => {
    expect(isAllowedDomain("User@Sun-Asterisk.com")).toBe(true);
    expect(isAllowedDomain("USER@SUN-ASTERISK.COM")).toBe(true);
  });

  it("returns false for non-sun-asterisk domain", () => {
    expect(isAllowedDomain("user@gmail.com")).toBe(false);
    expect(isAllowedDomain("user@example.com")).toBe(false);
  });

  it("returns false for subdomain of sun-asterisk.com", () => {
    expect(isAllowedDomain("user@sub.sun-asterisk.com")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isAllowedDomain("")).toBe(false);
  });

  it("returns false for email without domain", () => {
    expect(isAllowedDomain("user@")).toBe(false);
  });

  it("returns false for string without @", () => {
    expect(isAllowedDomain("usersun-asterisk.com")).toBe(false);
  });
});

describe("getRateLimitConfig", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns default values when env vars not set", () => {
    const config = getRateLimitConfig();
    expect(config.maxAttempts).toBe(5);
    expect(config.windowMinutes).toBe(15);
  });

  it("reads RATE_LIMIT_MAX_ATTEMPTS from env", () => {
    vi.stubEnv("RATE_LIMIT_MAX_ATTEMPTS", "10");
    const config = getRateLimitConfig();
    expect(config.maxAttempts).toBe(10);
  });

  it("reads RATE_LIMIT_WINDOW_MINUTES from env", () => {
    vi.stubEnv("RATE_LIMIT_WINDOW_MINUTES", "30");
    const config = getRateLimitConfig();
    expect(config.windowMinutes).toBe(30);
  });

  it("falls back to defaults for invalid env values", () => {
    vi.stubEnv("RATE_LIMIT_MAX_ATTEMPTS", "abc");
    vi.stubEnv("RATE_LIMIT_WINDOW_MINUTES", "");
    const config = getRateLimitConfig();
    expect(config.maxAttempts).toBe(5);
    expect(config.windowMinutes).toBe(15);
  });
});
