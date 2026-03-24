import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "@/hooks/useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns correct days, hours, minutes for a future date", () => {
    // Set current time to 2025-12-24T00:00:00Z
    vi.setSystemTime(new Date("2025-12-24T00:00:00Z"));
    const target = new Date("2025-12-26T18:30:00Z");

    const { result } = renderHook(() => useCountdown(target.toISOString()));

    expect(result.current.days).toBe("02");
    expect(result.current.hours).toBe("18");
    expect(result.current.minutes).toBe("30");
    expect(result.current.isExpired).toBe(false);
  });

  it("zero-pads single digit values", () => {
    vi.setSystemTime(new Date("2025-12-26T12:25:00Z"));
    const target = new Date("2025-12-26T18:30:00Z");

    const { result } = renderHook(() => useCountdown(target.toISOString()));

    expect(result.current.days).toBe("00");
    expect(result.current.hours).toBe("06");
    expect(result.current.minutes).toBe("05");
  });

  it("returns 00/00/00 and isExpired=true when target is in the past", () => {
    vi.setSystemTime(new Date("2025-12-27T00:00:00Z"));
    const target = new Date("2025-12-26T18:30:00Z");

    const { result } = renderHook(() => useCountdown(target.toISOString()));

    expect(result.current.days).toBe("00");
    expect(result.current.hours).toBe("00");
    expect(result.current.minutes).toBe("00");
    expect(result.current.isExpired).toBe(true);
  });

  it("updates every 60 seconds", () => {
    vi.setSystemTime(new Date("2025-12-26T17:28:00Z"));
    const target = new Date("2025-12-26T18:30:00Z");

    const { result } = renderHook(() => useCountdown(target.toISOString()));

    expect(result.current.hours).toBe("01");
    expect(result.current.minutes).toBe("02");

    // Advance 60 seconds
    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(result.current.minutes).toBe("01");
  });

  it("transitions to expired state when countdown reaches zero", () => {
    vi.setSystemTime(new Date("2025-12-26T18:29:30Z"));
    const target = new Date("2025-12-26T18:30:00Z");

    const { result } = renderHook(() => useCountdown(target.toISOString()));
    expect(result.current.isExpired).toBe(false);

    // Advance past the target
    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(result.current.isExpired).toBe(true);
    expect(result.current.days).toBe("00");
    expect(result.current.hours).toBe("00");
    expect(result.current.minutes).toBe("00");
  });
});
