"use client";

import Image from "next/image";
import { useI18n } from "@/libs/i18n/context";

export function ContentSection() {
  const { t } = useI18n();

  return (
    <section className="relative bg-[#00101A] py-16 md:py-24 px-4 md:px-12 lg:px-36">
      <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
        {/* Root Further Logo */}
        <Image
          src="/images/root-further-logo.png"
          alt="Root Further"
          width={240}
          height={80}
          className="w-[180px] md:w-[240px] h-auto opacity-90"
        />

        {/* Main content */}
        <div className="flex flex-col gap-5 text-white/80 text-sm md:text-base leading-relaxed font-light">
          <p>{t("home.content.p1")}</p>
          <p>{t("home.content.p2")}</p>
          <p>{t("home.content.p3")}</p>
        </div>

        {/* English quote */}
        <blockquote className="text-center py-6">
          <p className="text-white/90 text-base md:text-lg italic font-medium">
            &quot;{t("home.content.quote")}&quot;
          </p>
          <p className="text-white/50 text-sm mt-2">
            {t("home.content.quote_source")}
          </p>
        </blockquote>

        <div className="flex flex-col gap-5 text-white/80 text-sm md:text-base leading-relaxed font-light">
          <p>{t("home.content.p4")}</p>
          <p>{t("home.content.p5")}</p>
        </div>
      </div>
    </section>
  );
}
