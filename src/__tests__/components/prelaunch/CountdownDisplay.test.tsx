import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CountdownDisplay } from "@/components/prelaunch/CountdownDisplay";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/hooks/useCountdown", () => ({
  useCountdown: vi.fn(),
}));

import { useCountdown } from "@/hooks/useCountdown";
const mockUseCountdown = vi.mocked(useCountdown);

describe("CountdownDisplay", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders title text in italic", () => {
    mockUseCountdown.mockReturnValue({
      days: "05",
      hours: "12",
      minutes: "30",
      isExpired: false,
    });
    render(<CountdownDisplay eventDate="2025-12-26T18:30:00+07:00" />);
    const title = screen.getByText("Sự kiện sẽ bắt đầu sau");
    expect(title).toBeInTheDocument();
    expect(title.className).toContain("italic");
  });

  it("renders 3 digit groups with labels", () => {
    mockUseCountdown.mockReturnValue({
      days: "05",
      hours: "12",
      minutes: "30",
      isExpired: false,
    });
    render(<CountdownDisplay eventDate="2025-12-26T18:30:00+07:00" />);
    expect(screen.getByText("DAYS")).toBeInTheDocument();
    expect(screen.getByText("HOURS")).toBeInTheDocument();
    expect(screen.getByText("MINUTES")).toBeInTheDocument();
  });

  it("renders 6 digit boxes total (2 per group)", () => {
    mockUseCountdown.mockReturnValue({
      days: "05",
      hours: "12",
      minutes: "30",
      isExpired: false,
    });
    const { container } = render(
      <CountdownDisplay eventDate="2025-12-26T18:30:00+07:00" />
    );
    const digitBoxes = container.querySelectorAll("[aria-label^='digit']");
    expect(digitBoxes.length).toBe(6);
  });

  it("redirects to / when countdown expires", () => {
    mockUseCountdown.mockReturnValue({
      days: "00",
      hours: "00",
      minutes: "00",
      isExpired: true,
    });
    render(<CountdownDisplay eventDate="2025-12-26T18:30:00+07:00" />);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("does not redirect when countdown is active", () => {
    mockUseCountdown.mockReturnValue({
      days: "01",
      hours: "02",
      minutes: "03",
      isExpired: false,
    });
    render(<CountdownDisplay eventDate="2025-12-26T18:30:00+07:00" />);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("has aria-live region for accessibility", () => {
    mockUseCountdown.mockReturnValue({
      days: "01",
      hours: "02",
      minutes: "03",
      isExpired: false,
    });
    const { container } = render(
      <CountdownDisplay eventDate="2025-12-26T18:30:00+07:00" />
    );
    const timer = container.querySelector('[role="timer"]');
    expect(timer).toBeInTheDocument();
    expect(timer).toHaveAttribute("aria-live", "polite");
  });
});
