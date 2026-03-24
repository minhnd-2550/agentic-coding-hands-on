import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { HeroSection } from "@/components/home/HeroSection";
import { ContentSection } from "@/components/home/ContentSection";
import { AwardsSectionHeader } from "@/components/home/AwardsSectionHeader";
import { AwardsGrid } from "@/components/home/AwardsGrid";
import { KudosSection } from "@/components/home/KudosSection";
import type { Event, AwardCategory } from "@/types/event";

const FALLBACK_EVENT: Event = {
  id: "fallback",
  event_date: "2025-12-26T18:30:00+07:00",
  venue: "Âu Cơ Art Center",
  broadcast_note: "Tường thuật trực tiếp qua sóng Livestream",
  created_at: "",
};

const FALLBACK_CATEGORIES: AwardCategory[] = [
  { id: "1", name: "Top Talent", slug: "top-talent", short_description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện", thumbnail_url: "/images/award-top-talent.png", display_order: 1, created_at: "" },
  { id: "2", name: "Top Project", slug: "top-project", short_description: "Vinh danh dự án xuất sắc trên mọi phương diện; dự án có doanh thu nổi bật", thumbnail_url: "/images/award-top-project.png", display_order: 2, created_at: "" },
  { id: "3", name: "Top Project Leader", slug: "top-project-leader", short_description: "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá", thumbnail_url: "/images/award-top-project-leader.png", display_order: 3, created_at: "" },
  { id: "4", name: "Best Manager", slug: "best-manager", short_description: "Vinh danh người quản lý có năng lực quản lý tốt; dẫn dắt đội nhóm", thumbnail_url: "/images/award-best-manager.png", display_order: 4, created_at: "" },
  { id: "5", name: "Signature 2025 - Creator", slug: "signature-2025-creator", short_description: "Vinh danh cá nhân có đóng góp sáng tạo nổi bật và để lại dấu ấn riêng", thumbnail_url: "/images/award-signature-creator.png", display_order: 5, created_at: "" },
  { id: "6", name: "MVP (Most Valuable Person)", slug: "mvp", short_description: "Vinh danh cá nhân có giá trị đóng góp lớn nhất cho tổ chức", thumbnail_url: "/images/award-mvp.png", display_order: 6, created_at: "" },
];

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch event data with fallback
  const { data: eventData } = await supabase
    .from("events")
    .select("*")
    .limit(1)
    .single<Event>();
  const event = eventData ?? FALLBACK_EVENT;

  // Fetch award categories with fallback
  const { data: categoriesData } = await supabase
    .from("award_categories")
    .select("*")
    .order("display_order", { ascending: true })
    .returns<AwardCategory[]>();
  const categories = categoriesData ?? FALLBACK_CATEGORIES;

  return (
    <main className="min-h-screen bg-[#00101A]">
      <HeroSection event={event} />

      <ContentSection />

      <section className="bg-[#00101A] py-16 md:py-24 px-4 md:px-12 lg:px-36">
        <AwardsSectionHeader />
        <AwardsGrid categories={categories} />
      </section>

      <KudosSection />
    </main>
  );
}
