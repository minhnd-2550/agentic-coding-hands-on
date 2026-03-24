import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardPageTitle } from "@/components/awards/AwardPageTitle";

describe("AwardPageTitle", () => {
  it("renders subtitle 'Sun* Annual Awards 2025'", () => {
    render(<AwardPageTitle />);
    expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
  });

  it("renders main title 'Hệ thống giải thưởng SAA 2025'", () => {
    render(<AwardPageTitle />);
    expect(
      screen.getByText("Hệ thống giải thưởng SAA 2025")
    ).toBeInTheDocument();
  });

  it("main title has gold color class", () => {
    render(<AwardPageTitle />);
    const mainTitle = screen.getByText("Hệ thống giải thưởng SAA 2025");
    expect(mainTitle.className).toContain("text-[#FFEA9E]");
  });

  it("renders a divider element", () => {
    render(<AwardPageTitle />);
    const divider = document.querySelector("[data-testid='divider']");
    expect(divider).toBeInTheDocument();
  });
});
