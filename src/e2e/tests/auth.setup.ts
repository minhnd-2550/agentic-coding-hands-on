import { test as setup } from "@playwright/test";

/**
 * Authentication setup for E2E tests.
 *
 * This project uses Google OAuth (@sun-asterisk.com) which cannot be
 * automated directly. For authenticated test scenarios:
 *
 * 1. Run `yarn test:e2e` - tests requiring auth will be skipped
 * 2. For manual auth state: login via browser, export cookies to
 *    src/e2e/auth/user.json using browser devtools or a helper script
 *
 * Future enhancement: Implement auth state capture via Supabase
 * service role key for test user provisioning.
 */
setup("authenticate as user", async () => {
  // Google OAuth cannot be automated in E2E tests.
  // Tests that don't require auth will run without this.
  // For authenticated tests, manually provide auth state in src/e2e/auth/user.json
});
