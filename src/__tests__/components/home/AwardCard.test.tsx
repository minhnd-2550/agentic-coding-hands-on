import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardCard } from "@/components/home/AwardCard";
import type { AwardCategory } from "@/types/event";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockAward: AwardCategory = {
  id: "1",
  name: "Top Talent",
  slug: "top-talent",
  short_description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
  thumbnail_url: "/images/award-top-talent.png",
  display_order: 1,
  created_at: "2025-01-01",
};

describe("AwardCard", () => {
  it("renders award name and description", () => {
    render(<AwardCard award={mockAward} />);
    expect(screen.getByText("Top Talent")).toBeInTheDocument();
    expect(screen.getByText("Vinh danh top cá nhân xuất sắc trên mọi phương diện")).toBeInTheDocument();
  });

  it("renders thumbnail image", () => {
    render(<AwardCard award={mockAward} />);
    const img = screen.getByAltText("Top Talent");
    expect(img).toBeInTheDocument();
  });

  it("renders 'Chi tiết' link text", () => {
    render(<AwardCard award={mockAward} />);
    expect(screen.getByText("Chi tiết")).toBeInTheDocument();
  });

  it("links to award information page with correct hash", () => {
    render(<AwardCard award={mockAward} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/award-information#top-talent");
  });

  it("applies line-clamp-2 to description", () => {
    render(<AwardCard award={mockAward} />);
    const desc = screen.getByText("Vinh danh top cá nhân xuất sắc trên mọi phương diện");
    expect(desc.className).toContain("line-clamp-2");
  });
});
