'use client'

import { useMemo } from 'react'
import { FaGithub } from 'react-icons/fa'
import { Star } from 'lucide-react'
import { contributions, notableRepos } from '@/lib/data'
import ContributionHeatmap from './contribution-heatmap'

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

type NotableRepo = (typeof notableRepos)[number]

function RepoCard({ r, hidden }: { r: NotableRepo; hidden?: boolean }) {
  const owner = r.repo.split('/')[0]
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group flex w-64 shrink-0 items-center gap-3 rounded-lg border border-border bg-background px-4 py-3.5 transition-all duration-200 hover:border-foreground/30 hover:bg-foreground/[0.03]"
    >
      <img
        src={`https://github.com/${owner}.png?size=64`}
        alt={hidden ? '' : owner}
        className="w-8 h-8 rounded-full shrink-0"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground truncate">{r.repo}</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
          <Star className="w-3 h-3 fill-current text-amber-500" />
          {formatStars(r.stars)} stars
        </div>
      </div>
      <FaGithub className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}

// Infinite horizontal loop: the track is rendered twice and each copy slides
// by its own width plus the gap, so the seam is invisible. Pauses on hover or
// keyboard focus; reduced-motion users get a static, wrapping row instead.
function RepoMarquee({ repos, reverse }: { repos: readonly NotableRepo[]; reverse?: boolean }) {
  return (
    <div
      className="group/marquee flex overflow-hidden [--duration:40s] [--gap:1rem] gap-[var(--gap)] motion-reduce:flex-wrap"
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 gap-[var(--gap)] animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:shrink ${reverse ? '[animation-direction:reverse]' : ''} ${copy === 1 ? 'motion-reduce:hidden' : ''}`}
        >
          {repos.map((r) => (
            <RepoCard key={r.repo} r={r} hidden={copy === 1} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function NotableRepos() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-mono text-xl font-medium text-foreground">Notable Repositories</h3>
        <p className="text-sm font-body text-muted-foreground mt-1">Established, widely-used projects with a merged PR from me</p>
      </div>
      <div
        className="flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <RepoMarquee repos={notableRepos.filter((_, i) => i % 2 === 0)} />
        <RepoMarquee repos={notableRepos.filter((_, i) => i % 2 === 1)} reverse />
      </div>
    </div>
  )
}

export default function GitHubCharts() {
  const repos = useRepoList()

  return (
    <div className="pb-2">
      <p className="mb-2 text-[11px] font-mono text-primary">$ gh stats --since 2022</p>
      <h2 className="text-3xl sm:text-4xl font-mono font-medium tracking-tight text-foreground mb-8">Developer Analytics</h2>

      {/* Contribution calendar */}
      <div className="mb-10">
        <ContributionHeatmap />
      </div>

      {/* Repos shipped to */}
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="font-mono text-xl font-medium text-foreground">Shipped To</h3>
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
              aria-label={repo}
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
