import { Download, GitPullRequest } from "lucide-react"
import { FaGithub, FaNpm } from "react-icons/fa"
import { TechBadge } from './tech-badge'
import { packages, packageGroups, packagesSnapshotDate } from '@/lib/data'

const featured = {
  title: "OSS Tracker",
  category: "Developer infrastructure",
  description:
    "Self-hosted, read-only GitHub command center for tracking repositories, pull requests, reviews, checks, and contributor activity, with an explainable action inbox for what needs attention next. Next.js client, Node.js API, background sync workers, PostgreSQL and Redis, all runnable with Docker Compose.",
  technologies: ["TypeScript", "Next.js", "PostgreSQL", "Redis", "Docker"],
  github: "https://github.com/vjymisal0/oss-tracker",
}

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`)
const snapshotLabel = new Date(packagesSnapshotDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export default function Projects() {
  const totalDownloads = packages.reduce((sum, p) => sum + p.monthlyDownloads, 0)
  const groupIds = Object.keys(packageGroups) as (keyof typeof packageGroups)[]

  return (
    <div>
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary">04 / Selected work</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Projects & packages</h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          {packages.length} npm packages I wrote and maintain, with ~{formatCount(totalDownloads)} combined monthly downloads ({snapshotLabel}), plus the tool I built to run my open-source workflow.
        </p>
      </div>

      {/* Featured project */}
      <a
        href={featured.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-14 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/60"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary">
            <GitPullRequest className="h-3.5 w-3.5" /> {featured.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground">
            <FaGithub className="h-3.5 w-3.5" /> Code
          </span>
        </div>
        <h3 className="font-serif text-2xl font-medium text-foreground">{featured.title}</h3>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">{featured.description}</p>
        <div className="flex flex-wrap gap-2">
          {featured.technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
        </div>
      </a>

      {/* Packages, grouped by problem space */}
      <div className="space-y-12">
        {groupIds.map((id) => {
          const group = packageGroups[id]
          const items = packages
            .filter((p) => p.group === id)
            .sort((a, b) => b.monthlyDownloads - a.monthlyDownloads)
          return (
            <section key={id} aria-labelledby={`pkg-${id}`}>
              <div className="mb-4">
                <h3 id={`pkg-${id}`} className="font-serif text-xl font-medium text-foreground">{group.title}</h3>
                <p className="mt-1 max-w-2xl text-sm font-body text-muted-foreground">{group.blurb}</p>
              </div>
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
            </section>
          )
        })}
      </div>
    </div>
  )
}
