import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "../../../base-page";
import { ROUTES } from "../../../constants/routes";
import { selectors } from "../../../locales/vn/selectors";

const sel = selectors.awardInformation.awardInformation;

export class AwardInformationPage extends BasePage {
  constructor(page: Page) {
    super(page, ROUTES.AWARD_INFORMATION);
  }

  get pageTitle(): Locator {
    return this.getByText(sel.pageTitle.text);
  }

  get navigation(): Locator {
    return this.getByRole("navigation", { name: sel.navigation.label });
  }

  get heroImage(): Locator {
    return this.getByAltText(sel.heroImage.alt);
  }

  get kudosTitle(): Locator {
    return this.getByText(sel.kudosSection.title.text);
  }

  get kudosDescription(): Locator {
    return this.getByText(sel.kudosSection.description.text);
  }

  get kudosCtaLink(): Locator {
    return this.page
      .locator("section")
      .filter({ hasText: sel.kudosSection.title.text })
      .getByRole("link", { name: new RegExp(sel.kudosSection.ctaLink.name) });
  }

  getCategoryText(category: keyof typeof sel.categories): Locator {
    return this.getByText(sel.categories[category].text);
  }

  getNavButton(text: string): Locator {
    return this.navigation.getByText(text);
  }

  getSection(sectionId: string): Locator {
    return this.locator(`#${sectionId}`);
  }

  async clickCategory(text: string): Promise<void> {
    await this.getNavButton(text).click();
  }

  async gotoWithHash(hash: string): Promise<void> {
    await this.page.goto(`${ROUTES.AWARD_INFORMATION}#${hash}`);
  }
}
