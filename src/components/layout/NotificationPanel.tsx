"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useNotifications } from "@/hooks/useNotifications";
import { useI18n } from "@/libs/i18n/context";

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, loading, hasMore, loadMore } =
    useNotifications();
  const { t } = useI18n();

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      >
        <Image
          src="/icons/bell.svg"
          alt=""
          width={24}
          height={24}
        />
        {unreadCount > 0 && (
          <span
            data-testid="notification-badge"
            className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full"
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-80 max-h-96 bg-[#00070C] border border-[#998C5F] rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-3 border-b border-[#2E3940]">
            <h3 className="text-white font-bold text-sm">{t("notification.title")}</h3>
          </div>

          <div className="overflow-y-auto max-h-72">
            {notifications.length === 0 && !loading ? (
              <p className="text-white/50 text-sm text-center py-8">
                {t("notification.empty")}
              </p>
            ) : (
              <ul>
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`px-3 py-3 border-b border-[#2E3940] last:border-0 ${
                      !n.read ? "bg-[#FFEA9E]/5" : ""
                    }`}
                  >
                    <p className="text-white text-sm font-medium">
                      {n.title}
                    </p>
                    {n.body && (
                      <p className="text-white/50 text-xs mt-0.5">
                        {n.body}
                      </p>
                    )}
                  </li>
                ))}
                {hasMore && (
                  <li className="px-3 py-2 text-center">
                    <button
                      onClick={loadMore}
                      className="text-[#FFEA9E] text-xs hover:underline"
                    >
                      {t("notification.load_more")}
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>

          <div className="p-2 border-t border-[#2E3940] text-center">
            <a
              href="/notifications"
              className="text-[#FFEA9E] text-xs hover:underline"
            >
              {t("notification.view_all")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
