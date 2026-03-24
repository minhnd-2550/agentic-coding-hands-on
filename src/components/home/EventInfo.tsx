"use client";

import type { Event } from "@/types/event";
import { useI18n } from "@/libs/i18n/context";

type EventInfoProps = {
  event: Event;
};

export function EventInfo({ event }: EventInfoProps) {
  const { t } = useI18n();
  const date = new Date(event.event_date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <span>
          <span className="text-[#FFEA9E]/70 font-light">{t("home.event_time")}: </span>
          <span className="text-[#FFEA9E] font-medium">{formattedDate}</span>
        </span>
        <span>
          <span className="text-[#FFEA9E]/70 font-light">{t("home.event_venue")}: </span>
          <span className="text-[#FFEA9E] font-medium">{event.venue}</span>
        </span>
      </div>
      {event.broadcast_note && (
        <p className="text-white/50 text-xs">{event.broadcast_note}</p>
      )}
    </div>
  );
}
