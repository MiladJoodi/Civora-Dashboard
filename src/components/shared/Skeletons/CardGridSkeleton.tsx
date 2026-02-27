export function CardGridSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="space-y-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-72" />
      </div>
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white overflow-hidden">
            <div className="skeleton h-40 w-full" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-2/3" />
              <div className="flex items-center gap-2 mt-2">
                <div className="skeleton h-6 w-16 rounded-full" />
                <div className="skeleton h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
