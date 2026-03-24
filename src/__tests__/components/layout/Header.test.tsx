import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock child components
vi.mock("@/components/layout/Logo", () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));
vi.mock("@/components/ui/LanguageSelector", () => ({
  LanguageSelector: () => <div data-testid="language-selector">Lang</div>,
}));
vi.mock("@/components/layout/NavLink", () => ({
  NavLink: ({ label, href }: { label: string; href: string }) => (
    <a href={href} data-testid={`navlink-${label}`}>
      {label}
    </a>
  ),
}));
vi.mock("@/components/layout/NotificationPanel", () => ({
  NotificationPanel: () => (
    <button aria-label="Notifications" data-testid="notification-panel">Bell</button>
  ),
}));
vi.mock("@/components/layout/ProfileDropdown", () => ({
  ProfileDropdown: () => (
    <button aria-label="Account menu" data-testid="profile-dropdown">Profile</button>
  ),
}));

describe("Header", () => {
  describe('variant="minimal"', () => {
    it("renders logo and language selector only", () => {
      render(<Header variant="minimal" />);
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.getByTestId("language-selector")).toBeInTheDocument();
    });

    it("does not render nav links", () => {
      render(<Header variant="minimal" />);
      expect(screen.queryByTestId("navlink-About SAA 2025")).not.toBeInTheDocument();
    });

    it("does not render notification or profile buttons", () => {
      render(<Header variant="minimal" />);
      expect(screen.queryByLabelText("Notifications")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Account menu")).not.toBeInTheDocument();
    });
  });

  describe('variant="full"', () => {
    it("renders logo, nav links, and controls", () => {
      render(<Header variant="full" />);
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-About SAA 2025")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-Award Information")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-Sun* Kudos")).toBeInTheDocument();
      expect(screen.getByTestId("language-selector")).toBeInTheDocument();
    });

    it("renders notification bell button", () => {
      render(<Header variant="full" />);
      expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
    });

    it("renders profile/account button", () => {
      render(<Header variant="full" />);
      expect(screen.getByLabelText("Account menu")).toBeInTheDocument();
    });

    it("renders 3 navigation links with correct hrefs", () => {
      render(<Header variant="full" />);
      expect(screen.getByTestId("navlink-About SAA 2025")).toHaveAttribute("href", "/");
      expect(screen.getByTestId("navlink-Award Information")).toHaveAttribute("href", "/award-information");
      expect(screen.getByTestId("navlink-Sun* Kudos")).toHaveAttribute("href", "/kudos");
    });
  });

  describe("default variant", () => {
    it("defaults to minimal when no variant specified", () => {
      render(<Header />);
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.queryByTestId("navlink-About SAA 2025")).not.toBeInTheDocument();
    });
  });
});
