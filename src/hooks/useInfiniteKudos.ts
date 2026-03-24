'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { KudosWithUser, KudosFeedPage } from '@/types/kudos';
import { useSupabaseRealtime } from './useSupabaseRealtime';

interface UseInfiniteKudosOptions {
  hashtag?: string;
  department?: string;
}

export function useInfiniteKudos(options: UseInfiniteKudosOptions = {}) {
  const [kudos, setKudos] = useState<KudosWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const initialLoadDone = useRef(false);

  const fetchPage = useCallback(async (cursor?: string) => {
    const isFirstPage = !cursor;
    if (isFirstPage) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      const params = new URLSearchParams();
      if (cursor) params.set('cursor', cursor);
      if (options.hashtag) params.set('hashtag', options.hashtag);
      if (options.department) params.set('department', options.department);

      const res = await fetch(`/api/kudos?${params}`);
      if (!res.ok) throw new Error('Failed to fetch kudos');

      const data: KudosFeedPage = await res.json();
      setKudos((prev) => isFirstPage ? data.data : [...prev, ...data.data]);
      setNextCursor(data.nextCursor);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [options.hashtag, options.department]);

  // Initial load
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchPage();
    }
  }, [fetchPage]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || !nextCursor || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && nextCursor && !isLoadingMore) {
          fetchPage(nextCursor);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [nextCursor, isLoadingMore, fetchPage]);

  // Realtime: prepend new kudos
  useSupabaseRealtime({
    table: 'kudos',
    event: 'INSERT',
    onInsert: (newKudo) => {
      // Refetch to get full data with joins
      fetch(`/api/kudos?limit=1`)
        .then((r) => r.json() as Promise<KudosFeedPage>)
        .then((data) => {
          if (data.data?.[0]) {
            setKudos((prev) => {
              // Avoid duplicates
              if (prev.some((k) => k.id === data.data[0].id)) return prev;
              return [data.data[0], ...prev];
            });
          }
        })
        .catch(() => {/* ignore realtime refresh errors */});
    },
  });

  const retry = useCallback(() => {
    setKudos([]);
    setNextCursor(null);
    initialLoadDone.current = false;
    fetchPage();
  }, [fetchPage]);

  return {
    kudos,
    isLoading,
    isLoadingMore,
    error,
    sentinelRef,
    hasMore: nextCursor !== null,
    retry,
  };
}
