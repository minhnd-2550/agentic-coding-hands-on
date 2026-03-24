interface EnvConfig {
  BASE_URL: string;
  LOGIN_URL: string;
  CI: boolean;
  HEADLESS: boolean;
}

export function getEnvConfig(): EnvConfig {
  return {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    LOGIN_URL: process.env.LOGIN_URL || "http://localhost:3000/login",
    CI: process.env.CI === "true",
    HEADLESS: process.env.HEADLESS !== "false",
  };
}

export function validateRequiredEnvVars(vars: string[]): void {
  const missing = vars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
