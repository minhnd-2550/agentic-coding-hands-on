import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AwardMenu } from "@/components/awards/AwardMenu";
import { AWARD_CATEGORIES } from "@/components/awards/data";

describe("AwardMenu", () => {
  const mockOnItemClick = vi.fn();

  beforeEach(() => {
    mockOnItemClick.mockClear();
  });

  it("renders all 6 menu items", () => {
    render(
      <AwardMenu
        awards={AWARD_CATEGORIES}
        activeSlug="top-talent"
        onItemClick={mockOnItemClick}
      />
    );
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
    expect(screen.getByText("Top Project")).toBeInTheDocument();
    expect(screen.getByText("Top Project Leader")).toBeInTheDocument();
    expect(screen.getByText("Best Manager")).toBeInTheDocument();
    expect(screen.getByText("Signature 2025 Creator")).toBeInTheDocument();
    expect(screen.getByText("MVP")).toBeInTheDocument();
  });

  it("active item has gold color styling", () => {
    render(
      <AwardMenu
        awards={AWARD_CATEGORIES}
        activeSlug="top-talent"
        onItemClick={mockOnItemClick}
      />
    );
    const activeButton = screen.getByText("Top Talent");
    expect(activeButton.className).toContain("text-[#FFEA9E]");
    expect(activeButton.className).toContain("border-[#FFEA9E]");
  });

  it("active item has aria-current=true", () => {
    render(
      <AwardMenu
        awards={AWARD_CATEGORIES}
        activeSlug="top-talent"
        onItemClick={mockOnItemClick}
      />
    );
    const activeButton = screen.getByText("Top Talent");
    expect(activeButton).toHaveAttribute("aria-current", "true");
  });

  it("non-active items do not have aria-current", () => {
    render(
      <AwardMenu
        awards={AWARD_CATEGORIES}
        activeSlug="top-talent"
        onItemClick={mockOnItemClick}
      />
    );
    const inactiveButton = screen.getByText("Top Project");
    expect(inactiveButton).not.toHaveAttribute("aria-current");
  });

  it("click fires onItemClick with correct slug", () => {
    render(
      <AwardMenu
        awards={AWARD_CATEGORIES}
        activeSlug="top-talent"
        onItemClick={mockOnItemClick}
      />
    );
    fireEvent.click(screen.getByText("MVP"));
    expect(mockOnItemClick).toHaveBeenCalledWith("mvp");
  });

  it("renders within a nav element with aria-label", () => {
    const { container } = render(
      <AwardMenu
        awards={AWARD_CATEGORIES}
        activeSlug="top-talent"
        onItemClick={mockOnItemClick}
      />
    );
    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("aria-label", "Danh mục giải thưởng");
  });
});
