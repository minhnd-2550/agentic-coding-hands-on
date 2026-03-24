import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";

const mockSignOut = vi.fn().mockResolvedValue({ error: null });
vi.mock("@/libs/supabase/client", () => ({
  createClient: () => ({
    auth: { signOut: mockSignOut },
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ProfileDropdown", () => {
  it("renders avatar button", () => {
    render(<ProfileDropdown />);
    expect(screen.getByLabelText("Account menu")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<ProfileDropdown />);
    fireEvent.click(screen.getByLabelText("Account menu"));
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it("closes dropdown on Escape", () => {
    render(<ProfileDropdown />);
    fireEvent.click(screen.getByLabelText("Account menu"));
    expect(screen.getByText("Profile")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("shows Admin Dashboard for admin users", () => {
    render(<ProfileDropdown isAdmin />);
    fireEvent.click(screen.getByLabelText("Account menu"));
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  it("hides Admin Dashboard for non-admin users", () => {
    render(<ProfileDropdown />);
    fireEvent.click(screen.getByLabelText("Account menu"));
    expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
  });

  it("calls signOut when Sign out is clicked", async () => {
    render(<ProfileDropdown />);
    fireEvent.click(screen.getByLabelText("Account menu"));
    fireEvent.click(screen.getByText("Sign out"));
    expect(mockSignOut).toHaveBeenCalled();
  });
});
