'use client';

import { HeartIcon } from '@/components/icons/KudosIcons';
import { useI18n } from '@/libs/i18n/context';
import { OpenGiftButton } from './OpenGiftButton';
import type { KudosStats } from '@/types/kudos';

interface KudosStatsCardProps {
  stats: KudosStats | null;
  isLoading?: boolean;
}

function StatRow({ label, value, icon }: { label: string; value: number | string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-montserrat text-sm font-bold text-white sm:text-lg sm:leading-7 lg:text-[22px]">
        {label}
      </span>
      <span className="flex items-center gap-1 font-montserrat text-sm font-bold text-[#FFEA9E] sm:text-lg lg:text-[22px]">
        {icon}
        {value}
      </span>
    </div>
  );
}

export function KudosStatsCard({ stats, isLoading }: KudosStatsCardProps) {
  const { t } = useI18n();
  const unopened = stats?.secret_boxes_unopened ?? 0;

  return (
    <div className="flex flex-col gap-2.5 rounded-[17px] border border-[#998C5F] bg-[#00070C] p-6">
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-5 w-40 animate-pulse rounded bg-[#998C5F]/20" />
              <div className="h-5 w-8 animate-pulse rounded bg-[#998C5F]/20" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <StatRow label={t('kudos.stat_received')} value={stats?.kudos_received ?? '---'} />
          <StatRow label={t('kudos.stat_sent')} value={stats?.kudos_sent ?? '---'} />
          <StatRow
            label={t('kudos.stat_hearts')}
            value={stats?.hearts_received ?? '---'}
            icon={<HeartIcon size={16} filled className="text-[#D4271D]" />}
          />
          <div className="my-1 h-px bg-[#998C5F]/30" />
          <StatRow label={t('kudos.stat_box_opened')} value={stats?.secret_boxes_opened ?? '---'} />
          <StatRow label={t('kudos.stat_box_unopened')} value={stats?.secret_boxes_unopened ?? '---'} />
          <OpenGiftButton disabled={unopened === 0} />
        </>
      )}
    </div>
  );
}
