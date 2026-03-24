"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/libs/i18n/context";

export function AwardKudosSection() {
  const { t } = useI18n();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/kudos-bg.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#00101A]/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between py-16 lg:py-0 lg:h-[500px] gap-8 lg:gap-16 px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-4 max-w-[470px]">
          <span className="text-white font-bold text-sm tracking-wider uppercase">
            {t("home.kudos_label")}
          </span>
          <h2 className="text-[32px] lg:text-[57px] font-bold text-[#FFEA9E] leading-tight lg:leading-[64px]">
            {t("home.kudos_title")}
          </h2>
          <p className="text-base font-bold text-white leading-6 tracking-[0.5px] whitespace-pre-line">
            {t("awards.kudos_description")}
          </p>
          <Link
            href="/kudos"
            className="inline-flex items-center gap-1 bg-[#FFEA9E] text-[#00101A] h-14 px-4 rounded-[4px] font-bold text-base w-fit hover:opacity-90 transition-opacity outline-none focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
          >
            {t("home.detail")}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* KUDOS Logo */}
        <div className="relative flex items-center">
          <Image
            src="/images/kudos-logo.svg"
            alt="Sun* Kudos"
            width={374}
            height={72}
            className="w-[250px] lg:w-[374px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
