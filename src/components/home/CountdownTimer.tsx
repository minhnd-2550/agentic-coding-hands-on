"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { useI18n } from "@/libs/i18n/context";

type CountdownTimerProps = {
  eventDate: string;
};

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {value.split("").map((digit, i) => (
          <div
            key={i}
            className="w-10 h-14 md:w-12 md:h-16 bg-[#1a2332] rounded-md flex items-center justify-center text-white text-2xl md:text-3xl font-bold"
          >
            {digit}
          </div>
        ))}
      </div>
      <span className="text-xs text-white/70 tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ eventDate }: CountdownTimerProps) {
  const { days, hours, minutes, isExpired } = useCountdown(eventDate);
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-4">
      {!isExpired && (
        <p className="text-[#FFEA9E] text-sm font-medium tracking-wide">
          {t("home.coming_soon")}
        </p>
      )}
      <div className="flex items-center gap-4 md:gap-6">
        <CountdownUnit value={days} label={t("countdown.days")} />
        <CountdownUnit value={hours} label={t("countdown.hours")} />
        <CountdownUnit value={minutes} label={t("countdown.minutes")} />
      </div>
    </div>
  );
}
