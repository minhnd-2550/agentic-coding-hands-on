'use client';

import { useState, useRef, useCallback } from 'react';
import { HeartIcon } from '@/components/icons/KudosIcons';

interface HeartButtonProps {
  kudosId: string;
  initialCount: number;
  initialHearted: boolean;
}

export function HeartButton({ kudosId, initialCount, initialHearted }: HeartButtonProps) {
  const [hearted, setHearted] = useState(initialHearted);
  const [count, setCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<boolean>(initialHearted);

  const syncWithServer = useCallback(async (shouldHeart: boolean) => {
    try {
      const method = shouldHeart ? 'POST' : 'DELETE';
      const res = await fetch(`/api/kudos/${kudosId}/heart`, { method });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json() as { hearts_count: number };
      setCount(data.hearts_count);
    } catch {
      // Revert optimistic update
      setHearted(!shouldHeart);
      setCount((c) => shouldHeart ? c - 1 : c + 1);
    }
  }, [kudosId]);

  const handleClick = () => {
    const newHearted = !hearted;
    // Optimistic update
    setHearted(newHearted);
    setCount((c) => newHearted ? c + 1 : c - 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    pendingRef.current = newHearted;

    // Debounce 300ms
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      syncWithServer(pendingRef.current);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 transition-transform"
      aria-label={hearted ? 'Liked' : 'Not liked'}
      aria-pressed={hearted}
    >
      <span className={`transition-transform ${isAnimating ? 'scale-125' : 'scale-100'}`}>
        <HeartIcon
          size={20}
          filled={hearted}
          className={hearted ? 'text-[#D4271D]' : 'text-[#999]'}
        />
      </span>
      <span className="font-montserrat text-base font-bold text-[#999]">
        {count.toLocaleString()}
      </span>
    </button>
  );
}
