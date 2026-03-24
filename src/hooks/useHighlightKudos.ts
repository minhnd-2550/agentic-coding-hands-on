'use client';

import { useState, useEffect, useCallback } from 'react';
import type { KudosWithUser } from '@/types/kudos';

interface UseHighlightKudosOptions {
  hashtag?: string | null;
  department?: string | null;
}

export function useHighlightKudos(options: UseHighlightKudosOptions = {}) {
  const [highlights, setHighlights] = useState<KudosWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (options.hashtag) params.set('hashtag', options.hashtag);
      if (options.department) params.set('department', options.department);

      const res = await fetch(`/api/kudos/highlights?${params}`);
      if (!res.ok) throw new Error('Failed to fetch highlights');

      const data = await res.json() as KudosWithUser[];
      setHighlights(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [options.hashtag, options.department]);

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  return {
    highlights,
    isLoading,
    error,
    retry: fetchHighlights,
  };
}
