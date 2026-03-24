import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NotificationPanel } from "@/components/layout/NotificationPanel";

vi.mock("@/hooks/useNotifications", () => ({
  useNotifications: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

import { useNotifications } from "@/hooks/useNotifications";
const mockUseNotifications = vi.mocked(useNotifications);

const defaultMock = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: false,
  hasMore: false,
  loadMore: vi.fn(),
  markAsRead: vi.fn(),
};

describe("NotificationPanel", () => {
  it("renders bell icon button", () => {
    mockUseNotifications.mockReturnValue(defaultMock);
    render(<NotificationPanel />);
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
  });

  it("shows red badge when unread > 0", () => {
    mockUseNotifications.mockReturnValue({ ...defaultMock, unreadCount: 3 });
    render(<NotificationPanel />);
    expect(screen.getByTestId("notification-badge")).toBeInTheDocument();
  });

  it("hides badge when unread = 0", () => {
    mockUseNotifications.mockReturnValue(defaultMock);
    render(<NotificationPanel />);
    expect(screen.queryByTestId("notification-badge")).not.toBeInTheDocument();
  });

  it("opens dropdown panel on click", () => {
    mockUseNotifications.mockReturnValue({
      ...defaultMock,
      notifications: [
        { id: "1", user_id: "u1", title: "Test Notification", body: "Body text", read: false, created_at: "2025-12-25T10:00:00Z" },
      ],
      unreadCount: 1,
    });
    render(<NotificationPanel />);
    fireEvent.click(screen.getByLabelText("Notifications"));
    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });

  it("shows empty state when no notifications", () => {
    mockUseNotifications.mockReturnValue(defaultMock);
    render(<NotificationPanel />);
    fireEvent.click(screen.getByLabelText("Notifications"));
    expect(screen.getByText(/không có thông báo/i)).toBeInTheDocument();
  });

  it("shows 'Xem tất cả' link", () => {
    mockUseNotifications.mockReturnValue({
      ...defaultMock,
      notifications: [
        { id: "1", user_id: "u1", title: "N1", body: null, read: false, created_at: "2025-12-25T10:00:00Z" },
      ],
      unreadCount: 1,
    });
    render(<NotificationPanel />);
    fireEvent.click(screen.getByLabelText("Notifications"));
    expect(screen.getByText("Xem tất cả")).toBeInTheDocument();
  });

  it("closes panel on Escape key", () => {
    mockUseNotifications.mockReturnValue({
      ...defaultMock,
      notifications: [
        { id: "1", user_id: "u1", title: "N1", body: null, read: false, created_at: "2025-12-25T10:00:00Z" },
      ],
    });
    render(<NotificationPanel />);
    fireEvent.click(screen.getByLabelText("Notifications"));
    expect(screen.getByText("N1")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("N1")).not.toBeInTheDocument();
  });
});
