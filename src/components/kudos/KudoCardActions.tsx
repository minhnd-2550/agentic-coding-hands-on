'use client';

import { HeartButton } from './HeartButton';
import { CopyLinkButton } from './CopyLinkButton';

interface KudoCardActionsProps {
  kudosId: string;
  heartsCount: number;
  isHeartedByMe: boolean;
}

export function KudoCardActions({ kudosId, heartsCount, isHeartedByMe }: KudoCardActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <HeartButton
        kudosId={kudosId}
        initialCount={heartsCount}
        initialHearted={isHeartedByMe}
      />
      <CopyLinkButton kudosId={kudosId} />
    </div>
  );
}
