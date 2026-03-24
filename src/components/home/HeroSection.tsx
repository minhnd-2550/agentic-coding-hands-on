import Image from "next/image";
import type { Event } from "@/types/event";
import { CountdownTimer } from "./CountdownTimer";
import { EventInfo } from "./EventInfo";
import { CtaButtons } from "./CtaButtons";

type HeroSectionProps = {
  event: Event;
};

export function HeroSection({ event }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-top-right"
        sizes="100vw"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-[#00101A] via-[#00101A]/40 to-transparent" />

      {/* Content — 120px from top (below header) */}
      <div className="relative z-10 w-full px-4 md:px-12 lg:px-36 pt-[120px] pb-12 md:pb-20 flex flex-col gap-5">
        {/* ROOT FURTHER title image */}
        <Image
          src="/images/root-further-logo.png"
          alt="ROOT FURTHER"
          width={500}
          height={200}
          priority
          className="w-[280px] md:w-[400px] lg:w-[500px] h-auto"
        />

        <CountdownTimer eventDate={event.event_date} />

        <EventInfo event={event} />

        <CtaButtons />
      </div>
    </section>
  );
}
