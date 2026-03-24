import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CountdownTimer } from "@/components/home/CountdownTimer";

// Mock useCountdown
vi.mock("@/hooks/useCountdown", () => ({
  useCountdown: vi.fn(),
}));

import { useCountdown } from "@/hooks/useCountdown";
const mockUseCountdown = vi.mocked(useCountdown);

describe("CountdownTimer", () => {
  it("renders 3 countdown units with labels", () => {
    mockUseCountdown.mockReturnValue({
      days: "20",
      hours: "15",
      minutes: "30",
      isExpired: false,
    });

    render(<CountdownTimer eventDate="2025-12-26T18:30:00Z" />);

    expect(screen.getByText("DAYS")).toBeInTheDocument();
    expect(screen.getByText("HOURS")).toBeInTheDocument();
    expect(screen.getByText("MINUTES")).toBeInTheDocument();
    // Digits are split per character — verify all 6 digit cells exist
    const digits = screen.getAllByText(/^[0-9]$/);
    expect(digits).toHaveLength(6); // 2+0, 1+5, 3+0
  });

  it("shows 'Coming soon' label when not expired", () => {
    mockUseCountdown.mockReturnValue({
      days: "10",
      hours: "05",
      minutes: "22",
      isExpired: false,
    });

    render(<CountdownTimer eventDate="2025-12-26T18:30:00Z" />);
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
  });

  it("hides 'Coming soon' label when expired", () => {
    mockUseCountdown.mockReturnValue({
      days: "00",
      hours: "00",
      minutes: "00",
      isExpired: true,
    });

    render(<CountdownTimer eventDate="2025-12-26T18:30:00Z" />);
    expect(screen.queryByText("Coming soon")).not.toBeInTheDocument();
  });

  it("displays 00 values when expired", () => {
    mockUseCountdown.mockReturnValue({
      days: "00",
      hours: "00",
      minutes: "00",
      isExpired: true,
    });

    render(<CountdownTimer eventDate="2025-12-26T18:30:00Z" />);
    // All 6 digit cells should show "0"
    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(6);
  });
});
