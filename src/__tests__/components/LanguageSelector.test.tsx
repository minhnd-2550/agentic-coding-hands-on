import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { LanguageSelector } from "@/components/ui/LanguageSelector";

// Mock the i18n context
const mockSetLocale = vi.fn();
let mockLocale = "vn";

vi.mock("@/libs/i18n/context", () => ({
  useI18n: () => ({
    locale: mockLocale,
    setLocale: mockSetLocale,
    t: (key: string) => key,
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

describe("LanguageSelector", () => {
  beforeEach(() => {
    mockLocale = "vn";
    mockSetLocale.mockClear();
  });

  it("renders current locale label", () => {
    render(<LanguageSelector />);
    expect(screen.getByText("VN")).toBeInTheDocument();
  });

  it("has aria-expanded=false by default", () => {
    render(<LanguageSelector />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("has aria-haspopup=listbox", () => {
    render(<LanguageSelector />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("opens dropdown on click with aria-expanded=true", () => {
    render(<LanguageSelector />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("shows 3 language options in dropdown", () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByRole("button"));
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  it("marks current locale as selected", () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByRole("button"));
    const options = screen.getAllByRole("option");
    const vnOption = options.find((o) => o.getAttribute("aria-selected") === "true");
    expect(vnOption).toBeTruthy();
  });

  it("calls setLocale and closes dropdown when option is clicked", () => {
    render(<LanguageSelector />);
    fireEvent.click(screen.getByRole("button"));
    const options = screen.getAllByRole("option");
    // Click EN option (second one)
    fireEvent.click(options[1]);
    expect(mockSetLocale).toHaveBeenCalledWith("en");
    // Dropdown should close
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes dropdown on Escape key", () => {
    render(<LanguageSelector />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(button.parentElement!, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes dropdown on click outside", () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <LanguageSelector />
      </div>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
