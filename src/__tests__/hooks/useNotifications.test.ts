import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useNotifications } from "@/hooks/useNotifications";

// Mock Supabase browser client
const mockFrom = vi.fn();
const mockSelect = vi.fn();
const mockOrder = vi.fn();
const mockRange = vi.fn();
const mockEq = vi.fn();
const mockUpdate = vi.fn();

vi.mock("@/libs/supabase/client", () => ({
  createClient: () => ({
    from: mockFrom,
  }),
}));

function setupChain(data: unknown[], count = 0) {
  mockRange.mockResolvedValue({ data, error: null, count });
  mockOrder.mockReturnValue({ range: mockRange });
  mockSelect.mockReturnValue({ order: mockOrder });
  mockEq.mockReturnValue({ select: mockSelect });
  mockFrom.mockReturnValue({
    select: mockSelect,
    update: mockUpdate,
  });
}

describe("useNotifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches initial 5 notifications", async () => {
    const mockData = [
      { id: "1", title: "Notification 1", body: "Body 1", read: false, created_at: "2025-12-25" },
      { id: "2", title: "Notification 2", body: "Body 2", read: true, created_at: "2025-12-24" },
    ];
    setupChain(mockData, 2);

    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.notifications).toHaveLength(2);
    });

    expect(mockFrom).toHaveBeenCalledWith("notifications");
  });

  it("computes unread count", async () => {
    const mockData = [
      { id: "1", title: "N1", body: null, read: false, created_at: "2025-12-25" },
      { id: "2", title: "N2", body: null, read: false, created_at: "2025-12-24" },
      { id: "3", title: "N3", body: null, read: true, created_at: "2025-12-23" },
    ];
    setupChain(mockData, 3);

    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.unreadCount).toBe(2);
    });
  });

  it("handles fetch errors gracefully", async () => {
    mockRange.mockResolvedValue({ data: null, error: { message: "Network error" }, count: 0 });
    mockOrder.mockReturnValue({ range: mockRange });
    mockSelect.mockReturnValue({ order: mockOrder });
    mockFrom.mockReturnValue({ select: mockSelect, update: mockUpdate });

    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.error).toBe(true);
    });
    expect(result.current.notifications).toEqual([]);
    expect(result.current.unreadCount).toBe(0);
  });
});
