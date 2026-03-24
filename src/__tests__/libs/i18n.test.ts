import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { I18nProvider, useI18n } from "@/libs/i18n/context";

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(I18nProvider, null, children);
}

const createLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    _store: store,
    _setStore: (newStore: Record<string, string>) => {
      store = newStore;
    },
  };
};

let mockStorage: ReturnType<typeof createLocalStorageMock>;

describe("I18nProvider & useI18n", () => {
  beforeEach(() => {
    mockStorage = createLocalStorageMock();
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  it("defaults to VN locale when no localStorage", () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.locale).toBe("vn");
  });

  it("t() returns Vietnamese text by default", () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.t("login.button")).toBe("LOGIN With Google");
    expect(result.current.t("footer.copyright")).toBe(
      "Bản quyền thuộc về Sun* © 2025"
    );
  });

  it("switches to English when setLocale('en') is called", () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    act(() => {
      result.current.setLocale("en");
    });
    expect(result.current.locale).toBe("en");
    expect(result.current.t("login.intro_line1")).toBe(
      "Start your journey with SAA 2025."
    );
  });

  it("switches to Japanese when setLocale('jp') is called", () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    act(() => {
      result.current.setLocale("jp");
    });
    expect(result.current.locale).toBe("jp");
    expect(result.current.t("login.intro_line2")).toBe(
      "ログインして探検しよう！"
    );
  });

  it("persists locale to localStorage", () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    act(() => {
      result.current.setLocale("en");
    });
    expect(mockStorage.setItem).toHaveBeenCalledWith("locale", "en");
  });

  it("reads locale from localStorage on mount", () => {
    mockStorage._setStore({ locale: "jp" });
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.locale).toBe("jp");
  });

  it("falls back to VN for corrupted localStorage value", () => {
    mockStorage._setStore({ locale: "invalid_locale" });
    const { result } = renderHook(() => useI18n(), { wrapper });
    expect(result.current.locale).toBe("vn");
  });

  it("returns key as fallback for unknown translation key", () => {
    const { result } = renderHook(() => useI18n(), { wrapper });
    // @ts-expect-error - testing unknown key
    expect(result.current.t("unknown.key")).toBe("unknown.key");
  });
});
