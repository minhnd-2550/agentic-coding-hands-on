"use client";

import { useState, useEffect } from "react";

type CountdownResult = {
  days: string;
  hours: string;
  minutes: string;
  isExpired: boolean;
};

function pad(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

function calculate(targetIso: string): CountdownResult {
  const diff = new Date(targetIso).getTime() - Date.now();

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", isExpired: true };
  }

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    isExpired: false,
  };
}

export function useCountdown(targetDate: string): CountdownResult {
  const [state, setState] = useState(() => calculate(targetDate));

  useEffect(() => {
    // Recalculate immediately and every 60 seconds
    setState(calculate(targetDate));
    const interval = setInterval(() => {
      setState(calculate(targetDate));
    }, 60000);

    // Recalculate when tab becomes visible again (fixes drift from backgrounded tabs)
    function handleVisibility() {
      if (document.visibilityState === "visible") {
        setState(calculate(targetDate));
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [targetDate]);

  return state;
}
