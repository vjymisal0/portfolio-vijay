import type { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { TechBadge } from './tech-badge'

export type CaseStudyProps = {
  category: string
  status: 'Running daily' | 'Building' | 'Completed'
  title: string
  // One sentence a non-technical reader understands.
  summary: string
  problem: string
  built: string
  // The call that shaped it, including what was ruled out.
  decision: string
  result: string
  technologies: string[]
  github?: string
  live?: string
  // Optional deep dive, e.g. an interactive diagram.
  details?: ReactNode
}

const STATUS_STYLES: Record<CaseStudyProps['status'], string> = {
  'Running daily': 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
  Building: 'border-amber-500/40 text-amber-600 dark:text-amber-400',
  Completed: 'border-sky-500/40 text-sky-600 dark:text-sky-400',
}

const ROWS = [
  ['The problem', 'problem'],
  ['What I built', 'built'],
  ['Key decision', 'decision'],
  ['Result', 'result'],
] as const

export default function CaseStudy(props: CaseStudyProps) {
  const { category, status, title, summary, technologies, github, live, details } = props
  return (
    <article className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-primary">{category}</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono ${STATUS_STYLES[status]}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {status}
        </span>
      </div>
      <h3 className="font-serif text-2xl font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{summary}</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {ROWS.map(([label, key]) => (
          <div key={key} className="rounded-xl border border-border/70 p-4">
            <dt className="mb-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="text-sm leading-relaxed text-foreground/85">{props[key]}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
        </div>
        {(github || live) && (
          <div className="flex gap-4 text-xs">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary">
                <FaGithub className="h-3.5 w-3.5" /> Code
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary">
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
          </div>
        )}
      </div>

      {details && <div className="mt-6">{details}</div>}
    </article>
  )
}
