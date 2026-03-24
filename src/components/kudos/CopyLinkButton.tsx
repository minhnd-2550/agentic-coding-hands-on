'use client';

import { LinkIcon } from '@/components/icons/KudosIcons';
import { useI18n } from '@/libs/i18n/context';
import { useToast } from '@/hooks/useToast';
import { buildKudosUrl } from '@/utils/kudos';

interface CopyLinkButtonProps {
  kudosId: string;
}

export function CopyLinkButton({ kudosId }: CopyLinkButtonProps) {
  const { t } = useI18n();
  const { show } = useToast();

  const handleCopy = async () => {
    try {
      const url = buildKudosUrl(kudosId);
      await navigator.clipboard.writeText(url);
      show(t('kudos.copy_success'), 'info');
    } catch {
      show(t('kudos.copy_error'), 'error');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 font-montserrat text-sm font-medium text-[#999] transition-colors hover:text-[#FFEA9E]"
    >
      {t('kudos.copy_link')}
      <LinkIcon size={16} />
    </button>
  );
}
