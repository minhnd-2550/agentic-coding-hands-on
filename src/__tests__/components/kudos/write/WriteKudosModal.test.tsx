import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WriteKudosModal } from "@/components/kudos/write/WriteKudosModal";
import { WriteKudosProvider, useWriteKudosContext } from "@/components/kudos/write/WriteKudosProvider";

// Mock i18n
vi.mock("@/libs/i18n/context", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    locale: "vn",
    setLocale: vi.fn(),
  }),
}));

// Mock useToast
const mockToastShow = vi.fn();
vi.mock("@/hooks/useToast", () => ({
  useToast: () => ({
    show: mockToastShow,
    dismiss: vi.fn(),
    message: "",
    type: "info",
    isVisible: false,
  }),
}));

// Mock child components to keep tests focused on modal behavior
vi.mock("@/components/kudos/write/RichTextEditor", () => ({
  RichTextEditor: ({ onChange }: { onChange: (v: string) => void }) => (
    <textarea data-testid="rich-text-editor" onChange={(e) => onChange(e.target.value)} />
  ),
}));

vi.mock("@/components/kudos/write/ImageUploader", () => ({
  ImageUploader: () => <div data-testid="image-uploader">ImageUploader</div>,
}));

vi.mock("@/components/kudos/write/AnonymousToggle", () => ({
  AnonymousToggle: () => <div data-testid="anonymous-toggle">AnonymousToggle</div>,
}));

vi.mock("@/components/kudos/write/ReceiverSearch", () => ({
  ReceiverSearch: ({ onChange }: { onChange: (r: { id: string; name: string; avatar_url: null }) => void }) => (
    <button data-testid="receiver-search" onClick={() => onChange({ id: "1", name: "Test", avatar_url: null })}>
      ReceiverSearch
    </button>
  ),
}));

vi.mock("@/components/kudos/write/TitleInput", () => ({
  TitleInput: ({ onChange }: { onChange: (v: string) => void }) => (
    <input data-testid="title-input" onChange={(e) => onChange(e.target.value)} />
  ),
}));

vi.mock("@/components/kudos/write/HashtagPicker", () => ({
  HashtagPicker: ({ onChange }: { onChange: (v: string[]) => void }) => (
    <button data-testid="hashtag-picker" onClick={() => onChange(["tag1"])}>
      HashtagPicker
    </button>
  ),
}));

vi.mock("@/components/kudos/write/ModalActions", () => ({
  ModalActions: ({
    isValid,
    onCancel,
    onSubmit,
  }: {
    isValid: boolean;
    isSubmitting: boolean;
    onCancel: () => void;
    onSubmit: () => void;
  }) => (
    <div>
      <button data-testid="cancel-btn" onClick={onCancel}>Cancel</button>
      <button data-testid="submit-btn" onClick={onSubmit} disabled={!isValid}>Submit</button>
    </div>
  ),
}));

function ModalOpener() {
  const { openModal } = useWriteKudosContext();
  return <button data-testid="open-modal" onClick={openModal}>Open</button>;
}

function TestWrapper() {
  return (
    <WriteKudosProvider>
      <ModalOpener />
      <WriteKudosModal />
    </WriteKudosProvider>
  );
}

describe("WriteKudosModal", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockToastShow.mockClear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    }));
  });

  it("does not render when modal is closed", () => {
    render(<TestWrapper />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders modal when opened via context", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByTestId("open-modal"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("closes modal on cancel button", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByTestId("open-modal"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("cancel-btn"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes modal on Escape key", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByTestId("open-modal"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes modal on overlay click", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByTestId("open-modal"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Click overlay (the dialog element itself)
    fireEvent.click(screen.getByRole("dialog"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("has aria-modal attribute", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByTestId("open-modal"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });
  });

  it("displays modal title", async () => {
    render(<TestWrapper />);
    fireEvent.click(screen.getByTestId("open-modal"));

    await waitFor(() => {
      expect(screen.getByText("kudos.write.modal_title")).toBeInTheDocument();
    });
  });
});
