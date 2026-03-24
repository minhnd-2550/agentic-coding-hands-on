"use client";

import { useEffect, useCallback } from "react";
import type { AwardCategoryDetail } from "@/types/award";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { AwardMenu } from "./AwardMenu";
import { AwardDetailList } from "./AwardDetailList";

type AwardSectionProps = {
  awards: AwardCategoryDetail[];
};

export function AwardSection({ awards }: AwardSectionProps) {
  const sectionIds = awards.map((a) => a.slug);
  const activeSlug = useScrollSpy(sectionIds);

  const handleItemClick = useCallback((slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${slug}`);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, []);

  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-0" aria-label="Hệ thống giải thưởng">
      {/* Sticky Menu */}
      <div className="lg:w-[178px] lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start">
        <AwardMenu
          awards={awards}
          activeSlug={activeSlug}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Spacer for desktop */}
      <div className="hidden lg:block lg:flex-grow lg:max-w-[118px]" />

      {/* Award Cards */}
      <div className="flex-1 lg:max-w-[856px]">
        <AwardDetailList awards={awards} />
      </div>
    </section>
  );
}
