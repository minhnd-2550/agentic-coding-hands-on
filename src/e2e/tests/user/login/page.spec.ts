import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/common/login";
import { data as vnData } from "../../../locales/vn/data";
import { data as enData } from "../../../locales/en/data";
import { data as jpData } from "../../../locales/jp/data";

test.describe("Login Screen", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("renders login page with key elements", async () => {
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.heroImage).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.copyright).toBeVisible();
    await expect(
      loginPage.getTextOnPage(vnData.common.languageOptions.vn)
    ).toBeVisible();
  });

  test("login button has correct text", async () => {
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toHaveText(
      new RegExp(vnData.login.loginButton)
    );
  });

  test.describe("Language Switching", () => {
    test("displays Vietnamese hero text by default", async () => {
      await expect(
        loginPage.getTextOnPage(vnData.login.heroText)
      ).toBeVisible();
    });

    test("switches to English", async () => {
      await loginPage.selectLanguage(vnData.common.languageOptions.en);

      await expect(
        loginPage.getTextOnPage(enData.login.heroText)
      ).toBeVisible();
      await expect(
        loginPage.getTextOnPage(enData.login.copyright)
      ).toBeVisible();
    });

    test("switches to Japanese", async () => {
      await loginPage.selectLanguage(vnData.common.languageOptions.jp);

      await expect(
        loginPage.getTextOnPage(jpData.login.heroText)
      ).toBeVisible();
    });

    test("persists language after reload", async () => {
      await loginPage.selectLanguage(vnData.common.languageOptions.en);
      await loginPage.reload();

      await expect(
        loginPage.getTextOnPage(enData.login.heroText)
      ).toBeVisible();
    });
  });

  test.describe("Error Toast Scenarios", () => {
    test("shows domain_restricted error toast", async () => {
      await loginPage.gotoWithError("domain_restricted");
      await expect(
        loginPage.getTextOnPage(vnData.login.errors.domainRestricted)
      ).toBeVisible();
    });

    test("shows auth_cancelled error toast", async () => {
      await loginPage.gotoWithError("auth_cancelled");
      await expect(
        loginPage.getTextOnPage(vnData.login.errors.authCancelled)
      ).toBeVisible();
    });

    test("shows auth_failed error toast", async () => {
      await loginPage.gotoWithError("auth_failed");
      await expect(
        loginPage.getTextOnPage(vnData.login.errors.authFailed)
      ).toBeVisible();
    });

    test("shows rate_limited error toast", async () => {
      await loginPage.gotoWithError("rate_limited");
      await expect(
        loginPage.getTextOnPage(vnData.login.errors.rateLimited)
      ).toBeVisible();
    });
  });

  test.describe("Responsive", () => {
    test("mobile layout (320px)", async () => {
      await loginPage.setViewport(320, 568);
      await loginPage.goto();
      await expect(loginPage.loginButton).toBeVisible();
    });

    test("tablet layout (768px)", async () => {
      await loginPage.setViewport(768, 1024);
      await loginPage.goto();
      await expect(loginPage.loginButton).toBeVisible();
    });

    test("desktop layout (1024px)", async () => {
      await loginPage.setViewport(1024, 768);
      await loginPage.goto();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("keyboard navigation works", async () => {
      await loginPage.openLanguageSelector();
      await expect(loginPage.languageListbox).toBeVisible();

      await loginPage.pressKey("Escape");
      await expect(loginPage.languageListbox).not.toBeVisible();
    });

    test("login button has aria-label", async () => {
      await expect(loginPage.loginButton).toBeVisible();
    });

    test("toast has role=alert", async () => {
      await loginPage.gotoWithError("auth_failed");
      await expect(loginPage.getAlertToast()).toBeVisible();
    });
  });
});
