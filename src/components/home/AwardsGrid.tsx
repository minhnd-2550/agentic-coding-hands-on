import type { AwardCategory } from "@/types/event";
import { AwardCard } from "./AwardCard";

type AwardsGridProps = {
  categories: AwardCategory[];
};

export function AwardsGrid({ categories }: AwardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
      {categories.map((category) => (
        <AwardCard key={category.id} award={category} />
      ))}
    </div>
  );
}
