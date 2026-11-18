import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { contributions, kindMeta } from '@/lib/data'

const COUNT = 4

// ISO dates sort lexicographically, so this is newest first.
const recent = [...contributions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, COUNT)

// Fixed locale and time zone so the server and the browser render the same text.
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

// A terminal-style card listing the latest merged pull requests. The data is
// refreshed daily, so the hero always shows current work.
export default function RecentMerges() {
  return (
    <aside aria-label="Latest merged pull requests" className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-2.5">
        {['bg-red-400/70', 'bg-amber-400/70', 'bg-emerald-400/70'].map((color) => (
          <span key={color} aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${color}`} />
        ))}
        <p className="ml-2 truncate text-[11px] text-muted-foreground">
          <span className="text-primary">$</span> git log --merged -{COUNT}
        </p>
      </div>
      <ul className="divide-y divide-border">
        {recent.map((c) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 transition-colors hover:bg-foreground/[0.03]">
              <span className="flex items-center justify-between gap-3 text-xs">
                <span className="flex min-w-0 items-center gap-2 font-medium text-foreground">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: kindMeta[c.kind].hex }} />
                  <span className="truncate">{c.repo}</span>
                </span>
                <time dateTime={c.date} className="shrink-0 text-[11px] text-muted-foreground">{formatDate(c.date)}</time>
              </span>
              <span className="mt-1 block truncate font-body text-xs text-muted-foreground">{c.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <Link href="/oss" className="flex min-h-11 items-center justify-between gap-2 border-t border-border px-4 text-xs font-medium text-primary transition-colors hover:bg-primary/5">
        All {contributions.length} merged pull requests <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </aside>
  )
}
