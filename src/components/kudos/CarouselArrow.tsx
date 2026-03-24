'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/KudosIcons';

interface CarouselArrowProps {
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}

export function CarouselArrow({ direction, disabled, onClick }: CarouselArrowProps) {
  const Icon = direction === 'left' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white transition-colors
        ${disabled ? 'cursor-not-allowed opacity-30 pointer-events-none' : 'hover:bg-black/70 cursor-pointer'}
      `}
    >
      <Icon size={24} />
    </button>
  );
}
