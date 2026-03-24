import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

// Store references to observer instances and their callbacks
let observerInstances: MockIntersectionObserver[];
let observerCallback: IntersectionObserverCallback;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  private observedElements: Set<Element> = new Set();

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    observerCallback = callback;
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
    observerInstances.push(this);
  }

  observe(target: Element): void {
    this.observedElements.add(target);
  }

  unobserve(target: Element): void {
    this.observedElements.delete(target);
  }

  disconnect(): void {
    this.observedElements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  get elements(): Set<Element> {
    return this.observedElements;
  }
}

function fireIntersection(targetId: string, isIntersecting: boolean) {
  const entry = {
    target: document.getElementById(targetId)!,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: Date.now(),
  } as IntersectionObserverEntry;

  act(() => {
    observerCallback([entry], observerInstances[0]);
  });
}

describe("useScrollSpy", () => {
  beforeEach(() => {
    observerInstances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    // Reset hash
    window.location.hash = "";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // Clean up DOM elements
    document.body.innerHTML = "";
  });

  it("returns first sectionId as activeId by default", () => {
    // Create DOM elements for sections
    const ids = ["hero", "awards", "kudos"];
    ids.forEach((id) => {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    });

    const { result } = renderHook(() => useScrollSpy(ids));

    expect(result.current).toBe("hero");
  });

  it("updates activeId when intersection callback fires with isIntersecting=true for a section", () => {
    const ids = ["hero", "awards", "kudos"];
    ids.forEach((id) => {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    });

    const { result } = renderHook(() => useScrollSpy(ids));

    expect(result.current).toBe("hero");

    // Simulate "awards" section coming into view
    fireIntersection("awards", true);

    expect(result.current).toBe("awards");
  });

  it("handles empty sectionIds array (returns empty string)", () => {
    const { result } = renderHook(() => useScrollSpy([]));

    expect(result.current).toBe("");
  });

  it("cleans up observers on unmount", () => {
    const ids = ["hero", "awards"];
    ids.forEach((id) => {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    });

    const disconnectSpy = vi.spyOn(
      MockIntersectionObserver.prototype,
      "disconnect"
    );

    const { unmount } = renderHook(() => useScrollSpy(ids));

    expect(observerInstances.length).toBeGreaterThan(0);

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
    disconnectSpy.mockRestore();
  });

  it("reads hash fragment from window.location.hash on mount and sets it as initial activeId", () => {
    const ids = ["hero", "awards", "kudos"];
    ids.forEach((id) => {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    });

    // Set hash before rendering
    window.location.hash = "#awards";

    const { result } = renderHook(() => useScrollSpy(ids));

    expect(result.current).toBe("awards");
  });
});
