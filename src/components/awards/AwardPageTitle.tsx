"use client";

import { useI18n } from "@/libs/i18n/context";

export function AwardPageTitle() {
  const { t } = useI18n();

  return (
    <div className="max-w-[1152px] mx-auto flex flex-col gap-4">
      <p className="text-2xl font-bold text-white text-center font-montserrat">
        {t("home.awards_caption")}
      </p>
      <div
        data-testid="divider"
        className="w-full h-px bg-[#2E3940]"
      />
      <h1 className="text-[32px] leading-[40px] md:text-[44px] md:leading-[52px] lg:text-[57px] lg:leading-[64px] font-bold text-[#FFEA9E] tracking-[-0.25px] text-center font-montserrat">
        {t("awards.page_title")}
      </h1>
    </div>
  );
}
