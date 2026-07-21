export default function BlogLoading() {
  return (
    <section className="section-scroll relative h-full">
      <div className="mx-auto max-w-2xl px-5 py-16 pb-28 sm:px-6 sm:py-20 lg:pb-20">
        <div className="animate-pulse">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="mt-5 h-12 w-64 rounded bg-muted" />
          <div className="mt-3 h-12 w-48 rounded bg-muted" />
          <div className="mt-6 h-4 w-80 max-w-full rounded bg-muted" />
        </div>

        <div className="mt-14">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[3.25rem_1fr] gap-4 border-t border-border py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
            >
              <div className="animate-pulse space-y-1.5 pt-1" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="h-2.5 w-8 rounded bg-muted" />
                <div className="h-2.5 w-8 rounded bg-muted" />
              </div>
              <div className="animate-pulse space-y-3" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-3.5 w-full rounded bg-muted" />
                <div className="h-3.5 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
