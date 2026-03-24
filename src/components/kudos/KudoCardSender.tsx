'use client';

import Image from 'next/image';
import { ArrowRightIcon } from '@/components/icons/KudosIcons';
import type { UserProfile } from '@/types/kudos';

interface KudoCardSenderProps {
  sender: UserProfile;
  receiver: UserProfile;
}

function UserBadge({ user }: { user: UserProfile }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#998C5F]/30">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-montserrat text-sm font-bold text-[#FFEA9E]">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-montserrat text-sm font-bold leading-5 text-[#2E3940]">
          {user.name}
        </span>
        <div className="flex items-center gap-1">
          {user.star_count > 0 && (
            <span className="font-montserrat text-[10px] font-medium text-[#999]">
              {user.star_count} *
            </span>
          )}
          {user.badge && (
            <span className="font-montserrat text-[10px] font-medium text-[#999]">
              {user.badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function KudoCardSender({ sender, receiver }: KudoCardSenderProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <UserBadge user={sender} />
      <ArrowRightIcon size={16} className="flex-shrink-0 text-[#998C5F]" />
      <UserBadge user={receiver} />
    </div>
  );
}
