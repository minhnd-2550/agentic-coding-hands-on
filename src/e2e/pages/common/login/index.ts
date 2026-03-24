import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "../../../base-page";
import { ROUTES } from "../../../constants/routes";
import { selectors } from "../../../locales/vn/selectors";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, ROUTES.LOGIN);
  }

  get logo(): Locator {
    return this.getByAltText(selectors.login.login.logo.alt);
  }

  get heroImage(): Locator {
    return this.getByAltText(selectors.login.login.heroImage.alt);
  }

  get loginButton(): Locator {
    return this.getByLabel(selectors.login.login.loginButton.label);
  }

  get languageSelector(): Locator {
    return this.locator(selectors.login.login.languageSelector.loc).first();
  }

  get copyright(): Locator {
    return this.getByText(selectors.login.login.copyright.text);
  }

  get languageListbox(): Locator {
    return this.getByRole("listbox");
  }

  async openLanguageSelector(): Promise<void> {
    await this.languageSelector.click();
  }

  async selectLanguage(lang: string): Promise<void> {
    await this.openLanguageSelector();
    await this.getByRole("option", { name: new RegExp(lang) }).click();
  }

  async gotoWithError(errorCode: string): Promise<void> {
    await this.gotoWithParams(`?error=${errorCode}`);
  }

  getAlertToast(): Locator {
    return this.locator('[role="alert"]:not(#__next-route-announcer__)');
  }

  getTextOnPage(text: string): Locator {
    return this.getByText(text);
  }
}
