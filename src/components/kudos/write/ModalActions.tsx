"use client";

import { useI18n } from "@/libs/i18n/context";

interface ModalActionsProps {
  isValid: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export function ModalActions({ isValid, isSubmitting, onCancel, onSubmit }: ModalActionsProps) {
  const { t } = useI18n();

  return (
    <div className="flex gap-4 w-full items-center max-md:flex-col-reverse max-md:gap-2">
      {/* H.1 - Cancel Button */}
      <button
        type="button"
        onClick={onCancel}
        className="h-14 px-6 border border-[#999] rounded-lg font-bold text-[#2E3940] font-[Montserrat] flex items-center gap-2 transition-colors duration-150 hover:bg-black/5 hover:border-[#2E3940] focus:outline-2 focus:outline-[#3B82F6] focus:outline-offset-2 max-md:w-full max-md:justify-center"
      >
        {t("kudos.write.btn_cancel")}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* H.2 - Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isValid || isSubmitting}
        className="h-14 flex-1 bg-[#FFEA9E] rounded-lg font-bold text-[#2E3940] font-[Montserrat] flex items-center justify-center gap-2 transition-colors duration-150 hover:bg-[#FFE082] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-2 focus:outline-[#3B82F6] focus:outline-offset-2 max-md:w-full"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </>
        ) : (
          <>
            {t("kudos.write.btn_submit")}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
