'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SecretBoxWithUser } from '@/types/kudos';
import { useSupabaseRealtime } from './useSupabaseRealtime';

export function useRecentGifts() {
  const [gifts, setGifts] = useState<SecretBoxWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGifts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gifts/recent');
      if (!res.ok) throw new Error('Failed to fetch gifts');
      const data = await res.json() as SecretBoxWithUser[];
      setGifts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  // Re-fetch on new opened boxes
  useSupabaseRealtime({ table: 'secret_boxes', onUpdate: () => fetchGifts() });

  return { gifts, isLoading, error, retry: fetchGifts };
}
