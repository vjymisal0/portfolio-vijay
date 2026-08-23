'use client'

import { useMemo } from 'react'
import { FaGithub } from 'react-icons/fa'
import { Star } from 'lucide-react'
import { contributions, packages, notableRepos } from '@/lib/data'
import { projects } from './projects'

const formatStars = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0)}k` : `${n}`

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

export default function GitHubCharts() {
  const repos = useRepoList()

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
  )
}
