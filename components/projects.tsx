import { Download } from "lucide-react"
import { FaGithub, FaNpm } from "react-icons/fa"
import NpmDownloadsChart from './npm-downloads-chart'
import CollapsibleSection from './ui/collapsible-section'
import { packages, packageGroups, packagesSnapshotDate } from '@/lib/data'

const packageNames = packages.map((p) => p.name)

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`)
const snapshotLabel = new Date(packagesSnapshotDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export default function Projects() {
  const totalDownloads = packages.reduce((sum, p) => sum + p.monthlyDownloads, 0)
  const groupIds = Object.keys(packageGroups) as (keyof typeof packageGroups)[]

  return (
    <div>
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./packages</p>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">Open-source packages</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {packages.length} npm packages I wrote and maintain, with ~{formatCount(totalDownloads)} combined monthly downloads ({snapshotLabel}). Small, focused libraries that solve one problem well, grouped by what they are for.
        </p>
      </div>

      <NpmDownloadsChart packages={packageNames} />

      {/* Packages, grouped by problem space */}
      <div className="space-y-4">
        {groupIds.map((id) => {
          const group = packageGroups[id]
          const items = packages
            .filter((p) => p.group === id)
            .sort((a, b) => b.monthlyDownloads - a.monthlyDownloads)
          return (
            <section key={id} aria-labelledby={`pkg-${id}`}>
              <CollapsibleSection
                header={<h3 id={`pkg-${id}`} className="font-serif text-xl font-medium text-foreground">{group.title}</h3>}
                summary={<span className="block max-w-2xl">{items.length} packages · {group.blurb}</span>}
              >
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((pkg) => (
                  <div key={pkg.name} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/30">
                    <div className="flex items-start justify-between gap-3">
                      <a href={pkg.npm} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
                        <FaNpm className="h-4 w-4 shrink-0 text-red-500" />
                        <span className="truncate">{pkg.name}</span>
                      </a>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-mono text-muted-foreground" title="Downloads in the last month">
                        <Download className="h-3 w-3" /> {formatCount(pkg.monthlyDownloads)}/mo
                      </span>
                    </div>
                    <p className="text-xs font-body leading-relaxed text-muted-foreground">{pkg.description}</p>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <code className="truncate rounded bg-foreground/5 px-2 py-1 text-[11px] font-mono text-muted-foreground">{pkg.install}</code>
                      <a href={pkg.github} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground hover:text-primary">
                        <FaGithub className="h-3 w-3" /> Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              </CollapsibleSection>
            </section>
          )
        })}
      </div>
    </div>
  )
}
