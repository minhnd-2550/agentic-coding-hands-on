import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { HeroSection } from "@/components/home/HeroSection";
import { ContentSection } from "@/components/home/ContentSection";
import { AwardsSectionHeader } from "@/components/home/AwardsSectionHeader";
import { AwardsGrid } from "@/components/home/AwardsGrid";
import { KudosSection } from "@/components/home/KudosSection";
import type { Event, AwardCategory } from "@/types/event";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: eventData } = await supabase
    .from("events")
    .select("*")
    .limit(1)
    .single<Event>();

  const { data: categoriesData } = await supabase
    .from("award_categories")
    .select("*")
    .order("display_order", { ascending: true })
    .returns<AwardCategory[]>();

  return (
    <main className="min-h-screen bg-[#00101A]">
      {eventData && <HeroSection event={eventData} />}

      <ContentSection />

      {categoriesData && categoriesData.length > 0 && (
        <section className="bg-[#00101A] py-16 md:py-24 px-4 md:px-12 lg:px-36">
          <AwardsSectionHeader />
          <AwardsGrid categories={categoriesData} />
        </section>
      )}

      <KudosSection />
    </main>
  );
}
