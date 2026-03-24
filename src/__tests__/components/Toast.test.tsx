import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import React from "react";
import { Toast } from "@/components/ui/Toast";

describe("Toast", () => {
  it("renders message when visible", () => {
    render(
      <Toast
        message="Test message"
        type="error"
        isVisible={true}
        onDismiss={() => {}}
      />
    );
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render when not visible", () => {
    render(
      <Toast
        message="Test message"
        type="error"
        isVisible={false}
        onDismiss={() => {}}
      />
    );
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  it("has role='alert' and aria-live='assertive'", () => {
    render(
      <Toast
        message="Alert!"
        type="error"
        isVisible={true}
        onDismiss={() => {}}
      />
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  it("auto-dismisses after 5 seconds", () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(
      <Toast
        message="Auto dismiss"
        type="error"
        isVisible={true}
        onDismiss={onDismiss}
      />
    );
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onDismiss).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});
