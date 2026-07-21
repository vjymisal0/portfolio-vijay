export default function BlogLoading() {
  return (
    <section className="section-scroll relative h-full bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28 lg:pb-16 space-y-3">
        <div className="flex flex-col items-center animate-pulse">
          <div className="h-7 w-56 rounded bg-muted" />
          <span className="mt-2 h-[3px] w-10 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
        </div>
        <div className="h-4 w-64 rounded bg-muted mx-auto animate-pulse" />

        <div className="grid gap-5 sm:grid-cols-2 pt-8 max-w-3xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/80 p-4 space-y-3 animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-4 w-4/5 rounded bg-muted" />
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="flex gap-1.5 pt-1">
                <div className="h-4 w-16 rounded-full bg-muted" />
                <div className="h-4 w-12 rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
