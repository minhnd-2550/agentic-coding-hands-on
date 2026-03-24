"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCountdown } from "@/hooks/useCountdown";
import { useI18n } from "@/libs/i18n/context";
import { DigitBox } from "./DigitBox";

type CountdownDisplayProps = {
  eventDate: string;
};

function DigitGroup({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const digits = value.padStart(2, "0").split("");
  return (
    <div className="flex flex-col gap-3 lg:gap-[21px] items-center lg:items-start">
      <div className="flex gap-2 md:gap-4 lg:gap-[21px]">
        {digits.map((d, i) => (
          <DigitBox key={i} digit={d} />
        ))}
      </div>
      <span className="text-base md:text-2xl lg:text-[36px] font-bold text-white leading-tight lg:leading-[48px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownDisplay({ eventDate }: CountdownDisplayProps) {
  const { days, hours, minutes, isExpired } = useCountdown(eventDate);
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    if (isExpired) {
      router.push("/");
    }
  }, [isExpired, router]);

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-6">
      <p className="text-xl md:text-[28px] lg:text-[36px] font-bold italic text-white text-center leading-tight lg:leading-[48px]">
        {t("countdown.starts_in")}
      </p>
      <div
        className="flex gap-6 md:gap-10 lg:gap-[60px] items-center"
        role="timer"
        aria-live="polite"
        aria-label={`${days} ${t("countdown.days")} ${hours} ${t("countdown.hours")} ${minutes} ${t("countdown.minutes")}`}
      >
        <DigitGroup value={days} label={t("countdown.days")} />
        <DigitGroup value={hours} label={t("countdown.hours")} />
        <DigitGroup value={minutes} label={t("countdown.minutes")} />
      </div>
    </div>
  );
}
