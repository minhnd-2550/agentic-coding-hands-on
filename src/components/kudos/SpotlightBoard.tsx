'use client';

import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/libs/i18n/context';
import { SectionHeader } from './SectionHeader';
import { SpotlightWordCloud } from './SpotlightWordCloud';
import { SectionError } from './SectionError';
import { EmptyState } from './EmptyState';
import type { SpotlightEntry } from '@/types/kudos';

interface SpotlightBoardProps {
  initialData?: SpotlightEntry[];
}

export function SpotlightBoard({ initialData = [] }: SpotlightBoardProps) {
  const { t } = useI18n();
  const [data] = useState<SpotlightEntry[]>(initialData);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1157, height: 548 });
  const containerRef = useRef<HTMLDivElement>(null);

  const totalKudos = data.reduce((sum, e) => sum + e.kudos_count, 0);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        // Responsive heights
        const h = w < 768 ? 300 : w < 1024 ? 400 : 548;
        setDimensions({ width: w, height: h });
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="flex w-full flex-col gap-10 py-10 sm:py-20">
      <SectionHeader subtitle={t('kudos.section_subtitle')} title={t('kudos.spotlight_title')} />

      <div className="flex justify-center px-4 sm:px-36">
        <div
          ref={containerRef}
          className="w-full overflow-hidden rounded-[24px] border border-[#998C5F] sm:rounded-[47px] lg:w-[1157px]"
        >
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center sm:h-[400px] lg:h-[548px]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#998C5F] border-t-[#FFEA9E]" />
            </div>
          ) : error ? (
            <div className="p-8">
              <SectionError message={t('kudos.error_spotlight')} onRetry={() => {}} />
            </div>
          ) : data.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center sm:h-[400px] lg:h-[548px]">
              <EmptyState message={t('kudos.spotlight_no_data')} />
            </div>
          ) : (
            <SpotlightWordCloud
              data={data}
              totalKudos={totalKudos}
              width={dimensions.width}
              height={dimensions.height}
            />
          )}
        </div>
      </div>
    </section>
  );
}
