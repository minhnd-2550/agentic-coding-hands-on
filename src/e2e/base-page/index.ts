import { type Page, type Locator } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly route: string;

  constructor(page: Page, route: string) {
    this.page = page;
    this.route = route;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.route);
  }

  async gotoWithParams(params: string): Promise<void> {
    await this.page.goto(`${this.route}${params}`);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async setViewport(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async tabToNext(): Promise<void> {
    await this.page.keyboard.press("Tab");
  }

  async waitForTimeout(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  protected getByText(text: string): Locator {
    return this.page.getByText(text);
  }

  protected getByRole(
    role: Parameters<Page["getByRole"]>[0],
    options?: Parameters<Page["getByRole"]>[1]
  ): Locator {
    return this.page.getByRole(role, options);
  }

  protected getByAltText(text: string): Locator {
    return this.page.getByAltText(text);
  }

  protected getByLabel(text: string): Locator {
    return this.page.getByLabel(text);
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
