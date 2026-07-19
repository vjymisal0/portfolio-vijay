export default function BlogPostLoading() {
  return (
    <div className="section-scroll relative h-full">
      <article className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28 lg:pb-16 max-w-2xl">
        <div className="h-4 w-40 rounded bg-muted animate-pulse mb-8" />

        <div className="space-y-3 animate-pulse mb-10">
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-8 w-4/5 rounded bg-muted" />
          <span className="block h-[3px] w-10 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
          <div className="flex gap-1.5 pt-1">
            <div className="h-4 w-16 rounded-full bg-muted" />
            <div className="h-4 w-12 rounded-full bg-muted" />
          </div>
        </div>

        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-3.5 rounded bg-muted"
              style={{ width: `${85 - (i % 3) * 15}%`, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </article>
    </div>
  )
}
