export function ThreadOptions({ threadCount }: { threadCount: number }) {
  return (
    <div className="space-y-6">
      {[...Array(threadCount)].map((_, i) => (
        <div
          key={i}
          className="border-2 border-dpro-primary rounded-3xl p-5 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-2 w-full">
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
              <div className="w-5/6 h-3 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThreadsSkeleton({ threadCount }: { threadCount: number }) {
  return (
    <div className="w-full">
      <p className="text-2xl text-dpro-primary font-bold">Recent Threads</p>

      <div className="flex gap-6 mb-6">
        {["All", "Recent", "Unanswered", "Unresolved", "Solved"].map(
          (filter) => (
            <button
              key={filter}
              className={`pt-4 font-medium text-dpro-primary text-xl `}
            >
              {filter}
            </button>
          )
        )}
      </div>

      <ThreadOptions threadCount={threadCount} />
    </div>
  );
}
