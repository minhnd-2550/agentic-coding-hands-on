'use client';

import { useI18n } from '@/libs/i18n/context';
import { GiftListItem } from './GiftListItem';
import type { SecretBoxWithUser } from '@/types/kudos';

interface RecentGiftsListProps {
  gifts: SecretBoxWithUser[];
  isLoading?: boolean;
}

export function RecentGiftsList({ gifts, isLoading }: RecentGiftsListProps) {
  const { t } = useI18n();
  const titleParts = t('kudos.recent_gifts_title').split('\n');

  return (
    <div className="flex flex-col gap-2.5 rounded-[17px] border border-[#998C5F] bg-[#00070C] p-6">
      <p className="font-montserrat text-base font-bold leading-tight text-[#FFEA9E]">
        {titleParts[0]}<br />{titleParts[1]}
      </p>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className="h-8 w-8 animate-pulse rounded-full bg-[#998C5F]/20" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-24 animate-pulse rounded bg-[#998C5F]/20" />
                <div className="h-3 w-32 animate-pulse rounded bg-[#998C5F]/20" />
              </div>
            </div>
          ))}
        </div>
      ) : gifts.length === 0 ? (
        <p className="font-montserrat text-sm text-[#999]">{t('kudos.no_gifts')}</p>
      ) : (
        gifts.map((gift) => (
          <GiftListItem
            key={gift.id}
            user={gift.user}
            description={gift.gift_description || t('kudos.default_gift')}
          />
        ))
      )}
    </div>
  );
}
