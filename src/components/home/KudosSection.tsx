"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/libs/i18n/context";

export function KudosSection() {
  const { t } = useI18n();

  return (
    <section className="bg-[#00101A] py-16 md:py-24 px-4 md:px-12 lg:px-36">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/kudos-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-[#00101A]/70" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 p-8 md:p-12 lg:p-16">
          {/* Content */}
          <div className="flex-1 flex flex-col gap-3">
            <p className="text-white text-base font-medium italic">{t("home.kudos_label")}</p>
            <h2 className="text-[#FFEA9E] text-3xl md:text-4xl font-bold">
              {t("home.kudos_title")}
            </h2>
            <span className="text-[#FFEA9E] text-xs font-bold tracking-wide uppercase">
              {t("home.kudos_badge")}
            </span>
            <p className="text-white text-sm leading-relaxed max-w-lg">
              {t("home.kudos_description")}
            </p>
            <Link
              href="/kudos"
              className="inline-flex items-center gap-2 px-6 py-3 mt-2 rounded-lg bg-[#FFEA9E] text-[#00101A] text-sm font-bold w-fit transition-opacity hover:opacity-90"
            >
              {t("home.detail")}
              <Image
                src="/icons/arrow-up-right.svg"
                alt=""
                width={16}
                height={16}
                className="invert"
              />
            </Link>
          </div>

          {/* KUDOS logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/kudos-logo.svg"
              alt="KUDOS"
              width={240}
              height={120}
              className="w-32 md:w-48 lg:w-60 h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
