import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { LoginButton } from "@/components/login/LoginButton";

// Mock Supabase client
const mockSignInWithOAuth = vi.fn().mockResolvedValue({ data: {}, error: null });
vi.mock("@/libs/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  }),
}));

// Mock i18n
vi.mock("@/libs/i18n/context", () => ({
  useI18n: () => ({
    locale: "vn",
    setLocale: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        "login.button": "LOGIN With Google",
        "login.error.domain_restricted":
          "Chỉ tài khoản @sun-asterisk.com được phép đăng nhập.",
        "login.error.auth_cancelled":
          "Đăng nhập đã bị hủy. Vui lòng thử lại.",
        "login.error.auth_failed":
          "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
        "login.error.rate_limited":
          "Tài khoản tạm thời bị khóa. Vui lòng thử lại sau.",
      };
      return map[key] ?? key;
    },
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement("img", {
      ...props,
      src: props.src as string,
      alt: props.alt as string,
    }),
}));

describe("LoginButton", () => {
  beforeEach(() => {
    mockSignInWithOAuth.mockClear();
  });

  it("renders login button text", () => {
    render(<LoginButton />);
    expect(screen.getByText("LOGIN With Google")).toBeInTheDocument();
  });

  it("renders Google icon", () => {
    render(<LoginButton />);
    expect(screen.getByAltText("Google")).toBeInTheDocument();
  });

  it("has aria-label", () => {
    render(<LoginButton />);
    expect(screen.getByLabelText("Login with Google")).toBeInTheDocument();
  });

  it("calls signInWithOAuth with correct params on click", async () => {
    render(<LoginButton />);
    fireEvent.click(screen.getByLabelText("Login with Google"));
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: expect.stringContaining("/auth/callback"),
        queryParams: { hd: "sun-asterisk.com" },
      },
    });
  });

  it("disables button after click (double-click prevention)", () => {
    render(<LoginButton />);
    const button = screen.getByLabelText("Login with Google");
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when loading", () => {
    render(<LoginButton />);
    fireEvent.click(screen.getByLabelText("Login with Google"));
    // Button text should be replaced with spinner
    expect(screen.queryByText("LOGIN With Google")).not.toBeInTheDocument();
  });

  // T042: Error→toast mapping for all 4 error types
  it("shows domain_restricted toast when errorType prop is set", () => {
    render(<LoginButton errorType="domain_restricted" />);
    expect(
      screen.getByText(
        "Chỉ tài khoản @sun-asterisk.com được phép đăng nhập."
      )
    ).toBeInTheDocument();
  });

  it("shows auth_cancelled toast when errorType prop is set", () => {
    render(<LoginButton errorType="auth_cancelled" />);
    expect(
      screen.getByText("Đăng nhập đã bị hủy. Vui lòng thử lại.")
    ).toBeInTheDocument();
  });

  it("shows auth_failed toast when errorType prop is set", () => {
    render(<LoginButton errorType="auth_failed" />);
    expect(
      screen.getByText("Đã có lỗi xảy ra. Vui lòng thử lại sau.")
    ).toBeInTheDocument();
  });

  it("shows rate_limited toast when errorType prop is set", () => {
    render(<LoginButton errorType="rate_limited" />);
    expect(
      screen.getByText(
        "Tài khoản tạm thời bị khóa. Vui lòng thử lại sau."
      )
    ).toBeInTheDocument();
  });

  it("has responsive width classes", () => {
    render(<LoginButton />);
    const button = screen.getByLabelText("Login with Google");
    expect(button.className).toContain("w-full");
    expect(button.className).toContain("lg:w-[305px]");
  });
});
