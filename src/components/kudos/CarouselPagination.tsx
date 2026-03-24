'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/KudosIcons';

interface CarouselPaginationProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselPagination({ current, total, onPrev, onNext }: CarouselPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={onPrev}
        disabled={current <= 1}
        aria-label="Previous page"
        className={`text-[#FFEA9E] transition-opacity ${current <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'}`}
      >
        <ChevronLeftIcon size={24} />
      </button>
      <span className="font-montserrat text-2xl font-bold text-[#FFEA9E] sm:text-[32px] sm:leading-10">
        {current}<span className="text-[#999]">/{total}</span>
      </span>
      <button
        onClick={onNext}
        disabled={current >= total}
        aria-label="Next page"
        className={`text-[#FFEA9E] transition-opacity ${current >= total ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'}`}
      >
        <ChevronRightIcon size={24} />
      </button>
    </div>
  );
}
