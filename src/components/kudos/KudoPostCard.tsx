'use client';

import { KudoCardSender } from './KudoCardSender';
import { KudoCardContent } from './KudoCardContent';
import { KudoCardMedia } from './KudoCardMedia';
import { KudoCardHashtags } from './KudoCardHashtags';
import { KudoCardActions } from './KudoCardActions';
import { formatTimestamp } from '@/utils/kudos';
import type { KudosWithUser } from '@/types/kudos';

interface KudoPostCardProps {
  kudos: KudosWithUser;
  onHashtagClick?: (hashtag: string) => void;
}

export function KudoPostCard({ kudos, onHashtagClick }: KudoPostCardProps) {
  const hashtagLabel = kudos.hashtags?.[0] || undefined;

  return (
    <article
      className="flex w-full flex-col gap-4 rounded-3xl bg-[#FFF8E1] p-6 transition-transform hover:-translate-y-0.5 sm:p-10 lg:w-[680px]"
      aria-label={`Kudos from ${kudos.sender.name} to ${kudos.receiver.name}`}
    >
      <KudoCardSender sender={kudos.sender} receiver={kudos.receiver} />

      {hashtagLabel && (
        <span className="inline-block w-fit rounded bg-[rgba(241,118,118,0.2)] px-2 py-0.5 font-montserrat text-sm font-bold text-[#F17676]">
          {hashtagLabel}
        </span>
      )}

      <p className="font-montserrat text-sm font-bold text-[#999]">
        {formatTimestamp(kudos.created_at)}
      </p>

      <KudoCardContent content={kudos.content} maxLines={5} />

      <KudoCardMedia images={kudos.images} mediaType={kudos.media_type} />

      <KudoCardHashtags
        hashtags={kudos.hashtags}
        onHashtagClick={onHashtagClick}
      />

      <KudoCardActions
        kudosId={kudos.id}
        heartsCount={kudos.hearts_count}
        isHeartedByMe={kudos.is_hearted_by_me ?? false}
      />
    </article>
  );
}
