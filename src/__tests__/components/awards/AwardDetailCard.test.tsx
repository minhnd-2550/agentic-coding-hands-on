import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardDetailCard } from "@/components/awards/AwardDetailCard";
import type { AwardCategoryDetail } from "@/types/award";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ fill: _f, priority: _p, ...rest }: Record<string, unknown>) =>
    <img {...rest} />,
}));

const mockAward: AwardCategoryDetail = {
  id: "1",
  name: "Top Talent",
  slug: "top-talent",
  description: "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc.",
  quantity: 10,
  unit: "Đơn vị",
  prizes: [{ value: "7.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
  image: "/images/award-top-talent.png",
  order: 1,
};

const signatureAward: AwardCategoryDetail = {
  id: "5",
  name: "Signature 2025 - Creator",
  slug: "signature-2025-creator",
  description: "Giải thưởng Signature vinh danh Creator.",
  quantity: 1,
  unit: "Cá nhân",
  prizes: [
    { value: "5.000.000 VNĐ", note: "cho giải cá nhân" },
    { value: "8.000.000 VNĐ", note: "cho giải tập thể" },
  ],
  image: "/images/award-signature-creator.png",
  order: 5,
};

describe("AwardDetailCard", () => {
  it("renders award name as title", () => {
    render(<AwardDetailCard award={mockAward} reversed={false} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
  });

  it("renders award description", () => {
    render(<AwardDetailCard award={mockAward} reversed={false} />);
    expect(screen.getByText(mockAward.description)).toBeInTheDocument();
  });

  it("renders quantity label and value", () => {
    render(<AwardDetailCard award={mockAward} reversed={false} />);
    expect(screen.getByText("Số lượng giải thưởng:")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Đơn vị")).toBeInTheDocument();
  });

  it("renders prize value label and amount", () => {
    render(<AwardDetailCard award={mockAward} reversed={false} />);
    expect(screen.getByText("Giá trị giải thưởng:")).toBeInTheDocument();
    expect(screen.getByText("7.000.000 VNĐ")).toBeInTheDocument();
    expect(screen.getByText("cho mỗi giải thưởng")).toBeInTheDocument();
  });

  it("renders award image with correct alt text", () => {
    render(<AwardDetailCard award={mockAward} reversed={false} />);
    const img = screen.getByAltText("Biểu tượng giải Top Talent");
    expect(img).toBeInTheDocument();
  });

  it("applies flex-row-reverse when reversed is true", () => {
    const { container } = render(
      <AwardDetailCard award={mockAward} reversed={true} />
    );
    const contentRow = container.querySelector("[data-testid='card-content-row']");
    expect(contentRow?.className).toContain("flex-row-reverse");
  });

  it("applies flex-row when reversed is false", () => {
    const { container } = render(
      <AwardDetailCard award={mockAward} reversed={false} />
    );
    const contentRow = container.querySelector("[data-testid='card-content-row']");
    expect(contentRow?.className).toContain("flex-row");
    expect(contentRow?.className).not.toContain("flex-row-reverse");
  });

  it("renders multiple prize rows for Signature variant", () => {
    render(<AwardDetailCard award={signatureAward} reversed={false} />);
    expect(screen.getByText("5.000.000 VNĐ")).toBeInTheDocument();
    expect(screen.getByText("cho giải cá nhân")).toBeInTheDocument();
    expect(screen.getByText("8.000.000 VNĐ")).toBeInTheDocument();
    expect(screen.getByText("cho giải tập thể")).toBeInTheDocument();
  });

  it("has correct id attribute for scroll targeting", () => {
    const { container } = render(
      <AwardDetailCard award={mockAward} reversed={false} />
    );
    expect(container.firstChild).toHaveAttribute("id", "top-talent");
  });
});
