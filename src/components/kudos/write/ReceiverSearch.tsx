"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "@/libs/i18n/context";

interface Receiver {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface ReceiverSearchProps {
  value: Receiver | null;
  onChange: (receiver: Receiver | null) => void;
}

export function ReceiverSearch({ value, onChange }: ReceiverSearchProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Receiver[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch users (all or filtered by query)
  const fetchUsers = useCallback(async (q: string) => {
    setIsLoading(true);
    try {
      const url = q.length >= 2
        ? `/api/users/search?q=${encodeURIComponent(q)}`
        : '/api/users/search?q=';
      const res = await fetch(url);
      if (res.ok) {
        const data: { data?: Receiver[] } = await res.json();
        setResults(data.data || []);
        setIsOpen(true);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search users with debounce when typing
  useEffect(() => {
    if (query.length === 0) return; // on focus handles empty case
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchUsers(query), 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, fetchUsers]);

  // Show all users on focus
  const handleFocus = useCallback(() => {
    if (!value && results.length === 0) {
      fetchUsers('');
    } else if (results.length > 0) {
      setIsOpen(true);
    }
  }, [value, results.length, fetchUsers]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = useCallback(
    (user: Receiver) => {
      onChange(user);
      setQuery("");
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange(null);
    setQuery("");
  }, [onChange]);

  return (
    <div className="flex items-start gap-4 max-md:flex-col max-md:gap-2" ref={containerRef}>
      {/* B.1 - Label */}
      <label className="font-bold text-base text-[#2E3940] font-[Montserrat] whitespace-nowrap flex items-center gap-0.5 pt-4 max-md:pt-0 min-w-[100px]">
        <span className="text-red-500 font-bold">*</span>
        {t("kudos.write.receiver_label")}
      </label>

      {/* B.2 - Search Input */}
      <div className="flex-1 relative max-md:w-full">
        {value ? (
          <div className="h-14 border border-[#999] rounded-lg px-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              {value.avatar_url ? (
                <img
                  src={value.avatar_url}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#FFEA9E] flex items-center justify-center text-sm font-bold text-[#2E3940]">
                  {value.name.charAt(0)}
                </div>
              )}
              <span className="text-base text-[#2E3940] font-[Montserrat]">{value.name}</span>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="text-[#999] hover:text-[#2E3940] transition-colors"
              aria-label="Clear receiver"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}
              placeholder={t("kudos.write.receiver_placeholder")}
              className="w-full h-14 border border-[#999] rounded-lg px-4 pr-10 font-[Montserrat] text-base text-[#2E3940] placeholder:text-[#999] transition-colors duration-150 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] focus:outline-none"
              aria-required="true"
              aria-expanded={isOpen}
              aria-autocomplete="list"
              role="combobox"
            />
            {isLoading ? (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="animate-spin h-5 w-5 text-[#999]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              </div>
            ) : (
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        )}

        {/* Dropdown */}
        {isOpen && results.length > 0 && (
          <ul
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#999]/30 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10 max-h-60 overflow-y-auto"
            role="listbox"
          >
            {results.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelect(user)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#FFEA9E]/10 transition-colors"
                role="option"
                aria-selected={false}
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#FFEA9E] flex items-center justify-center text-sm font-bold text-[#2E3940]">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-base text-[#2E3940] font-[Montserrat]">{user.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
