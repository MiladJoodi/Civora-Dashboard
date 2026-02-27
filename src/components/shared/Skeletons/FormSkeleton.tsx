export function FormSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="space-y-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-72" />
      </div>
      {/* Form card */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 space-y-6">
        <div className="skeleton h-5 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <div className="skeleton h-10 w-24 rounded-lg" />
          <div className="skeleton h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
