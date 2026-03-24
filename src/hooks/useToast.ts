"use client";

import { useState, useCallback } from "react";

type ToastType = "error" | "info";

type ToastState = {
  message: string;
  type: ToastType;
  isVisible: boolean;
};

export function useToast() {
  const [state, setState] = useState<ToastState>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const show = useCallback((message: string, type: ToastType = "error") => {
    setState({ message, type, isVisible: true });
  }, []);

  const dismiss = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    ...state,
    show,
    dismiss,
  };
}
