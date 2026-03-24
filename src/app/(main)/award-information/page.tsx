import type { Metadata } from "next";
import { AwardHero } from "@/components/awards/AwardHero";
import { AwardSection } from "@/components/awards/AwardSection";
import { AwardKudosSection } from "@/components/awards/AwardKudosSection";
import { AWARD_CATEGORIES } from "@/components/awards/data";

export const metadata: Metadata = {
  title: "Hệ thống giải thưởng | SAA 2025",
  description:
    "Thông tin chi tiết về hệ thống giải thưởng Sun* Annual Awards 2025: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP.",
};

export default function AwardInformationPage() {
  return (
    <main className="min-h-screen bg-[#00101A]">
      <AwardHero />

      <div className="px-4 md:px-12 lg:px-36 py-12 lg:py-16">
        <div className="max-w-[1152px] mx-auto">
          <AwardSection awards={AWARD_CATEGORIES} />
        </div>
      </div>

      <div className="px-4 md:px-12 lg:px-36 pb-12">
        <div className="max-w-[1152px] mx-auto">
          <AwardKudosSection />
        </div>
      </div>
    </main>
  );
}
