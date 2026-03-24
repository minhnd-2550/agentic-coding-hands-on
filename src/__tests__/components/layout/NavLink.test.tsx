import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavLink } from "@/components/layout/NavLink";

// Mock next/navigation
const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("NavLink", () => {
  it("renders link with correct text and href", () => {
    render(<NavLink href="/award-information" label="Award Information" />);
    const link = screen.getByRole("link", { name: "Award Information" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/award-information");
  });

  it("shows active state when pathname matches href", () => {
    mockPathname.mockReturnValue("/award-information");
    render(<NavLink href="/award-information" label="Award Information" />);
    const link = screen.getByRole("link", { name: "Award Information" });
    expect(link).toHaveAttribute("data-active", "true");
  });

  it("shows normal state when pathname does not match href", () => {
    mockPathname.mockReturnValue("/kudos");
    render(<NavLink href="/award-information" label="Award Information" />);
    const link = screen.getByRole("link", { name: "Award Information" });
    expect(link).toHaveAttribute("data-active", "false");
  });

  it("treats root path '/' as active for About SAA 2025 link", () => {
    mockPathname.mockReturnValue("/");
    render(<NavLink href="/" label="About SAA 2025" />);
    const link = screen.getByRole("link", { name: "About SAA 2025" });
    expect(link).toHaveAttribute("data-active", "true");
  });
});
