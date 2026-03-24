"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient, isSupabaseReachable } from "@/libs/supabase/client";
import type { Notification } from "@/types/notification";

const PAGE_SIZE = 5;

type UseNotificationsResult = {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  loadMore: () => void;
  markAsRead: (id: string) => Promise<void>;
};

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const supabase = createClient();

  const fetchNotifications = useCallback(
    async (pageNum: number, append = false) => {
      setLoading(true);

      // Skip fetch entirely if Supabase is unreachable (avoids ERR_CONNECTION_REFUSED in console)
      const reachable = await isSupabaseReachable();
      if (!reachable) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const from = pageNum * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error: fetchError } = await supabase
          .from("notifications")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(from, to);

        if (fetchError || !data) {
          setError(true);
          setLoading(false);
          return;
        }

        setNotifications((prev) => (append ? [...prev, ...data] : data));
        setHasMore(data.length === PAGE_SIZE);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    },
    [supabase],
  );

  useEffect(() => {
    fetchNotifications(0);
  }, [fetchNotifications]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage, true);
  }, [page, fetchNotifications]);

  const markAsRead = useCallback(
    async (id: string) => {
      await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", id);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    },
    [supabase],
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    hasMore,
    loadMore,
    markAsRead,
  };
}
