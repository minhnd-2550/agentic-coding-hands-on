'use client';

import { useEffect, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface UseSupabaseRealtimeOptions<T extends Record<string, unknown>> {
  table: string;
  event?: RealtimeEvent;
  filter?: string;
  onInsert?: (payload: T) => void;
  onUpdate?: (payload: T) => void;
  onDelete?: (payload: T) => void;
  onChange?: (payload: RealtimePostgresChangesPayload<T>) => void;
  enabled?: boolean;
}

export function useSupabaseRealtime<T extends Record<string, unknown>>({
  table,
  event = '*',
  filter,
  onInsert,
  onUpdate,
  onDelete,
  onChange,
  enabled = true,
}: UseSupabaseRealtimeOptions<T>) {
  const callbacksRef = useRef({ onInsert, onUpdate, onDelete, onChange });
  callbacksRef.current = { onInsert, onUpdate, onDelete, onChange };

  useEffect(() => {
    if (!enabled) return;

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    const channelName = `realtime-${table}-${event}-${filter || 'all'}`;

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as 'system',
        {
          event,
          schema: 'public',
          table,
          ...(filter ? { filter } : {}),
        } as unknown as { event: string },
        (payload: RealtimePostgresChangesPayload<T>) => {
          callbacksRef.current.onChange?.(payload);

          if (payload.eventType === 'INSERT' && callbacksRef.current.onInsert) {
            callbacksRef.current.onInsert(payload.new as T);
          }
          if (payload.eventType === 'UPDATE' && callbacksRef.current.onUpdate) {
            callbacksRef.current.onUpdate(payload.new as T);
          }
          if (payload.eventType === 'DELETE' && callbacksRef.current.onDelete) {
            callbacksRef.current.onDelete(payload.old as T);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, filter, enabled]);
}
