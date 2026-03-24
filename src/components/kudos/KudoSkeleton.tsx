export function KudoSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl bg-[#FFF8E1]/10 p-6 sm:p-10">
      {/* Sender/Receiver row */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[#998C5F]/30" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-28 rounded bg-[#998C5F]/30" />
          <div className="h-3 w-20 rounded bg-[#998C5F]/20" />
        </div>
        <div className="mx-2 h-4 w-4 rounded bg-[#998C5F]/20" />
        <div className="h-10 w-10 rounded-full bg-[#998C5F]/30" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-28 rounded bg-[#998C5F]/30" />
          <div className="h-3 w-20 rounded bg-[#998C5F]/20" />
        </div>
      </div>
      {/* Timestamp */}
      <div className="mb-3 h-3 w-32 rounded bg-[#998C5F]/20" />
      {/* Content lines */}
      <div className="mb-4 flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-[#998C5F]/30" />
        <div className="h-4 w-full rounded bg-[#998C5F]/30" />
        <div className="h-4 w-3/4 rounded bg-[#998C5F]/30" />
      </div>
      {/* Hashtags */}
      <div className="mb-4 flex gap-2">
        <div className="h-6 w-20 rounded bg-[#998C5F]/20" />
        <div className="h-6 w-16 rounded bg-[#998C5F]/20" />
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-16 rounded bg-[#998C5F]/20" />
        <div className="h-5 w-20 rounded bg-[#998C5F]/20" />
      </div>
    </div>
  );
}
