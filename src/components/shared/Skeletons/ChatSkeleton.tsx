export function ChatSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="space-y-2">
        <div className="skeleton h-7 w-48" />
        <div className="skeleton h-4 w-72" />
      </div>
      <div className="rounded-xl border border-gray-100 bg-white overflow-hidden flex h-[500px]">
        {/* Sidebar */}
        <div className="w-72 border-l border-gray-100 p-4 space-y-3">
          <div className="skeleton h-9 w-full rounded-lg" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <div className="skeleton h-10 w-10 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
        {/* Messages area */}
        <div className="flex-1 p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`skeleton h-12 rounded-xl ${i % 2 === 0 ? 'w-2/3' : 'w-1/2'}`} />
            </div>
          ))}
          <div className="mt-auto">
            <div className="skeleton h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
