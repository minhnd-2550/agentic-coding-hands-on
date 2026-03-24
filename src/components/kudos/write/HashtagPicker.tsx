"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/libs/i18n/context";

interface HashtagPickerProps {
  value: string[];
  onChange: (hashtags: string[]) => void;
}

export function HashtagPicker({ value, onChange }: HashtagPickerProps) {
  const { t } = useI18n();
  const [available, setAvailable] = useState<{ id: string; name: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch available hashtags
  useEffect(() => {
    fetch("/api/hashtags")
      .then((res) => (res.ok ? res.json() : Promise.resolve({ data: [] })))
      .then((data) => setAvailable((data as { data?: { id: string; name: string }[] }).data || []))
      .catch(() => {});
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleToggle = useCallback(
    (name: string) => {
      if (value.includes(name)) {
        onChange(value.filter((h) => h !== name));
      } else if (value.length < 5) {
        onChange([...value, name]);
      }
    },
    [value, onChange]
  );

  const handleRemove = useCallback(
    (name: string) => {
      onChange(value.filter((h) => h !== name));
    },
    [value, onChange]
  );

  return (
    <div className="flex items-start gap-4 max-md:flex-col max-md:gap-2" ref={containerRef}>
      {/* E.1 - Label */}
      <label className="font-bold text-base text-[#2E3940] font-[Montserrat] whitespace-nowrap flex items-center gap-0.5">
        <span className="text-red-500 font-bold">*</span>
        {t("kudos.write.hashtag_label")}
      </label>

      {/* E.2 - Tag Group */}
      <div className="flex-1 flex flex-wrap gap-2 items-center max-md:w-full">
        {/* Selected chips */}
        {value.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-[#F17676]/20 text-[#F17676] rounded text-sm font-bold font-[Montserrat] flex items-center gap-1 animate-chip-in"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              className="text-[#F17676] hover:text-[#EF4444] transition-colors cursor-pointer"
              aria-label={`Remove #${tag}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </span>
        ))}

        {/* Add button (hidden at max 5) */}
        {value.length < 5 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 border border-[#999] rounded-lg text-sm font-medium font-[Montserrat] text-[#2E3940] flex flex-col items-center gap-0.5 transition-colors hover:border-[#FFEA9E] hover:bg-[#FFEA9E]/10"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              {t("kudos.write.hashtag_add")}
              <span className="text-xs text-[#999] font-normal">
                {t("kudos.write.hashtag_max")}
              </span>
            </button>

            {/* Backdrop to close dropdown on outside click */}
            {isOpen && (
              <div
                className="fixed inset-0 z-[9]"
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Dropdown */}
            {isOpen && available.length > 0 && (
              <ul
                className="absolute top-full left-0 mt-1 bg-[#1A1D23] border border-[#333]/50 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.4)] z-10 max-h-60 overflow-y-auto min-w-[260px]"
                role="listbox"
              >
                {available.map((tag) => {
                  const isSelected = value.includes(tag.name);
                  return (
                    <li
                      key={tag.id}
                      onClick={() => handleToggle(tag.name)}
                      className={`flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-bold font-[Montserrat] transition-colors border-b border-[#333]/30 last:border-b-0 ${
                        isSelected
                          ? "text-white bg-[#1A1D23]"
                          : "text-[#ccc] hover:bg-[#2A2D33]"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>#{tag.name}</span>
                      {isSelected && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="#8B7B3B" />
                          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
