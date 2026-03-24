import Image from "next/image";
import { CountdownDisplay } from "@/components/prelaunch/CountdownDisplay";

/**
 * Preview page for visual testing — uses a future date so countdown always shows.
 * TODO: Remove before production deployment.
 */

// Set to 5 days from now for preview
const PREVIEW_DATE = new Date(
  Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 20 * 60 * 1000
).toISOString();

export default function PreviewPrelaunchPage() {
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
        <CountdownDisplay eventDate={PREVIEW_DATE} />
      </div>
    </div>
  );
}
