'use client';

import { useState, useEffect } from 'react';
import { KudosHero } from '@/components/kudos/KudosHero';
import { HighlightKudos } from '@/components/kudos/HighlightKudos';
import { SpotlightBoard } from '@/components/kudos/SpotlightBoard';
import { KudoPostCard } from '@/components/kudos/KudoPostCard';
import { SectionHeader } from '@/components/kudos/SectionHeader';
import { KudoSkeleton } from '@/components/kudos/KudoSkeleton';
import { SectionError } from '@/components/kudos/SectionError';
import { KudosStatsCard } from '@/components/kudos/KudosStatsCard';
import { RecentGiftsList } from '@/components/kudos/RecentGiftsList';
import { useI18n } from '@/libs/i18n/context';
import type { KudosWithUser, SpotlightEntry, KudosStats, SecretBoxWithUser, Hashtag, Department, KudosFeedPage } from '@/types/kudos';

const EMPTY_STATS: KudosStats = { kudos_received: 0, kudos_sent: 0, hearts_received: 0, secret_boxes_opened: 0, secret_boxes_unopened: 0 };

async function fetchData<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json() as T;
  } catch {
    return fallback;
  }
}

export function KudosPageClient() {
  const { t } = useI18n();
  const [kudos, setKudos] = useState<KudosWithUser[]>([]);
  const [highlights, setHighlights] = useState<KudosWithUser[]>([]);
  const [spotlight, setSpotlight] = useState<SpotlightEntry[]>([]);
  const [stats, setStats] = useState<KudosStats>(EMPTY_STATS);
  const [gifts, setGifts] = useState<SecretBoxWithUser[]>([]);
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setIsLoading(true);
      const [feedResult, highlightsResult, spotlightResult, statsResult, giftsResult, hashtagsResult, deptsResult] = await Promise.all([
        fetchData<KudosFeedPage>('/api/kudos', { data: [], nextCursor: null }),
        fetchData<KudosWithUser[]>('/api/kudos/highlights', []),
        fetchData<SpotlightEntry[]>('/api/spotlight', []),
        fetchData<KudosStats>('/api/users/me/stats', EMPTY_STATS),
        fetchData<SecretBoxWithUser[]>('/api/gifts/recent', []),
        fetchData<{ data: Hashtag[] }>('/api/hashtags', { data: [] }),
        fetchData<Department[]>('/api/departments', []),
      ]);

      setKudos(feedResult.data);
      setHighlights(highlightsResult);
      setSpotlight(spotlightResult);
      setStats(statsResult);
      setGifts(giftsResult);
      setHashtags(hashtagsResult.data);
      setDepartments(deptsResult);
      setIsLoading(false);
    }
    loadAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#00101A]">
      <KudosHero />

      <HighlightKudos
        initialHighlights={highlights}
        hashtags={hashtags}
        departments={departments}
      />

      <SpotlightBoard initialData={spotlight} />

      {/* ALL KUDOS Feed */}
      <section className="py-10 sm:py-20">
        <SectionHeader subtitle={t('kudos.section_subtitle')} title={t('kudos.all_title')} />
        <div className="mt-10 flex flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-36">
          <div className="flex flex-1 flex-col gap-10" aria-live="polite">
            {isLoading ? (
              <>
                <KudoSkeleton />
                <KudoSkeleton />
                <KudoSkeleton />
              </>
            ) : kudos.length === 0 ? (
              <SectionError message={t('kudos.no_kudos_yet')} onRetry={() => window.location.reload()} />
            ) : (
              kudos.map((kudo) => (
                <KudoPostCard key={kudo.id} kudos={kudo} />
              ))
            )}
          </div>
          <div className="flex w-full flex-col gap-6 lg:w-[422px]">
            <KudosStatsCard stats={stats} isLoading={isLoading} />
            <RecentGiftsList gifts={gifts} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </div>
  );
}
