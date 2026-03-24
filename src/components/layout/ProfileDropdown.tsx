"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import { useI18n } from "@/libs/i18n/context";

type ProfileDropdownProps = {
  isAdmin?: boolean;
};

export function ProfileDropdown({ isAdmin = false }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();
  const { t } = useI18n();

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [isOpen]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="Account menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-md border border-[#998C5F] hover:bg-white/10 transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10C12.21 10 14 8.21 14 6C14 3.79 12.21 2 10 2C7.79 2 6 3.79 6 6C6 8.21 7.79 10 10 10ZM10 12C7.33 12 2 13.34 2 16V18H18V16C18 13.34 12.67 12 10 12Z"
            fill="white"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-[#00070C] border border-[#998C5F] rounded-lg shadow-xl overflow-hidden z-50">
          <ul>
            <li>
              <a
                href="/profile"
                className="block px-4 py-3 text-white text-sm hover:bg-[rgba(255,234,158,0.2)] transition-colors"
              >
                {t("profile.profile")}
              </a>
            </li>
            {isAdmin && (
              <li>
                <a
                  href="/admin"
                  className="block px-4 py-3 text-white text-sm hover:bg-[rgba(255,234,158,0.2)] transition-colors"
                >
                  {t("profile.admin")}
                </a>
              </li>
            )}
            <li className="border-t border-[#2E3940]">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-3 text-red-400 text-sm hover:bg-[rgba(255,234,158,0.2)] transition-colors"
              >
                {t("profile.sign_out")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
