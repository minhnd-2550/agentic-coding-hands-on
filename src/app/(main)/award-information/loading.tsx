export default function AwardInformationLoading() {
  return (
    <main className="min-h-screen bg-[#00101A] animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[300px] lg:h-[547px] bg-[#0a1520]" />

      <div className="px-4 md:px-12 lg:px-36 py-12 lg:py-16">
        <div className="max-w-[1152px] mx-auto">
          {/* Title skeleton */}
          <div className="flex flex-col gap-4 items-center mb-16">
            <div className="h-8 w-64 bg-[#2E3940] rounded" />
            <div className="h-px w-full bg-[#2E3940]" />
            <div className="h-16 w-96 bg-[#2E3940] rounded" />
          </div>

          {/* Cards skeleton */}
          <div className="flex flex-col gap-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-10">
                <div className="w-[280px] lg:w-[336px] aspect-square bg-[#2E3940] rounded-lg mx-auto lg:mx-0" />
                <div className="flex-1 flex flex-col gap-6">
                  <div className="h-8 w-48 bg-[#2E3940] rounded" />
                  <div className="h-24 w-full max-w-[480px] bg-[#2E3940] rounded" />
                  <div className="h-px bg-[#2E3940]" />
                  <div className="h-12 w-32 bg-[#2E3940] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
