'use client'

import { useState, useMemo } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'
import { FaGithub } from 'react-icons/fa'
import { Star } from 'lucide-react'
import { contributions, packages, kindMeta, notableRepos, type Kind } from '@/lib/data'
import { projects } from './projects'
import ContributionHeatmap from './contribution-heatmap'

const formatStars = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k` : `${n}`

const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

function useActivityData() {
  return useMemo(() => {
    const counts = new Map<string, number>()
    for (const c of contributions) counts.set(c.date, (counts.get(c.date) || 0) + 1)
    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, label: formatDay(date), count }))
  }, [])
}

function useKindData() {
  return useMemo(() => {
    const counts = new Map<Kind, number>()
    for (const c of contributions) counts.set(c.kind as Kind, (counts.get(c.kind as Kind) || 0) + 1)
    return Array.from(counts.entries())
      .map(([kind, count]) => ({ kind, count, ...kindMeta[kind] }))
      .sort((a, b) => b.count - a.count)
  }, [])
}

function useRepoList() {
  return useMemo(() => {
    const seen = new Map<string, string>()
    for (const c of contributions) {
      const owner = c.repo.split('/')[0]
      if (!seen.has(c.repo)) seen.set(c.repo, owner)
    }
    return Array.from(seen.entries()).map(([repo, owner]) => ({ repo, owner }))
  }, [])
}

function ActivityTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg text-xs">
      <div className="font-medium text-foreground">{p.label}, 2026</div>
      <div className="text-muted-foreground mt-0.5">{p.count} PR{p.count === 1 ? '' : 's'} merged</div>
    </div>
  )
}

export default function GitHubCharts() {
  const activity = useActivityData()
  const kinds = useKindData()
  const repos = useRepoList()
  const [hoverKind, setHoverKind] = useState<string | null>(null)

  const uniqueTechCount = new Set([
    ...contributions.flatMap((c) => c.techs),
    ...projects.flatMap((p) => p.technologies),
  ]).size

  const stats = [
    { label: 'PRs merged', value: contributions.length },
    { label: 'Repos contributed to', value: repos.length },
    { label: 'Packages published', value: packages.length },
    { label: 'Technologies used', value: uniqueTechCount },
  ]

  return (
    <div className="pt-12 pb-8">
      <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground mb-12">Developer Analytics</h2>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-border rounded-lg overflow-hidden mb-16">
        {stats.map((s) => (
          <div key={s.label} className="border-b border-r border-border px-4 py-5 sm:px-5 sm:py-6">
            <div className="font-serif text-3xl sm:text-4xl font-medium text-foreground">{s.value}</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Live contribution calendar */}
      <div className="flex flex-col gap-6 mb-16">
        <div>
          <h3 className="font-serif text-xl font-medium text-foreground">Contribution Calendar</h3>
          <p className="text-sm font-body text-muted-foreground mt-1">Live from GitHub, updated hourly</p>
        </div>
        <div className="overflow-x-auto hide-scrollbar">
          <ContributionHeatmap variant="full" />
        </div>
      </div>

      {/* Notable repositories */}
      <div className="flex flex-col gap-6 mb-16">
        <div>
          <h3 className="font-serif text-xl font-medium text-foreground">Notable Repositories</h3>
          <p className="text-sm font-body text-muted-foreground mt-1">Established, widely-used projects with a merged PR from me</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notableRepos.map((r) => {
            const owner = r.repo.split('/')[0]
            return (
              <a
                key={r.repo}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-border px-4 py-3.5 transition-all duration-200 hover:border-foreground/30 hover:bg-foreground/[0.03]"
              >
                <img
                  src={`https://github.com/${owner}.png?size=64`}
                  alt={owner}
                  className="w-8 h-8 rounded-full shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate group-hover:text-foreground transition-colors">{r.repo}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    {formatStars(r.stars)} stars
                  </div>
                </div>
                <FaGithub className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-16">

        {/* Merge activity */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Merge Activity</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">Pull requests merged per day, most recent streak</p>
          </div>
          <div className="h-56 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap={4}>
                <XAxis
                  dataKey="label"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={24}
                />
                <Tooltip content={<ActivityTooltip />} cursor={{ fill: 'hsl(var(--foreground) / 0.04)' }} />
                <Bar dataKey="count" fill="#2a78d6" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contribution type */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Contribution Type</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">What kind of change each merged PR made</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-36 w-36 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kinds}
                    dataKey="count"
                    nameKey="label"
                    innerRadius={42}
                    outerRadius={64}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {kinds.map((k) => (
                      <Cell
                        key={k.kind}
                        fill={k.hex}
                        opacity={hoverKind && hoverKind !== k.kind ? 0.3 : 1}
                        onMouseEnter={() => setHoverKind(k.kind)}
                        onMouseLeave={() => setHoverKind(null)}
                        style={{ cursor: 'pointer', transition: 'opacity 150ms' }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-serif text-2xl font-medium text-foreground">{contributions.length}</span>
                <span className="text-[10px] text-muted-foreground">PRs</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-0">
              {kinds.map((k) => (
                <div
                  key={k.kind}
                  className="flex items-center gap-2 text-xs cursor-pointer"
                  onMouseEnter={() => setHoverKind(k.kind)}
                  onMouseLeave={() => setHoverKind(null)}
                  style={{ opacity: hoverKind && hoverKind !== k.kind ? 0.4 : 1 }}
                >
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: k.hex }} />
                  <span className="text-foreground/90">{k.label}</span>
                  <span className="text-muted-foreground ml-auto font-mono">{k.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repos shipped to */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Shipped To</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">{repos.length} public repositories with a merged PR</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {repos.map(({ repo, owner }) => (
              <a
                key={repo}
                href={`https://github.com/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                title={repo}
                className="group relative"
              >
                <img
                  src={`https://github.com/${owner}.png?size=64`}
                  alt={owner}
                  className="w-9 h-9 rounded-full border border-border grayscale group-hover:grayscale-0 transition-all duration-200 group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
