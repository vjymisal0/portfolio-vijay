import { Download, ExternalLink, GitPullRequest } from "lucide-react"
import { FaGithub, FaNpm } from "react-icons/fa"
import { TechBadge } from './tech-badge'
import { packages, packageGroups, packagesSnapshotDate } from '@/lib/data'

type ProjectStatus = 'Building' | 'Completed'

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Building: 'border-amber-500/40 text-amber-600 dark:text-amber-400',
  Completed: 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
}

const featuredProjects: {
  title: string
  category: string
  status: ProjectStatus
  description: string
  technologies: string[]
  github: string
  live?: string
}[] = [
  {
    title: "OSS Tracker",
    category: "Developer infrastructure",
    status: "Building",
    description:
      "Self-hosted, read-only GitHub command center for tracking repositories, pull requests, reviews, checks, and contributor activity, with an explainable action inbox for what needs attention next. Next.js client, Node.js API, background sync workers, PostgreSQL and Redis, all runnable with Docker Compose.",
    technologies: ["TypeScript", "Next.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/vjymisal0/oss-tracker",
    live: "https://osstracker.vijaymisal.tech",
  },
  {
    title: "Chat App with Sentiment Analysis",
    category: "Real-time messaging",
    status: "Completed",
    description:
      "Real-time chat app that scores the sentiment of each message as it arrives, charts positive, neutral, and negative trends per user and per conversation, and exports the analysis as a PDF report. Firebase handles authentication, Firestore, and the realtime database.",
    technologies: ["React", "Firebase", "Chart.js", "JavaScript"],
    github: "https://github.com/vjymisal0/Chat-App-with-Sentiment-Analysis",
    live: "https://chatapp-ai-tan.vercel.app",
  },
]

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`)
const snapshotLabel = new Date(packagesSnapshotDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export default function Projects() {
  const totalDownloads = packages.reduce((sum, p) => sum + p.monthlyDownloads, 0)
  const groupIds = Object.keys(packageGroups) as (keyof typeof packageGroups)[]

  return (
    <div>
      <div className="mb-10">
        <p className="mb-2 text-[11px] font-mono text-primary">$ ls ./projects</p>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Projects & packages</h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          {packages.length} npm packages I wrote and maintain, with ~{formatCount(totalDownloads)} combined monthly downloads ({snapshotLabel}), plus the apps I've built.
        </p>
      </div>

      {/* Featured projects */}
      <div className="mb-14 grid gap-4">
        {featuredProjects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/60"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-primary">
                <GitPullRequest className="h-3.5 w-3.5" /> {project.category}
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono ${STATUS_STYLES[project.status]}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {project.status}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-foreground">{project.title}</h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary">
                <FaGithub className="h-3.5 w-3.5" /> Code
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

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
