"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useI18n } from "@/libs/i18n/context";
import type { Locale } from "@/libs/i18n/types";

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: "vn", flag: "/icons/flag-vn.svg", label: "VN" },
  { code: "en", flag: "/icons/flag-en.svg", label: "EN" },
  { code: "jp", flag: "/icons/flag-jp.svg", label: "JP" },
];

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  function handleKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "Escape":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
    }
  }

  function selectLocale(code: Locale) {
    setLocale(code);
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1 px-4 py-4 rounded cursor-pointer hover:bg-white/10 transition-colors"
      >
        <Image
          src={currentLocale.flag}
          alt=""
          width={24}
          height={24}
          className="rounded-sm"
        />
        <span className="font-[family-name:var(--font-montserrat)] font-bold text-base leading-6 tracking-[0.15px] text-white">
          {currentLocale.label}
        </span>
        <Image
          src="/icons/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className={`invert transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full right-0 mt-1 p-1.5 bg-[#00070C] border border-[#998C5F] rounded-lg flex flex-col z-[60]"
        >
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              role="option"
              aria-selected={loc.code === locale}
              onClick={() => selectLocale(loc.code)}
              className={`flex items-center gap-1 px-4 py-4 cursor-pointer transition-colors ${
                loc.code === locale
                  ? "bg-[rgba(255,234,158,0.2)] rounded-sm"
                  : "rounded hover:bg-white/10"
              }`}
            >
              <Image
                src={loc.flag}
                alt=""
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="font-[family-name:var(--font-montserrat)] font-bold text-base leading-6 tracking-[0.15px] text-white">
                {loc.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
