import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWriteKudos } from "@/hooks/useWriteKudos";

describe("useWriteKudos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with empty state", () => {
    const { result } = renderHook(() => useWriteKudos());

    expect(result.current.receiver).toBeNull();
    expect(result.current.title).toBe("");
    expect(result.current.content).toBe("");
    expect(result.current.hashtags).toEqual([]);
    expect(result.current.images).toEqual([]);
    expect(result.current.isAnonymous).toBe(false);
    expect(result.current.anonymousName).toBe("");
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isValid).toBe(false);
  });

  it("updates receiver", () => {
    const { result } = renderHook(() => useWriteKudos());
    const receiver = { id: "1", name: "Test User", avatar_url: null };

    act(() => result.current.setReceiver(receiver));

    expect(result.current.receiver).toEqual(receiver);
  });

  it("updates title", () => {
    const { result } = renderHook(() => useWriteKudos());

    act(() => result.current.setTitle("Best Mentor"));

    expect(result.current.title).toBe("Best Mentor");
  });

  it("updates content", () => {
    const { result } = renderHook(() => useWriteKudos());

    act(() => result.current.setContent("Thank you for everything"));

    expect(result.current.content).toBe("Thank you for everything");
  });

  it("updates hashtags", () => {
    const { result } = renderHook(() => useWriteKudos());

    act(() => result.current.setHashtags(["mentor", "helpful"]));

    expect(result.current.hashtags).toEqual(["mentor", "helpful"]);
  });

  it("clears anonymousName when isAnonymous is set to false", () => {
    const { result } = renderHook(() => useWriteKudos());

    act(() => {
      result.current.setIsAnonymous(true);
      result.current.setAnonymousName("Secret Friend");
    });

    expect(result.current.anonymousName).toBe("Secret Friend");

    act(() => result.current.setIsAnonymous(false));

    expect(result.current.anonymousName).toBe("");
    expect(result.current.isAnonymous).toBe(false);
  });

  describe("isValid", () => {
    it("returns false when receiver is missing", () => {
      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setTitle("Title");
        result.current.setContent("Content");
        result.current.setHashtags(["tag1"]);
      });

      expect(result.current.isValid).toBe(false);
    });

    it("returns false when title is empty", () => {
      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setContent("Content");
        result.current.setHashtags(["tag1"]);
      });

      expect(result.current.isValid).toBe(false);
    });

    it("returns false when content is empty", () => {
      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setTitle("Title");
        result.current.setHashtags(["tag1"]);
      });

      expect(result.current.isValid).toBe(false);
    });

    it("returns false when hashtags is empty", () => {
      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setTitle("Title");
        result.current.setContent("Content");
      });

      expect(result.current.isValid).toBe(false);
    });

    it("returns true when all required fields are filled", () => {
      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setTitle("Title");
        result.current.setContent("Content");
        result.current.setHashtags(["tag1"]);
      });

      expect(result.current.isValid).toBe(true);
    });

    it("returns false when title is only whitespace", () => {
      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setTitle("   ");
        result.current.setContent("Content");
        result.current.setHashtags(["tag1"]);
      });

      expect(result.current.isValid).toBe(false);
    });
  });

  describe("submit", () => {
    it("returns error when form is invalid", async () => {
      const { result } = renderHook(() => useWriteKudos());

      let submitResult: { success: boolean; error?: string };
      await act(async () => {
        submitResult = await result.current.submit();
      });

      expect(submitResult!.success).toBe(false);
      expect(submitResult!.error).toBe("Validation failed");
    });

    it("calls POST /api/kudos on valid submit", async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: { id: "new-kudos-id" } }),
      });
      vi.stubGlobal("fetch", mockFetch);

      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "user-2", name: "User", avatar_url: null });
        result.current.setTitle("Best Dev");
        result.current.setContent("Amazing work");
        result.current.setHashtags(["teamwork"]);
      });

      let submitResult: { success: boolean; error?: string };
      await act(async () => {
        submitResult = await result.current.submit();
      });

      expect(submitResult!.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith("/api/kudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiver_id: "user-2",
          title: "Best Dev",
          content: "Amazing work",
          hashtags: ["teamwork"],
          images: [],
          is_anonymous: false,
          anonymous_name: null,
        }),
      });
    });

    it("returns error on API failure", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: "Server error" }),
      }));

      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setTitle("Title");
        result.current.setContent("Content");
        result.current.setHashtags(["tag"]);
      });

      let submitResult: { success: boolean; error?: string };
      await act(async () => {
        submitResult = await result.current.submit();
      });

      expect(submitResult!.success).toBe(false);
      expect(submitResult!.error).toBe("Server error");
    });

    it("returns network error on fetch failure", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

      const { result } = renderHook(() => useWriteKudos());

      act(() => {
        result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
        result.current.setTitle("Title");
        result.current.setContent("Content");
        result.current.setHashtags(["tag"]);
      });

      let submitResult: { success: boolean; error?: string };
      await act(async () => {
        submitResult = await result.current.submit();
      });

      expect(submitResult!.success).toBe(false);
      expect(submitResult!.error).toBe("Network error");
    });
  });

  it("resets all state", () => {
    const { result } = renderHook(() => useWriteKudos());

    act(() => {
      result.current.setReceiver({ id: "1", name: "User", avatar_url: null });
      result.current.setTitle("Title");
      result.current.setContent("Content");
      result.current.setHashtags(["tag"]);
      result.current.setImages(["url"]);
      result.current.setIsAnonymous(true);
      result.current.setAnonymousName("Anon");
    });

    act(() => result.current.reset());

    expect(result.current.receiver).toBeNull();
    expect(result.current.title).toBe("");
    expect(result.current.content).toBe("");
    expect(result.current.hashtags).toEqual([]);
    expect(result.current.images).toEqual([]);
    expect(result.current.isAnonymous).toBe(false);
    expect(result.current.anonymousName).toBe("");
  });
});
