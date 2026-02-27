export function TableSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="space-y-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-72" />
      </div>
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 flex-1 max-w-sm rounded-lg" />
        <div className="skeleton h-10 w-24 rounded-lg" />
      </div>
      {/* Table */}
      <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
        {/* Table header */}
        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50/80 border-b">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-4 flex-1" />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3.5 border-b border-gray-100 last:border-0">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className={`skeleton h-4 flex-1 ${j === 0 ? 'max-w-[60px]' : ''}`} />
            ))}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-40" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-8 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}
