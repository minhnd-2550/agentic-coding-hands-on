import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/libs/supabase/server";
import { CountdownDisplay } from "@/components/prelaunch/CountdownDisplay";
import type { Event } from "@/types/event";

const FALLBACK_EVENT_DATE = "2025-12-26T18:30:00+07:00";

export const metadata: Metadata = {
  title: "Countdown | SAA 2025",
  description: "Sự kiện Sun* Annual Awards 2025 sắp bắt đầu!",
};

export default async function PrelaunchPage() {
  const supabase = await createClient();

  // Fetch event date
  const { data: eventData } = await supabase
    .from("events")
    .select("event_date")
    .limit(1)
    .single<Pick<Event, "event_date">>();

  const eventDate = eventData?.event_date ?? FALLBACK_EVENT_DATE;

  // Server-side redirect if event already started
  if (new Date(eventDate).getTime() <= Date.now()) {
    redirect("/");
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#00101A]">
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay — 18deg angle per design */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0) 63.41%)",
        }}
      />

      {/* Centered countdown content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <CountdownDisplay eventDate={eventDate} />
      </div>
    </div>
  );
}
