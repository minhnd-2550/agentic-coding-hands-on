import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";

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

const mockOpenModal = vi.fn();
vi.mock("@/components/kudos/write/WriteKudosProvider", () => ({
  useWriteKudosContext: () => ({
    isModalOpen: false,
    openModal: mockOpenModal,
    closeModal: vi.fn(),
  }),
}));

describe("FloatingActionButton", () => {
  it("renders closed state by default", () => {
    render(<FloatingActionButton />);
    expect(screen.getByLabelText("Quick actions")).toBeInTheDocument();
    expect(screen.queryByText("Thể lệ")).not.toBeInTheDocument();
  });

  it("opens expanded menu on click", () => {
    render(<FloatingActionButton />);
    fireEvent.click(screen.getByLabelText("Quick actions"));
    expect(screen.getByText("Thể lệ")).toBeInTheDocument();
    expect(screen.getByText("Viết KUDOS")).toBeInTheDocument();
  });

  it("closes menu when X button is clicked", () => {
    render(<FloatingActionButton />);
    fireEvent.click(screen.getByLabelText("Quick actions"));
    expect(screen.getByText("Thể lệ")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close menu"));
    expect(screen.queryByText("Thể lệ")).not.toBeInTheDocument();
  });

  it("has correct navigation links and triggers in expanded state", () => {
    render(<FloatingActionButton />);
    fireEvent.click(screen.getByLabelText("Quick actions"));

    const rulesLink = screen.getByText("Thể lệ").closest("a");
    expect(rulesLink).toHaveAttribute("href", "/tieu-chuan-chung");

    // "Viết KUDOS" is now a button that opens the write kudos modal
    const kudosButton = screen.getByText("Viết KUDOS").closest("button");
    expect(kudosButton).toBeInTheDocument();
    fireEvent.click(kudosButton!);
    expect(mockOpenModal).toHaveBeenCalled();
  });
});
