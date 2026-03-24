"use client";

import { useI18n } from "@/libs/i18n/context";

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TitleInput({ value, onChange }: TitleInputProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-4 max-md:flex-col max-md:gap-2">
        {/* Label */}
        <label className="font-bold text-base text-[#2E3940] font-[Montserrat] whitespace-nowrap flex items-center gap-0.5 pt-4 max-md:pt-0 min-w-[100px]">
          <span className="text-red-500 font-bold">*</span>
          {t("kudos.write.title_label")}
        </label>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("kudos.write.title_placeholder")}
          maxLength={100}
          className="flex-1 h-14 border border-[#999] rounded-lg px-4 font-[Montserrat] text-base text-[#2E3940] placeholder:text-[#999] transition-colors duration-150 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] focus:outline-none max-md:w-full"
          aria-required="true"
        />
      </div>

      {/* Hint */}
      <p className="text-sm text-[#999] font-[Montserrat] ml-auto max-md:ml-0 whitespace-pre-line" style={{ width: "calc(100% - 120px)" }}>
        {t("kudos.write.title_hint")}
      </p>
    </div>
  );
}
