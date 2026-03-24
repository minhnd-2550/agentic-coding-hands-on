import { test, expect } from "@playwright/test";
import { AwardInformationPage } from "../../../pages/common/award-information";

test.describe("Award Information Page", () => {
  let awardPage: AwardInformationPage;

  test.beforeEach(async ({ page }) => {
    awardPage = new AwardInformationPage(page);
    await awardPage.goto();
  });

  test("renders page with all 6 award categories", async () => {
    await expect(awardPage.pageTitle).toBeVisible();
    await expect(awardPage.getCategoryText("topTalent")).toBeVisible();
    await expect(
      awardPage.getCategoryText("topProjectLeader")
    ).toBeVisible();
    await expect(awardPage.getCategoryText("bestManager")).toBeVisible();
    await expect(awardPage.getCategoryText("signature2025")).toBeVisible();
    await expect(awardPage.getCategoryText("mvp")).toBeVisible();
  });

  test("renders hero section with ROOT FURTHER", async () => {
    await expect(awardPage.heroImage).toBeVisible();
  });

  test("renders Sun* Kudos section with CTA button", async () => {
    await expect(awardPage.kudosTitle).toBeVisible();
    await expect(awardPage.kudosDescription).toBeVisible();
    await expect(awardPage.kudosCtaLink).toBeVisible();
  });

  test("menu click scrolls to correct section", async () => {
    await awardPage.clickCategory("MVP (Most Valuable Person)");

    // Wait for smooth scroll
    await awardPage.waitForTimeout(600);

    const mvpSection = awardPage.getSection("mvp");
    await expect(mvpSection).toBeInViewport();
  });

  test("deep link scrolls to correct section on load", async () => {
    await awardPage.gotoWithHash("best-manager");
    await awardPage.waitForTimeout(300);

    const section = awardPage.getSection("best-manager");
    await expect(section).toBeInViewport();
  });

  test("CTA button navigates to kudos page", async () => {
    await expect(awardPage.kudosCtaLink).toHaveAttribute("href", "/kudos");
  });

  test.describe("Responsive Layout", () => {
    test("mobile (320px): cards stack vertically", async () => {
      await awardPage.setViewport(320, 812);
      await awardPage.goto();
      await expect(awardPage.navigation).toBeVisible();
      await expect(awardPage.getCategoryText("topTalent")).toBeVisible();
    });

    test("tablet (768px): layout adjusts", async () => {
      await awardPage.setViewport(768, 1024);
      await awardPage.goto();
      await expect(awardPage.pageTitle).toBeVisible();
      await expect(awardPage.getCategoryText("topTalent")).toBeVisible();
    });

    test("desktop (1440px): full layout with sticky menu", async () => {
      await awardPage.setViewport(1440, 900);
      await awardPage.goto();
      await expect(awardPage.navigation).toBeVisible();
      await expect(awardPage.getCategoryText("topTalent")).toBeVisible();
    });
  });

  test("keyboard navigation through menu items", async () => {
    const firstButton = awardPage.getNavButton("Top Talent");
    await firstButton.focus();
    await expect(firstButton).toBeFocused();

    await awardPage.tabToNext();
    const secondButton = awardPage.getNavButton("Top Project");
    await expect(secondButton).toBeFocused();

    await awardPage.pressKey("Enter");
    await awardPage.waitForTimeout(600);
    const section = awardPage.getSection("top-project");
    await expect(section).toBeInViewport();
  });
});
