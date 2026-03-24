import Image from "next/image";
import { AwardPageTitle } from "./AwardPageTitle";

export function AwardHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt="Keyvisual Sun* Annual Award 2025"
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        data-testid="gradient-overlay"
        className="absolute inset-0 bg-gradient-to-t from-[#00101A] via-[#00101A]/40 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* ROOT FURTHER logo */}
        <div className="px-4 md:px-12 lg:px-36 pt-[120px] pb-8 lg:pb-12">
          <Image
            src="/images/root-further-logo.png"
            alt="ROOT FURTHER"
            width={500}
            height={200}
            priority
            className="w-[280px] md:w-[400px] lg:w-[500px] h-auto"
          />
        </div>

        {/* Title section — inside hero so bg image covers it */}
        <div className="px-4 md:px-12 lg:px-36 pb-8 lg:pb-12">
          <div className="max-w-[1152px] mx-auto">
            <AwardPageTitle />
          </div>
        </div>
      </div>
    </section>
  );
}
