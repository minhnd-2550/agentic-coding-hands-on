"use client";

import type { AwardCategoryDetail } from "@/types/award";
import { TargetIcon } from "./AwardIcons";

type AwardMenuProps = {
  awards: AwardCategoryDetail[];
  activeSlug: string;
  onItemClick: (slug: string) => void;
};

export function AwardMenu({ awards, activeSlug, onItemClick }: AwardMenuProps) {
  return (
    <nav aria-label="Danh mục giải thưởng" className="flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
      {awards.map((award) => {
        const isActive = activeSlug === award.slug;
        return (
          <button
            key={award.slug}
            onClick={() => onItemClick(award.slug)}
            aria-current={isActive ? "true" : undefined}
            className={`flex items-center gap-2 whitespace-nowrap lg:whitespace-normal text-left p-4 text-base font-bold leading-6 tracking-[0.15px] transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 ${
              isActive
                ? "text-[#FFEA9E] border-b lg:border-b border-[#FFEA9E]"
                : "text-white hover:text-[#FFEA9E]"
            }`}
          >
            <TargetIcon className="w-5 h-5 flex-shrink-0" />
            {award.menuLabel}
          </button>
        );
      })}
    </nav>
  );
}
