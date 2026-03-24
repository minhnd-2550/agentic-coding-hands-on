"use client";

import { useI18n } from "@/libs/i18n/context";

export function AwardsSectionHeader() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3 mb-8 md:mb-12">
      <p className="text-white text-sm tracking-wide">
        {t("home.awards_caption")}
      </p>
      <hr className="border-[#FFEA9E]/30 w-16" />
      <h2 className="text-[#FFEA9E] text-3xl md:text-4xl font-bold">
        {t("home.awards_title")}
      </h2>
      <p className="text-white/60 text-sm md:text-base">
        {t("home.awards_subtitle")}
      </p>
    </div>
  );
}
