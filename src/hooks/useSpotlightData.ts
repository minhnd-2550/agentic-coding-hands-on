'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SpotlightEntry } from '@/types/kudos';
import { useSupabaseRealtime } from './useSupabaseRealtime';

export function useSpotlightData() {
  const [data, setData] = useState<SpotlightEntry[]>([]);
  const [totalKudos, setTotalKudos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/spotlight');
      if (!res.ok) throw new Error('Failed to fetch spotlight data');
      const entries = await res.json() as SpotlightEntry[];
      setData(entries);
      setTotalKudos(entries.reduce((sum, e) => sum + e.kudos_count, 0));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Re-fetch on new kudos
  useSupabaseRealtime({ table: 'kudos', event: 'INSERT', onInsert: () => fetchData() });

  return { data, totalKudos, isLoading, error, retry: fetchData };
}
