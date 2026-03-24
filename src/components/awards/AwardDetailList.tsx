import type { AwardCategoryDetail } from "@/types/award";
import { AwardDetailCard } from "./AwardDetailCard";

type AwardDetailListProps = {
  awards: AwardCategoryDetail[];
};

export function AwardDetailList({ awards }: AwardDetailListProps) {
  return (
    <div className="flex flex-col">
      {awards.map((award, index) => (
        <div key={award.id}>
          {index > 0 && (
            <div
              data-testid="card-divider"
              className="w-full h-px bg-[#2E3940] my-12 lg:my-20"
            />
          )}
          <AwardDetailCard award={award} reversed={index % 2 !== 0} />
        </div>
      ))}
    </div>
  );
}
