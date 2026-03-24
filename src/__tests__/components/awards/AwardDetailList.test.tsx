import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardDetailList } from "@/components/awards/AwardDetailList";
import { AWARD_CATEGORIES } from "@/components/awards/data";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ fill: _f, priority: _p, ...rest }: Record<string, unknown>) =>
    <img {...rest} />,
}));

describe("AwardDetailList", () => {
  it("renders all 6 award cards", () => {
    render(<AwardDetailList awards={AWARD_CATEGORIES} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
    expect(screen.getByText("Top Project")).toBeInTheDocument();
    expect(screen.getByText("Top Project Leader")).toBeInTheDocument();
    expect(screen.getByText("Best Manager")).toBeInTheDocument();
    expect(screen.getByText("Signature 2025 - Creator")).toBeInTheDocument();
    expect(screen.getByText("MVP (Most Valuable Person)")).toBeInTheDocument();
  });

  it("applies alternating reversed layout — odd cards normal, even cards reversed", () => {
    const { container } = render(
      <AwardDetailList awards={AWARD_CATEGORIES} />
    );
    const contentRows = container.querySelectorAll(
      "[data-testid='card-content-row']"
    );
    // Index 0 (Top Talent) = not reversed
    expect(contentRows[0]?.className).toContain("lg:flex-row");
    expect(contentRows[0]?.className).not.toContain("lg:flex-row-reverse");
    // Index 1 (Top Project) = reversed
    expect(contentRows[1]?.className).toContain("lg:flex-row-reverse");
    // Index 2 (Top PL) = not reversed
    expect(contentRows[2]?.className).not.toContain("lg:flex-row-reverse");
  });

  it("renders dividers between cards", () => {
    const { container } = render(
      <AwardDetailList awards={AWARD_CATEGORIES} />
    );
    const dividers = container.querySelectorAll("[data-testid='card-divider']");
    expect(dividers.length).toBe(5); // 6 cards - 1 = 5 dividers
  });

  it("each card has id matching slug for scroll targeting", () => {
    const { container } = render(
      <AwardDetailList awards={AWARD_CATEGORIES} />
    );
    expect(container.querySelector("#top-talent")).toBeInTheDocument();
    expect(container.querySelector("#top-project")).toBeInTheDocument();
    expect(container.querySelector("#mvp")).toBeInTheDocument();
  });
});
