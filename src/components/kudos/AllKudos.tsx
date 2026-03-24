'use client';

import { useState } from 'react';
import { useI18n } from '@/libs/i18n/context';
import { SectionHeader } from './SectionHeader';
import { KudoPostCard } from './KudoPostCard';
import { KudoSkeleton } from './KudoSkeleton';
import { SectionError } from './SectionError';
import { useInfiniteKudos } from '@/hooks/useInfiniteKudos';

export function AllKudos() {
  const { t } = useI18n();
  const [hashtagFilter, setHashtagFilter] = useState<string | undefined>();
  const { kudos, isLoading, isLoadingMore, error, sentinelRef, hasMore, retry } = useInfiniteKudos({
    hashtag: hashtagFilter,
  });

  return (
    <section className="flex w-full flex-col gap-10">
      <SectionHeader subtitle={t('kudos.section_subtitle')} title={t('kudos.all_title')} />

      <div className="flex flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-36">
        {/* Feed column */}
        <div className="flex flex-1 flex-col gap-10" aria-live="polite">
          {isLoading ? (
            <>
              <KudoSkeleton />
              <KudoSkeleton />
              <KudoSkeleton />
            </>
          ) : error ? (
            <SectionError message={t('kudos.error_load')} onRetry={retry} />
          ) : (
            <>
              {kudos.map((kudo) => (
                <KudoPostCard
                  key={kudo.id}
                  kudos={kudo}
                  onHashtagClick={(tag) => setHashtagFilter(tag)}
                />
              ))}

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div ref={sentinelRef} className="flex justify-center py-4">
                  {isLoadingMore && (
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#998C5F] border-t-[#FFEA9E]" />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar slot — will be filled by the page */}
        <div id="kudos-sidebar" className="w-full lg:w-[422px]" />
      </div>
    </section>
  );
}
