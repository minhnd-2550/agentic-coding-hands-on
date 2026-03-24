'use client';

import { GiftIcon } from '@/components/icons/KudosIcons';
import { useI18n } from '@/libs/i18n/context';

interface OpenGiftButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function OpenGiftButton({ disabled, onClick }: OpenGiftButtonProps) {
  const { t } = useI18n();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[60px] w-full items-center justify-center gap-2 rounded-lg bg-[#FFEA9E] font-montserrat text-base font-bold text-[#00101A] transition-colors
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#FFE082] active:bg-[#FFD54F]'}
      `}
    >
      {t('kudos.open_gift')}
      <GiftIcon size={20} className="text-[#00101A]" />
    </button>
  );
}
