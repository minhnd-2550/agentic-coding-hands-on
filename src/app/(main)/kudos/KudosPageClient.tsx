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

// Fallback fake data when API is unavailable (no Supabase running)
const FAKE_SENDER = {
  id: 'user-1', name: 'Huỳnh Dương Xuân Nhật', email: 'nhat@sun-asterisk.com',
  avatar_url: null, department_id: 'dept-1', department_name: 'Engineering',
  star_count: 120, badge: 'Legend Hero',
};
const FAKE_RECEIVER = {
  id: 'user-2', name: 'Huỳnh Dương Xuân', email: 'xuan@sun-asterisk.com',
  avatar_url: null, department_id: 'dept-2', department_name: 'Design',
  star_count: 85, badge: 'Rising Hero',
};
const FAKE_KUDOS: KudosWithUser[] = Array.from({ length: 5 }, (_, i) => ({
  id: `kudos-${i + 1}`, sender_id: FAKE_SENDER.id, receiver_id: FAKE_RECEIVER.id,
  content: 'Cảm ơn người em bình thường nhưng phi thường :D\nCảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. <3 và cuộc sống...',
  hashtags: ['Dedicated', 'Inspiring', 'Creative'], images: [], media_type: null,
  hearts_count: 1000 - i * 100, created_at: new Date(2025, 9, 30, 10 + i, 0).toISOString(),
  sender: FAKE_SENDER, receiver: FAKE_RECEIVER, is_hearted_by_me: i % 2 === 0,
}));
const FAKE_STATS: KudosStats = { kudos_received: 25, kudos_sent: 25, hearts_received: 25, secret_boxes_opened: 2, secret_boxes_unopened: 2 };
const FAKE_SPOTLIGHT: SpotlightEntry[] = [
  { name: 'Nguyễn Hoàng Linh', kudos_count: 45 }, { name: 'Huỳnh Dương Xuân', kudos_count: 38 },
  { name: 'Nguyễn Văn Quý', kudos_count: 32 }, { name: 'Đỗ Hoàng Hiệp', kudos_count: 28 },
  { name: 'Trần Minh Đức', kudos_count: 22 }, { name: 'Lê Thị Hồng', kudos_count: 20 },
  { name: 'Phạm Văn An', kudos_count: 18 }, { name: 'Võ Thanh Hải', kudos_count: 15 },
  { name: 'Ngô Quốc Tuấn', kudos_count: 10 }, { name: 'Nguyễn Bá Chúc', kudos_count: 8 },
];
const FAKE_GIFTS: SecretBoxWithUser[] = Array.from({ length: 5 }, (_, i) => ({
  id: `gift-${i}`, user_id: 'user-1', is_opened: true, gift_description: 'Nhận được 1 sổ phong SAA',
  opened_at: new Date().toISOString(), created_at: new Date().toISOString(),
  user: { ...FAKE_RECEIVER, name: `Huỳnh Dương Xuân ${i + 1}` },
}));
const FAKE_HASHTAGS: Hashtag[] = [{ id: '1', name: 'Dedicated' }, { id: '2', name: 'Inspiring' }, { id: '3', name: 'Creative' }, { id: '4', name: 'Leadership' }];
const FAKE_DEPARTMENTS: Department[] = [{ id: 'dept-1', name: 'Engineering' }, { id: 'dept-2', name: 'Design' }, { id: 'dept-3', name: 'Product' }];

let _fallbackLogged = false;
async function fetchOrFallback<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json() as T;
  } catch {
    // Log once instead of per-request to keep console clean
    if (!_fallbackLogged) {
      _fallbackLogged = true;
      console.info('[Kudos] Supabase unavailable — using fallback data for all endpoints');
    }
    return fallback;
  }
}

export function KudosPageClient() {
  const { t } = useI18n();
  const [kudos, setKudos] = useState<KudosWithUser[]>(FAKE_KUDOS);
  const [highlights, setHighlights] = useState<KudosWithUser[]>(FAKE_KUDOS);
  const [spotlight, setSpotlight] = useState<SpotlightEntry[]>(FAKE_SPOTLIGHT);
  const [stats, setStats] = useState<KudosStats>(FAKE_STATS);
  const [gifts, setGifts] = useState<SecretBoxWithUser[]>(FAKE_GIFTS);
  const [hashtags, setHashtags] = useState<Hashtag[]>(FAKE_HASHTAGS);
  const [departments, setDepartments] = useState<Department[]>(FAKE_DEPARTMENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'api' | 'fallback'>('fallback');

  useEffect(() => {
    async function loadAll() {
      setIsLoading(true);
      const [feedResult, highlightsResult, spotlightResult, statsResult, giftsResult, hashtagsResult, deptsResult] = await Promise.all([
        fetchOrFallback<KudosFeedPage>('/api/kudos', { data: FAKE_KUDOS, nextCursor: null }),
        fetchOrFallback<KudosWithUser[]>('/api/kudos/highlights', FAKE_KUDOS),
        fetchOrFallback<SpotlightEntry[]>('/api/spotlight', FAKE_SPOTLIGHT),
        fetchOrFallback<KudosStats>('/api/users/me/stats', FAKE_STATS),
        fetchOrFallback<SecretBoxWithUser[]>('/api/gifts/recent', FAKE_GIFTS),
        fetchOrFallback<{ data: Hashtag[] }>('/api/hashtags', { data: FAKE_HASHTAGS }),
        fetchOrFallback<Department[]>('/api/departments', FAKE_DEPARTMENTS),
      ]);

      setKudos(feedResult.data);
      setHighlights(highlightsResult);
      setSpotlight(spotlightResult);
      setStats(statsResult);
      setGifts(giftsResult);
      setHashtags(hashtagsResult.data);
      setDepartments(deptsResult);

      // Detect if we got real data
      const isReal = feedResult.data.length > 0 && feedResult.data[0].id !== 'kudos-1';
      setDataSource(isReal ? 'api' : 'fallback');
      setIsLoading(false);
    }
    loadAll();
  }, []);

  return (
    <div className="min-h-screen bg-[#00101A]">
      {/* Data source indicator (dev only) */}
      {dataSource === 'fallback' && (
        <div className="fixed bottom-4 left-4 z-50 rounded-lg bg-yellow-600/90 px-3 py-1.5 font-montserrat text-xs font-bold text-white shadow-lg">
          Fake Data Mode (Supabase unavailable)
        </div>
      )}

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
