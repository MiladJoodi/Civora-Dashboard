export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="skeleton h-4 w-20" />
              <div className="skeleton h-8 w-8 rounded-full" />
            </div>
            <div className="skeleton h-7 w-16" />
            <div className="skeleton h-3 w-24" />
          </div>
        ))}
      </div>
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-64 w-full rounded-lg" />
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
          <div className="skeleton h-5 w-32" />
          <div className="skeleton h-64 w-full rounded-lg" />
        </div>
      </div>
      {/* Table area */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-4">
        <div className="skeleton h-5 w-40" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-4 flex-1" />
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
