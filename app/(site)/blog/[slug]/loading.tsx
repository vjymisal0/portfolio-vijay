export default function BlogPostLoading() {
  return (
    <div className="section-scroll relative h-full">
      <div className="mx-auto max-w-2xl px-5 py-12 pb-28 sm:px-6 sm:py-16 lg:pb-20">
        <div className="mb-10 h-3 w-24 animate-pulse rounded bg-muted" />

        <div className="animate-pulse">
          <div className="h-3 w-40 rounded bg-muted" />
          <div className="mt-5 h-10 w-4/5 rounded bg-muted" />
          <div className="mt-4 h-6 w-full rounded bg-muted" />
          <hr className="mt-8 border-t border-border" />
        </div>

        <div className="mt-10 space-y-3.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-muted"
              style={{ width: `${88 - (i % 3) * 16}%`, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
