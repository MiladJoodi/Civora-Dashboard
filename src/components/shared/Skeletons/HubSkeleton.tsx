export function HubSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="space-y-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-72" />
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-8 w-8 rounded-full" />
            </div>
            <div className="skeleton h-7 w-16" />
          </div>
        ))}
      </div>
      {/* Preview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="skeleton h-10 w-10 rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            </div>
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
