export interface SiteConfig {
  baseURL: string;
  loginURL: string;
}

export interface EnvironmentConfig {
  baseURL: string;
  loginURL: string;
  ci: boolean;
  headless: boolean;
}
