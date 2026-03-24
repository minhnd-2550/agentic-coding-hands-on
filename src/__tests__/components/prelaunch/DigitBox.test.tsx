import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DigitBox } from "@/components/prelaunch/DigitBox";

describe("DigitBox", () => {
  it("renders the digit", () => {
    render(<DigitBox digit="5" />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders with aria-label", () => {
    render(<DigitBox digit="3" />);
    expect(screen.getByLabelText("digit 3")).toBeInTheDocument();
  });

  it("applies Digital Numbers font class", () => {
    render(<DigitBox digit="0" />);
    const span = screen.getByText("0");
    expect(span.className).toContain("font-[family-name:var(--font-digital-numbers)]");
  });
});
