'use client';

import { useState, useEffect, useCallback } from 'react';
import type { KudosStats } from '@/types/kudos';
import { useSupabaseRealtime } from './useSupabaseRealtime';

export function useKudosStats() {
  const [stats, setStats] = useState<KudosStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/users/me/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json() as KudosStats;
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Re-fetch on kudos/hearts/secret_box changes
  useSupabaseRealtime({ table: 'kudos', onInsert: () => fetchStats() });
  useSupabaseRealtime({ table: 'hearts', onChange: () => fetchStats() });
  useSupabaseRealtime({ table: 'secret_boxes', onUpdate: () => fetchStats() });

  return { stats, isLoading, error, retry: fetchStats };
}
