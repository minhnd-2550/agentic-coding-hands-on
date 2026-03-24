import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardKudosSection } from "@/components/awards/AwardKudosSection";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  default: ({ fill: _f, priority: _p, ...rest }: Record<string, unknown>) =>
    <img {...rest} />,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("AwardKudosSection", () => {
  it("renders 'Phong trào ghi nhận' label", () => {
    render(<AwardKudosSection />);
    expect(screen.getByText("Phong trào ghi nhận")).toBeInTheDocument();
  });

  it("renders 'Sun* Kudos' title with gold color", () => {
    render(<AwardKudosSection />);
    const title = screen.getByText("Sun* Kudos");
    expect(title).toBeInTheDocument();
    expect(title.className).toContain("text-[#FFEA9E]");
  });

  it("renders CTA button 'Chi tiết' linking to kudos page", () => {
    render(<AwardKudosSection />);
    const link = screen.getByText("Chi tiết").closest("a");
    expect(link).toHaveAttribute("href", "/kudos");
  });

  it("CTA button has gold background and dark text", () => {
    render(<AwardKudosSection />);
    const link = screen.getByText("Chi tiết").closest("a");
    expect(link?.className).toContain("bg-[#FFEA9E]");
    expect(link?.className).toContain("text-[#00101A]");
  });

  it("renders description text", () => {
    render(<AwardKudosSection />);
    expect(screen.getByText(/ĐIỂM MỚI CỦA SAA 2025/)).toBeInTheDocument();
  });
});
