"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "error" | "info";
  isVisible: boolean;
  onDismiss: () => void;
};

export function Toast({ message, type, isVisible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-4 z-[100] max-w-md px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
        type === "error"
          ? "bg-red-600 text-white"
          : "bg-blue-600 text-white"
      }`}
    >
      {message}
    </div>
  );
}
