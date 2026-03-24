'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { KudoHighlightCard } from './KudoHighlightCard';
import { CarouselArrow } from './CarouselArrow';
import { CarouselPagination } from './CarouselPagination';
import type { KudosWithUser } from '@/types/kudos';

interface HighlightCarouselProps {
  highlights: KudosWithUser[];
}

export function HighlightCarousel({ highlights }: HighlightCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = highlights.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(528);
  const [containerWidth, setContainerWidth] = useState(1440);

  // Measure container on mount and resize
  useEffect(() => {
    function measure() {
      if (trackRef.current?.parentElement) {
        const cw = trackRef.current.parentElement.offsetWidth;
        setContainerWidth(cw);
        // On mobile: card = full width - padding, on desktop: 528px
        setCardWidth(cw < 768 ? cw - 32 : 528);
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, total - 1)));
  }, [total]);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  if (total === 0) return null;

  const gap = 24;
  // Offset to center the active card in the container
  const centerOffset = (containerWidth - cardWidth) / 2;
  const translateX = centerOffset - currentIndex * (cardWidth + gap);

  return (
    <div className="flex flex-col gap-10">
      {/* Carousel track */}
      <div className="relative overflow-hidden py-4">
        {/* Fade gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#00101A] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#00101A] to-transparent sm:w-32" />

        {/* Arrow buttons */}
        <div className="absolute left-2 top-1/2 z-20 -translate-y-1/2 sm:left-8">
          <CarouselArrow direction="left" disabled={currentIndex === 0} onClick={goPrev} />
        </div>
        <div className="absolute right-2 top-1/2 z-20 -translate-y-1/2 sm:right-8">
          <CarouselArrow direction="right" disabled={currentIndex >= total - 1} onClick={goNext} />
        </div>

        {/* Cards track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
          }}
        >
          {highlights.map((kudos, index) => (
            <div
              key={kudos.id}
              className="flex-shrink-0 transition-all duration-300"
              style={{ width: `${cardWidth}px` }}
            >
              <KudoHighlightCard
                kudos={kudos}
                isActive={index === currentIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <CarouselPagination
        current={currentIndex + 1}
        total={total}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
