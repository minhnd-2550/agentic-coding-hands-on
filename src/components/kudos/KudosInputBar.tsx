'use client';

import { PenIcon, SearchIcon } from '@/components/icons/KudosIcons';
import { useI18n } from '@/libs/i18n/context';
import { useWriteKudosContext } from '@/components/kudos/write/WriteKudosProvider';

export function KudosInputBar() {
  const { t } = useI18n();
  const { openModal } = useWriteKudosContext();

  return (
    <div className="flex items-center gap-4">
      {/* Button ghi nhận (A.1) */}
      <button
        onClick={openModal}
        className="flex h-[72px] cursor-pointer items-center gap-2 rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] px-4 py-6 transition-colors hover:border-[#FFEA9E] hover:bg-[rgba(255,234,158,0.2)]"
      >
        <PenIcon size={20} className="flex-shrink-0 text-white" />
        <span className="font-montserrat text-base font-medium text-[#999] whitespace-nowrap">
          {t('kudos.input_placeholder')}
        </span>
      </button>

      {/* Button tìm kiếm profile Sunner — no action yet */}
      <button
        disabled
        className="flex h-[72px] items-center gap-2 rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.1)] px-4 py-6 opacity-60 cursor-not-allowed"
      >
        <SearchIcon size={20} className="flex-shrink-0 text-[#999]" />
        <span className="font-montserrat text-base font-medium text-[#999] whitespace-nowrap">
          {t('kudos.search_placeholder')}
        </span>
      </button>
    </div>
  );
}
