"use client";

import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { NotificationPanel } from "./NotificationPanel";
import { ProfileDropdown } from "./ProfileDropdown";
import { useI18n } from "@/libs/i18n/context";

type HeaderProps = {
  variant?: "full" | "minimal";
};

export function Header({ variant = "minimal" }: HeaderProps) {
  const { t } = useI18n();

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50 flex items-center px-4 md:px-12 lg:px-36 bg-[rgba(11,15,18,0.8)]">
      {/* Left: Logo + Nav links aligned together */}
      <div className="flex items-center gap-6">
        <Logo />

        {variant === "full" && (
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            <NavLink href="/" label={t("nav.about_saa")} />
            <NavLink href="/award-information" label={t("nav.award_info")} />
            <NavLink href="/kudos" label={t("nav.sun_kudos")} />
          </nav>
        )}
      </div>

      {/* Right: Controls pushed to the right */}
      <div className="ml-auto flex items-center gap-3">
        {variant === "full" && <NotificationPanel />}

        <LanguageSelector />

        {variant === "full" && <ProfileDropdown />}
      </div>
    </header>
  );
}
