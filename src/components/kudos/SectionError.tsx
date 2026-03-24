'use client';

import { useI18n } from '@/libs/i18n/context';

interface SectionErrorProps {
  message: string;
  onRetry: () => void;
}

export function SectionError({ message, onRetry }: SectionErrorProps) {
  const { t } = useI18n();

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-[#998C5F]/30 bg-[#00070C] px-6 py-8 text-center"
    >
      <p className="font-montserrat text-sm font-bold text-[#999]">{message}</p>
      <button
        onClick={onRetry}
        className="rounded-lg border border-[#998C5F] px-4 py-2 font-montserrat text-sm font-bold text-[#FFEA9E] transition-colors hover:bg-[rgba(255,234,158,0.1)]"
      >
        {t('kudos.retry')}
      </button>
    </div>
  );
}
