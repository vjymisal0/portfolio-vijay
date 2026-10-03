'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { NotableRepos } from './github-charts'
import { TiltCard } from './ui/tilt-card'
import { TechBadge } from './tech-badge'
import { contributions, packages } from '@/lib/data'
import { AnnotatedText } from '@/components/ui/annotated-text'
import { getNpmLastMonthTotal } from '@/app/actions/npm'

const repoCount = new Set(contributions.map((c) => c.repo)).size
// Snapshot fallback, replaced by the live npm total once it loads.
const snapshotDownloads = packages.reduce((sum, p) => sum + p.monthlyDownloads, 0)
const packageNames = packages.map((p) => p.name)

const stats = [
  { value: `${contributions.length}`, label: 'PRs merged upstream' },
  { value: `${repoCount}`, label: 'repositories contributed to' },
  { value: `${packages.length}`, label: 'npm packages maintained' },
]

function useLiveMonthlyDownloads() {
  const [live, setLive] = useState<number | null>(null)
  useEffect(() => {
    getNpmLastMonthTotal(packageNames).then((res) => res.success && setLive(res.total))
  }, [])
  return live
}

const stack = ['TypeScript', 'React', 'NestJS', 'Node.js', 'Python', 'Go', 'Rust', 'n8n']

const highlights = [
  {
    label: '01 / Product engineering',
    title: 'Shipping at Loopr AI',
    description: 'Full-stack platform features, API authentication, and production fixes for AI-powered visual inspection.',
    href: '#experience',
    action: 'See my experience',
  },
  {
    label: '02 / Automation',
    title: 'Systems beyond the demo',
    description: 'Self-hosted workflows, scheduled jobs, and health checks with recovery paths and actionable alerts.',
    href: '#builds',
    action: 'Explore build systems',
  },
  {
    label: '03 / Open source',
    title: 'Fixes that ship upstream',
    description: 'Merged bug fixes, features, and tests in projects like Vite, axios, Apache Superset, qdrant, and rclone.',
    href: '#oss',
    action: 'See contributions',
  },
]

export default function Introduction() {
  const liveDownloads = useLiveMonthlyDownloads()

  return (
    <section aria-labelledby="intro-title" className="container mx-auto max-w-4xl px-6 pb-16 lg:px-12">
      <div className="max-w-3xl">
        <p className="mb-5 font-mono text-xs text-muted-foreground">
          <span className="text-primary">~ whoami</span> <span aria-hidden="true" className="mx-2">&rarr;</span> Vijay Misal, Pune, India
        </p>
        <h1 id="intro-title" className="font-mono text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Software engineer,<br />
          <span className="text-primary">building with AI.</span>
        </h1>
        <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
          I&apos;m Vijay, an SDE 1 at Loopr AI, building full-stack features for an AI visual-inspection platform. Outside work I&apos;ve had <AnnotatedText variant="doubleUnderline" color="text-primary" delay={0.8}>{contributions.length} pull requests merged</AnnotatedText> into open-source projects over the last year, including Vite, axios, and Apache Superset, and I maintain {packages.length} npm packages.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#builds" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Explore my work <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href="mailto:misalvijay153@gmail.com" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
            <Mail className="h-4 w-4" aria-hidden="true" /> Get in touch
          </a>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <ul aria-label="Tech stack" className="flex flex-wrap gap-2">{stack.map((t) => <li key={t}><TechBadge tech={t} /></li>)}</ul>
          <nav aria-label="Social profiles" className="flex gap-5">
            <a href="https://github.com/vjymisal0" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary">
              <FaGithub className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vijaymisal/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-primary">
              <FaLinkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
            </a>
          </nav>
        </div>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-card px-4 py-4">
            <dt className="sr-only">{label}</dt>
            <dd className="font-mono text-2xl font-medium tracking-tight text-foreground">{value}</dd>
            <dd className="mt-1 text-[11px] leading-snug text-muted-foreground">{label}</dd>
          </div>
        ))}
        <div className="bg-card px-4 py-4">
          <dt className="sr-only">monthly npm downloads</dt>
          <dd className="font-mono text-2xl font-medium tracking-tight text-foreground tabular-nums">
            {(liveDownloads ?? snapshotDownloads).toLocaleString('en-US')}
          </dd>
          <dd className="mt-1 flex items-center gap-1.5 text-[11px] leading-snug text-muted-foreground">
            {liveDownloads !== null && (
              <span className="relative flex h-1.5 w-1.5" title="Live from the npm registry">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
            )}
            monthly npm downloads
          </dd>
        </div>
      </dl>

      <section aria-labelledby="selected-work-title" className="mt-12 border-t border-border pt-8">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="mb-1 text-[11px] font-mono text-primary">$ ls ./focus</p>
            <h2 id="selected-work-title" className="text-xl font-medium tracking-tight">What I work on</h2>
          </div>
          <span className="text-xs text-muted-foreground">Product code to production workflows</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <TiltCard key={item.href} className="flex">
            <a href={item.href} className="group flex w-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/60">
              <span className="text-[10px] uppercase tracking-widest text-primary">{item.label}</span>
              <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mb-6 mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs font-medium text-primary">
                {item.action} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </a>
            </TiltCard>
          ))}
        </div>
      </section>

      <div className="mt-12 border-t border-border pt-8">
        <NotableRepos />
        <a href="#oss" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:underline">
          Explore my contributions <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
