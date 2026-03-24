"use client";

import { useState, useCallback, useMemo } from "react";
import type { CreateKudosPayload } from "@/types/kudos";

interface Receiver {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface WriteKudosState {
  receiver: Receiver | null;
  title: string;
  content: string;
  hashtags: string[];
  images: string[];
  isAnonymous: boolean;
  anonymousName: string;
}

const initialState: WriteKudosState = {
  receiver: null,
  title: "",
  content: "",
  hashtags: [],
  images: [],
  isAnonymous: false,
  anonymousName: "",
};

export function useWriteKudos() {
  const [state, setState] = useState<WriteKudosState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setReceiver = useCallback((receiver: Receiver | null) => {
    setState((prev) => ({ ...prev, receiver }));
  }, []);

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const setContent = useCallback((content: string) => {
    setState((prev) => ({ ...prev, content }));
  }, []);

  const setHashtags = useCallback((hashtags: string[]) => {
    setState((prev) => ({ ...prev, hashtags }));
  }, []);

  const setImages = useCallback((images: string[]) => {
    setState((prev) => ({ ...prev, images }));
  }, []);

  const setIsAnonymous = useCallback((isAnonymous: boolean) => {
    setState((prev) => ({
      ...prev,
      isAnonymous,
      anonymousName: isAnonymous ? prev.anonymousName : "",
    }));
  }, []);

  const setAnonymousName = useCallback((anonymousName: string) => {
    setState((prev) => ({ ...prev, anonymousName }));
  }, []);

  const isValid = useMemo(() => {
    return (
      state.receiver !== null &&
      state.title.trim().length > 0 &&
      state.content.trim().length > 0 &&
      state.hashtags.length >= 1
    );
  }, [state.receiver, state.title, state.content, state.hashtags]);

  const submit = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!state.receiver || !isValid) {
      return { success: false, error: "Validation failed" };
    }

    setIsSubmitting(true);
    try {
      const payload: CreateKudosPayload = {
        receiver_id: state.receiver.id,
        title: state.title.trim(),
        content: state.content.trim(),
        hashtags: state.hashtags,
        images: state.images,
        is_anonymous: state.isAnonymous,
        anonymous_name: state.isAnonymous ? (state.anonymousName.trim() || null) : null,
      };

      const res = await fetch("/api/kudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData: { error?: string } = await res.json();
        return { success: false, error: errData.error || "Unknown error" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    } finally {
      setIsSubmitting(false);
    }
  }, [state, isValid]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    isSubmitting,
    isValid,
    setReceiver,
    setTitle,
    setContent,
    setHashtags,
    setImages,
    setIsAnonymous,
    setAnonymousName,
    submit,
    reset,
  };
}
