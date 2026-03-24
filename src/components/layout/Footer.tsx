"use client";

import { useI18n } from "@/libs/i18n/context";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

type FooterProps = {
  variant?: "full" | "minimal";
};

export function Footer({ variant = "minimal" }: FooterProps) {
  const { t } = useI18n();

  if (variant === "minimal") {
    return (
      <footer className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-center border-t border-[#2E3940] py-6 px-4 md:py-8 md:px-12 lg:py-10 lg:px-[90px]">
        <p className="font-[family-name:var(--font-montserrat-alternates)] font-bold text-base leading-6 text-white text-center">
          {t("footer.copyright")}
        </p>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-[#00101A] border-t border-[#2E3940] py-4 px-4 md:py-6 md:px-12 lg:px-36">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          <NavLink href="/" label={t("nav.about_saa")} />
          <NavLink href="/award-information" label={t("nav.award_info")} />
          <NavLink href="/kudos" label={t("nav.sun_kudos")} />
          <NavLink href="/tieu-chuan-chung" label={t("nav.standards")} />
        </nav>

        <p className="font-[family-name:var(--font-montserrat-alternates)] font-bold text-xs md:text-sm leading-6 text-white/70 text-center whitespace-nowrap">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
