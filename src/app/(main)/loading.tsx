export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#00101A]">
      {/* Hero skeleton */}
      <section className="h-screen animate-pulse bg-[#0a1520]" />

      {/* Content skeleton */}
      <section className="py-16 px-4 md:px-12 lg:px-36">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="h-16 w-60 bg-[#1a2332] rounded" />
          <div className="h-4 w-full bg-[#1a2332] rounded" />
          <div className="h-4 w-5/6 bg-[#1a2332] rounded" />
          <div className="h-4 w-4/6 bg-[#1a2332] rounded" />
        </div>
      </section>

      {/* Awards grid skeleton */}
      <section className="py-16 px-4 md:px-12 lg:px-36">
        <div className="h-6 w-40 bg-[#1a2332] rounded mb-4" />
        <div className="h-10 w-64 bg-[#1a2332] rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 animate-pulse">
              <div className="aspect-square bg-[#1a2332] rounded-lg" />
              <div className="h-5 w-32 bg-[#1a2332] rounded" />
              <div className="h-4 w-full bg-[#1a2332] rounded" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
