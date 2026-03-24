import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

// Mock i18n
vi.mock("@/libs/i18n/context", () => ({
  useI18n: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "footer.copyright": "Bản quyền thuộc về Sun* © 2025",
      };
      return map[key] || key;
    },
  }),
}));

// Mock NavLink
vi.mock("@/components/layout/NavLink", () => ({
  NavLink: ({ label, href }: { label: string; href: string }) => (
    <a href={href} data-testid={`navlink-${label}`}>
      {label}
    </a>
  ),
}));

// Mock Logo
vi.mock("@/components/layout/Logo", () => ({
  Logo: () => <div data-testid="logo">Logo</div>,
}));

describe("Footer", () => {
  describe('variant="minimal"', () => {
    it("renders copyright text only", () => {
      render(<Footer variant="minimal" />);
      expect(screen.getByText("Bản quyền thuộc về Sun* © 2025")).toBeInTheDocument();
    });

    it("does not render nav links", () => {
      render(<Footer variant="minimal" />);
      expect(screen.queryByTestId("navlink-About SAA 2025")).not.toBeInTheDocument();
    });

    it("does not render logo", () => {
      render(<Footer variant="minimal" />);
      expect(screen.queryByTestId("logo")).not.toBeInTheDocument();
    });
  });

  describe('variant="full"', () => {
    it("renders logo, 4 nav links, and copyright", () => {
      render(<Footer variant="full" />);
      expect(screen.getByTestId("logo")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-About SAA 2025")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-Award Information")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-Sun* Kudos")).toBeInTheDocument();
      expect(screen.getByTestId("navlink-Tiêu chuẩn chung")).toBeInTheDocument();
      expect(screen.getByText("Bản quyền thuộc về Sun* © 2025")).toBeInTheDocument();
    });

    it("renders 4 nav links with correct hrefs", () => {
      render(<Footer variant="full" />);
      expect(screen.getByTestId("navlink-About SAA 2025")).toHaveAttribute("href", "/");
      expect(screen.getByTestId("navlink-Award Information")).toHaveAttribute("href", "/award-information");
      expect(screen.getByTestId("navlink-Sun* Kudos")).toHaveAttribute("href", "/kudos");
      expect(screen.getByTestId("navlink-Tiêu chuẩn chung")).toHaveAttribute("href", "/tieu-chuan-chung");
    });
  });

  describe("default variant", () => {
    it("defaults to minimal when no variant specified", () => {
      render(<Footer />);
      expect(screen.getByText("Bản quyền thuộc về Sun* © 2025")).toBeInTheDocument();
      expect(screen.queryByTestId("navlink-About SAA 2025")).not.toBeInTheDocument();
    });
  });
});
