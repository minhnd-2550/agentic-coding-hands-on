import { test as baseTest, type Page } from "@playwright/test";
import { RoleType } from "../../enums/common";
import { AuthManager } from "../../utils/auth";

export interface AuthFixtures {
  authenticatedPage: Page;
  authManager: AuthManager;
}

export interface AuthWorkerFixtures {
  role: RoleType;
}

export const test = baseTest.extend<AuthFixtures, AuthWorkerFixtures>({
  role: [RoleType.User, { scope: "worker" }],

  authenticatedPage: async ({ browser, role }, use) => {
    const authManager = AuthManager.getInstance();
    const isAuth = await authManager.isAuthenticated(role);

    if (!isAuth) {
      await use(await browser.newPage());
      return;
    }

    const storageState = await authManager.getStorageState(role);
    const context = await browser.newContext({ storageState });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  authManager: async ({}, use) => {
    await use(AuthManager.getInstance());
  },
});

export const userTest = test.extend<AuthFixtures, AuthWorkerFixtures>({
  role: [RoleType.User, { scope: "worker" }],
});

export { expect } from "@playwright/test";
