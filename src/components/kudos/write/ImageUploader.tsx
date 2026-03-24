"use client";

import { useRef, useCallback, useState } from "react";
import { useI18n } from "@/libs/i18n/context";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 5;

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      // Reset input for re-selection
      e.target.value = "";
      setError(null);

      // Validate
      const remaining = MAX_IMAGES - value.length;
      const toAdd = files.slice(0, remaining);

      for (const file of toAdd) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          setError(t("kudos.write.image_invalid_type"));
          return;
        }
        if (file.size > MAX_SIZE) {
          setError(t("kudos.write.image_too_large"));
          return;
        }
      }

      // Create local preview URLs
      const newUrls = toAdd.map((f) => URL.createObjectURL(f));
      onChange([...value, ...newUrls]);
    },
    [value, onChange, t]
  );

  const handleRemove = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  return (
    <div className="flex items-start gap-4 max-md:flex-col max-md:gap-2">
      {/* F.1 - Label */}
      <label className="font-bold text-base text-[#2E3940] font-[Montserrat] whitespace-nowrap">
        {t("kudos.write.image_label")}
      </label>

      {/* Thumbnails + Add button */}
      <div className="flex-1 flex flex-wrap gap-2.5 items-center max-md:w-full">
        {/* Thumbnails */}
        {value.map((url, i) => (
          <div key={url} className="relative animate-chip-in">
            <img
              src={url}
              alt=""
              className="w-20 h-20 rounded-lg object-cover max-md:w-16 max-md:h-16"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EF4444] text-white rounded-full flex items-center justify-center text-xs cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
              aria-label={`Remove image ${i + 1}`}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}

        {/* Add button */}
        {value.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 border border-[#999] rounded-lg text-sm font-medium font-[Montserrat] text-[#2E3940] flex flex-col items-center gap-0.5 transition-colors hover:border-[#FFEA9E] hover:bg-[#FFEA9E]/10 cursor-pointer"
          >
            {t("kudos.write.image_add")}
            <span className="text-xs text-[#999] font-normal">
              {t("kudos.write.image_max")}
            </span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Error */}
        {error && (
          <p className="text-xs text-[#EF4444] font-[Montserrat] w-full">{error}</p>
        )}
      </div>
    </div>
  );
}
