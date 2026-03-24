"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/libs/i18n/context";

export function CtaButtons() {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/award-information"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white bg-transparent text-white text-sm font-bold tracking-wide transition-all hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-[#FFEA9E]"
      >
        {t("home.about_awards")}
        <Image
          src="/icons/arrow-up-right.svg"
          alt=""
          width={16}
          height={16}
          className="group-hover:invert transition-all"
        />
      </Link>
      <Link
        href="/kudos"
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white bg-transparent text-white text-sm font-bold tracking-wide transition-all hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-[#FFEA9E]"
      >
        {t("home.about_kudos")}
        <Image
          src="/icons/arrow-up-right.svg"
          alt=""
          width={16}
          height={16}
          className="group-hover:invert transition-all"
        />
      </Link>
    </div>
  );
}
