import { KudoSkeleton } from '@/components/kudos/KudoSkeleton';

export default function KudosLoading() {
  return (
    <div className="min-h-screen bg-[#00101A]">
      {/* Hero skeleton */}
      <div className="h-[300px] animate-pulse bg-gradient-to-r from-[#00101A] to-[#2E3940]/30 sm:h-[512px]" />

      {/* Section skeletons */}
      <div className="flex flex-col gap-20 px-4 py-10 sm:px-36 sm:py-20">
        {/* Section header skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-6 w-48 animate-pulse rounded bg-[#998C5F]/20" />
          <div className="h-12 w-80 animate-pulse rounded bg-[#998C5F]/20" />
        </div>

        {/* Kudo cards skeleton */}
        <div className="flex flex-col gap-10">
          <KudoSkeleton />
          <KudoSkeleton />
          <KudoSkeleton />
        </div>
      </div>
    </div>
  );
}
