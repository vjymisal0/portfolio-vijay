'use client'

import { useState, useEffect, useMemo } from 'react'
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
import { getLiveGitHubStats } from '@/app/actions/github'
import { contributions } from '@/lib/data'
import { projects } from './projects'
import { techColorHex } from '@/lib/tech-colors'

const fallbackLanguageData = [
  { name: 'TypeScript', value: 45 },
  { name: 'Python', value: 25 },
  { name: 'Go', value: 15 },
  { name: 'JavaScript', value: 15 },
]

function useTechFrequency() {
  return useMemo(() => {
    const counts = new Map<string, number>()
    for (const c of contributions) for (const t of c.techs) counts.set(t, (counts.get(t) || 0) + 1)
    for (const p of projects) for (const t of p.technologies) counts.set(t, (counts.get(t) || 0) + 1)
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
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

function ChartTooltip({ active, payload, label, suffix = '' }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg text-xs">
      {label && <div className="font-medium text-foreground">{label}</div>}
      <div className="text-muted-foreground mt-0.5">{payload[0].value}{suffix}</div>
    </div>
  )
}

export default function GitHubCharts() {
  const [languageData, setLanguageData] = useState(fallbackLanguageData)
  const techFrequency = useTechFrequency()
  const repos = useRepoList()

  useEffect(() => {
    async function loadStats() {
      const { success, languageData } = await getLiveGitHubStats()
      if (success && languageData) {
        setLanguageData(languageData)
      }
    }
    loadStats()
  }, [])

  const uniqueTechCount = new Set([
    ...contributions.flatMap((c) => c.techs),
    ...projects.flatMap((p) => p.technologies),
  ]).size

  const stats = [
    { label: 'PRs merged', value: contributions.length },
    { label: 'Repos contributed to', value: repos.length },
    { label: 'Technologies used', value: uniqueTechCount },
    { label: 'Featured projects', value: projects.length },
  ]

  return (
    <div className="pt-12 pb-8">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Developer Analytics</h2>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-border rounded-lg overflow-hidden mb-16">
        {stats.map((s) => (
          <div key={s.label} className="border-b border-r border-border px-4 py-5 sm:px-6 sm:py-6">
            <div className="font-serif text-3xl sm:text-4xl font-medium text-foreground">{s.value}</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">

        {/* Tech stack frequency */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Tech Stack</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">Most-used technologies across projects &amp; contributions</p>
          </div>
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={techFrequency} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }} barCategoryGap={10}>
                <XAxis type="number" allowDecimals={false} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip content={<ChartTooltip suffix=" uses" />} cursor={{ fill: 'hsl(var(--foreground) / 0.04)' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={18}>
                  {techFrequency.map((t) => (
                    <Cell key={t.name} fill={techColorHex(t.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Languages Pie Chart */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Languages</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">Live from public GitHub repos</p>
          </div>
          <div className="h-52 w-full flex items-center justify-center mt-4">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {languageData.map((entry) => (
                    <Cell key={entry.name} fill={techColorHex(entry.name)} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip suffix="%" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-x-6 gap-y-3 flex-wrap mt-auto pt-4">
            {languageData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: techColorHex(entry.name) }} />
                <span className="font-body text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Repos shipped to */}
        <div className="flex flex-col gap-6">
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
