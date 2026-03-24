import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { AwardHero } from "@/components/awards/AwardHero";
import { AwardSection } from "@/components/awards/AwardSection";
import { AwardKudosSection } from "@/components/awards/AwardKudosSection";
import { AWARD_CATEGORIES } from "@/components/awards/data";

/**
 * Preview page for visual testing — bypasses auth.
 * TODO: Remove before production deployment.
 */
export default function PreviewAwardInformationPage() {
  return (
    <>
      <Header variant="full" />
      <main className="min-h-screen bg-[#00101A] pt-20">
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
      <Footer variant="full" />
    </>
  );
}
