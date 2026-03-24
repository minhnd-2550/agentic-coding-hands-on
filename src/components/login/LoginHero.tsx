"use client";

import Image from "next/image";
import { useI18n } from "@/libs/i18n/context";
import { LoginButton } from "./LoginButton";
import type { LoginErrorType } from "@/types/auth";

type LoginHeroProps = {
  errorType?: LoginErrorType;
};

export function LoginHero({ errorType }: LoginHeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative z-10 flex flex-col gap-20 px-4 py-12 md:px-12 md:py-16 lg:px-36 lg:py-24 mt-20">
      {/* Key Visual — ROOT FURTHER logo */}
      <div className="flex flex-col gap-20 justify-center">
        <div className="w-[280px] h-[124px] md:w-[380px] md:h-[168px] lg:w-[451px] lg:h-[200px] relative">
          <Image
            src="/images/root-further.png"
            alt="ROOT FURTHER"
            fill
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 451px"
            className="object-contain"
            priority
          />
        </div>

        {/* Content text + Login button */}
        <div className="flex flex-col gap-6 pl-0 lg:pl-4 items-center text-center lg:items-start lg:text-left">
          <div className="font-[family-name:var(--font-montserrat)] font-bold text-lg md:text-xl leading-10 tracking-[0.5px] text-white max-w-[480px]">
            <p>{t("login.intro_line1")}</p>
            <p>{t("login.intro_line2")}</p>
          </div>
          <LoginButton errorType={errorType} />
        </div>
      </div>
    </section>
  );
}
