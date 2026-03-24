"use client";

import { useState, useEffect } from "react";

type UseScrollSpyOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string {
  const { rootMargin = "-80px 0px -60% 0px", threshold = 0 } = options;

  const [activeId, setActiveId] = useState<string>(() => {
    // Check hash fragment on initial render
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (sectionIds.includes(hashId)) {
        return hashId;
      }
    }
    return sectionIds[0] ?? "";
  });

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin, threshold }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
}
