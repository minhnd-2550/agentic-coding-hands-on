import Image from 'next/image';
import type { UserProfile } from '@/types/kudos';

interface GiftListItemProps {
  user: UserProfile;
  description: string;
}

export function GiftListItem({ user, description }: GiftListItemProps) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-[#998C5F]/30">
        {user.avatar_url ? (
          <Image src={user.avatar_url} alt={user.name} fill className="object-cover" sizes="32px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-montserrat text-xs font-bold text-[#FFEA9E]">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-montserrat text-sm font-bold text-[#FFEA9E]">{user.name}</span>
        <span className="font-montserrat text-xs text-[#999]">{description}</span>
      </div>
    </div>
  );
}
