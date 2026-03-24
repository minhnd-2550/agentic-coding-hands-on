import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardHero } from "@/components/awards/AwardHero";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

describe("AwardHero", () => {
  it("renders a background image element", () => {
    const { container } = render(<AwardHero />);
    const bgImage = container.querySelector('img[src="/images/hero-bg.png"]');
    expect(bgImage).toBeInTheDocument();
  });

  it("renders 'ROOT FURTHER' image", () => {
    render(<AwardHero />);
    const logo = screen.getByAltText("ROOT FURTHER");
    expect(logo).toBeInTheDocument();
  });

  it("has gradient overlay element", () => {
    render(<AwardHero />);
    const overlay = document.querySelector("[data-testid='gradient-overlay']");
    expect(overlay).toBeInTheDocument();
  });
});
