'use client';

import { useI18n } from '@/libs/i18n/context';
import { KudoCardSender } from './KudoCardSender';
import { KudoCardContent } from './KudoCardContent';
import { KudoCardHashtags } from './KudoCardHashtags';
import { KudoCardActions } from './KudoCardActions';
import { formatTimestamp } from '@/utils/kudos';
import type { KudosWithUser } from '@/types/kudos';

interface KudoHighlightCardProps {
  kudos: KudosWithUser;
  isActive?: boolean;
}

export function KudoHighlightCard({ kudos, isActive = false }: KudoHighlightCardProps) {
  const { t } = useI18n();

  return (
    <article
      className={`flex w-full flex-shrink-0 flex-col gap-4 transition-all duration-300 sm:w-[528px]
        ${isActive
          ? 'scale-100 rounded-2xl border-4 border-[#FFEA9E] bg-[#FFF8E1] p-6 opacity-100'
          : 'scale-90 rounded-2xl border border-[#998C5F] bg-[#FFF8E1] p-6 opacity-70'
        }
      `}
      aria-label={`Highlighted kudos from ${kudos.sender.name} to ${kudos.receiver.name}`}
    >
      <KudoCardSender sender={kudos.sender} receiver={kudos.receiver} />

      <p className="font-montserrat text-sm font-bold text-[#999]">
        {formatTimestamp(kudos.created_at)}
      </p>

      <KudoCardContent content={kudos.content} maxLines={3} />

      <KudoCardHashtags hashtags={kudos.hashtags} />

      <KudoCardActions
        kudosId={kudos.id}
        heartsCount={kudos.hearts_count}
        isHeartedByMe={kudos.is_hearted_by_me ?? false}
      />

      <a
        href={`/kudos/${kudos.id}`}
        className="font-montserrat text-sm font-medium text-[#998C5F] transition-colors hover:text-[#FFEA9E]"
      >
        {t('kudos.view_detail')} &rarr;
      </a>
    </article>
  );
}
