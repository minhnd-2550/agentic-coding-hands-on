"use client";

import { useI18n } from "@/libs/i18n/context";

interface AnonymousToggleProps {
  isAnonymous: boolean;
  anonymousName: string;
  onToggle: (checked: boolean) => void;
  onNameChange: (name: string) => void;
}

export function AnonymousToggle({
  isAnonymous,
  anonymousName,
  onToggle,
  onNameChange,
}: AnonymousToggleProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3">
      {/* G - Checkbox */}
      <label className="flex items-center gap-3 cursor-pointer">
        <span
          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors duration-150 ${
            isAnonymous
              ? "bg-[#FFEA9E] border-[#FFEA9E]"
              : "border-[#999] bg-transparent hover:border-[#FFEA9E]"
          }`}
          role="checkbox"
          aria-checked={isAnonymous}
        >
          {isAnonymous && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="#2E3940" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => onToggle(e.target.checked)}
          className="sr-only"
        />
        <span className="text-base text-[#999] font-[Montserrat]">
          {t("kudos.write.anonymous_label")}
        </span>
      </label>

      {/* G.1 - Anonymous Nickname Input */}
      {isAnonymous && (
        <div className="flex items-start gap-4 ml-8 max-md:ml-0 max-md:flex-col max-md:gap-2">
          <label className="font-bold text-base text-[#2E3940] font-[Montserrat] whitespace-nowrap pt-4 max-md:pt-0">
            {t("kudos.write.anonymous_nickname_label")}
          </label>
          <input
            type="text"
            value={anonymousName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={t("kudos.write.anonymous_nickname_placeholder")}
            maxLength={50}
            className="flex-1 h-14 border border-[#999] rounded-lg px-4 font-[Montserrat] text-base text-[#2E3940] placeholder:text-[#999] transition-colors duration-150 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] focus:outline-none max-md:w-full"
          />
        </div>
      )}
    </div>
  );
}
