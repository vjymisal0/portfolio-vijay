'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/section-title'
import { onSpotlightMove, SpotlightOverlay } from '@/components/ui/spotlight'
import { ExternalLink, GitPullRequest, Bug, Sparkles, FileText, TestTube2, Eraser, Package, Download } from 'lucide-react'
import { FaGithub, FaNpm } from 'react-icons/fa'
import { useState } from 'react'
import GitHubCharts from './github-charts'

// Real merged PRs, newest first. Add a new entry here whenever one lands —
// same pattern as the `projects` array in components/projects.tsx.
const contributions = [
  {
    repo: 'moov-io/metro2',
    title: 'fix(utils): marshal zero-value date fields as empty JSON string',
    url: 'https://github.com/moov-io/metro2/pull/256',
    number: 256,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'h3js/h3',
    title: 'fix(request): compare methods case-insensitively in isMethod',
    url: 'https://github.com/h3js/h3/pull/1528',
    number: 1528,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'benoitc/gunicorn',
    title: 'fix: don\'t warn about dropped body bytes when sendfile has none',
    url: 'https://github.com/benoitc/gunicorn/pull/3684',
    number: 3684,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'chatwoot/chatwoot',
    title: 'fix: Alt+E resolve shortcut also opens Chrome\'s built-in menu on Windows',
    url: 'https://github.com/chatwoot/chatwoot/pull/15418',
    number: 15418,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'commonmark/cmark',
    title: 'Fix reference link title incorrectly kept when followed by trailing garbage',
    url: 'https://github.com/commonmark/cmark/pull/627',
    number: 627,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'tj/git-extras',
    title: 'fix(is-git-repo): recognize bare repositories',
    url: 'https://github.com/tj/git-extras/pull/1266',
    number: 1266,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'blnkfinance/blnk',
    title: 'fix(database): include meta_data in GetBalanceByIDLite',
    url: 'https://github.com/blnkfinance/blnk/pull/351',
    number: 351,
    date: '2026-08-18',
    kind: 'fix',
  },
  {
    repo: 'tenstorrent/tt-umd',
    title: 'Delete Grayskull board types (E75, E150, E300)',
    url: 'https://github.com/tenstorrent/tt-umd/pull/3138',
    number: 3138,
    date: '2026-08-10',
    kind: 'cleanup',
  },
  {
    repo: 'reductstore/reductstore',
    title: 'Avoid blocking system-event replication on replication updates',
    url: 'https://github.com/reductstore/reductstore/pull/1594',
    number: 1594,
    date: '2026-08-08',
    kind: 'fix',
  },
  {
    repo: 'kubestellar/console',
    title: 'Fix coverage merge job on incomplete shard artifact set',
    url: 'https://github.com/kubestellar/console/pull/22284',
    number: 22284,
    date: '2026-08-07',
    kind: 'fix',
  },
  {
    repo: 'anivar/decern',
    title: 'sdks: cap error-body read at 64 KiB',
    url: 'https://github.com/anivar/decern/pull/23',
    number: 23,
    date: '2026-08-07',
    kind: 'fix',
  },
  {
    repo: 'dfa1/rocksdbffm',
    title: 'Transaction#get: use rocksdb_transaction_get instead of PinnableSlice',
    url: 'https://github.com/dfa1/rocksdbffm/pull/50',
    number: 50,
    date: '2026-08-07',
    kind: 'fix',
  },
  {
    repo: 'apache/superset',
    title: 'Stacked Timeseries Bar total excludes the sort-only metric',
    url: 'https://github.com/apache/superset/pull/42881',
    number: 42881,
    date: '2026-08-10',
    kind: 'fix',
  },
  {
    repo: 'alibaba/open-code-review',
    title: 'docs(i18n): sync max_tokens configuration docs to ja, ru, zh',
    url: 'https://github.com/alibaba/open-code-review/pull/766',
    number: 766,
    date: '2026-08-07',
    kind: 'docs',
  },
  {
    repo: 'collective/icalendar',
    title: 'Remove unreachable branches from vOrg.from_ical and vOrg.from_jcal',
    url: 'https://github.com/collective/icalendar/pull/1643',
    number: 1643,
    date: '2026-08-07',
    kind: 'cleanup',
  },
  {
    repo: 'mercadona/rele',
    title: 'publish() reports the wrong error when settings has no RELE dict',
    url: 'https://github.com/mercadona/rele/pull/343',
    number: 343,
    date: '2026-08-10',
    kind: 'fix',
  },
  {
    repo: 'LunarVagabond/Pipe-Deck',
    title: 'Add unit tests for useMixerControls, filterGraph, recentStreams',
    url: 'https://github.com/LunarVagabond/Pipe-Deck/pull/454',
    number: 454,
    date: '2026-08-06',
    kind: 'tests',
  },
  {
    repo: 'sara-czasak/py-simple-wrap',
    title: 'Add easy_images module for simple image processing',
    url: 'https://github.com/sara-czasak/py-simple-wrap/pull/84',
    number: 84,
    date: '2026-08-06',
    kind: 'feature',
  },
  {
    repo: 'DefNotArham/Watchly',
    title: 'Add smooth auto-scroll to the chat panel',
    url: 'https://github.com/DefNotArham/Watchly/pull/9',
    number: 9,
    date: '2026-08-06',
    kind: 'fix',
  },
  {
    repo: 'royalpinto007/Tiny-Day',
    title: 'Surface notification scheduling failures instead of swallowing them',
    url: 'https://github.com/royalpinto007/Tiny-Day/pull/29',
    number: 29,
    date: '2026-08-06',
    kind: 'fix',
  },
  {
    repo: 'nivaas219/ossfind',
    title: 'Improve GitHub API error handling',
    url: 'https://github.com/nivaas219/ossfind/pull/12',
    number: 12,
    date: '2026-08-07',
    kind: 'fix',
  },
]

// Packages published under vjymisal0 / @vijayishere on npm. Add an entry
// here after `npm publish` — same pattern as `contributions` above.
const packages = [  {
    name: '@vijayishere/photo-hash',
    description: 'Detect near-duplicate photos using a perceptual difference hash (dHash), robust to resizing and recompression.',
    install: 'npm i @vijayishere/photo-hash',
    npm: 'https://www.npmjs.com/package/@vijayishere/photo-hash',
    github: 'https://github.com/vjymisal0/photo-hash',
  },
  {
    name: 'exposure-score',
    description: 'Detect over- or under-exposed photos (0-1 score) using luminance histogram analysis.',
    install: 'npm i exposure-score',
    npm: 'https://www.npmjs.com/package/exposure-score',
    github: 'https://github.com/vjymisal0/exposure-score',
  },
  {
    name: '@vijayishere/strip-exif',
    description: 'Strip EXIF/GPS/IPTC metadata from images before upload or storage, with an optional read-only inspector.',
    install: 'npm i @vijayishere/strip-exif',
    npm: 'https://www.npmjs.com/package/@vijayishere/strip-exif',
    github: 'https://github.com/vjymisal0/strip-exif',
  },
  {
    name: '@vijayishere/pan-validator',
    description: 'Validate and parse Indian PAN (Permanent Account Number) card numbers.',
    install: 'npm i @vijayishere/pan-validator',
    npm: 'https://www.npmjs.com/package/@vijayishere/pan-validator',
    github: 'https://github.com/vjymisal0/pan-validator',
  },
]

type Contribution = (typeof contributions)[number]
type Kind = Contribution['kind']

const kindMeta: Record<Kind, { label: string; icon: typeof Bug; color: string }> = {
  fix: { label: 'Fix', icon: Bug, color: 'bg-red-500/15 text-red-400' },
  feature: { label: 'Feature', icon: Sparkles, color: 'bg-emerald-500/15 text-emerald-400' },
  docs: { label: 'Docs', icon: FileText, color: 'bg-blue-500/15 text-blue-400' },
  tests: { label: 'Tests', icon: TestTube2, color: 'bg-violet-500/15 text-violet-400' },
  cleanup: { label: 'Cleanup', icon: Eraser, color: 'bg-orange-500/15 text-orange-400' },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: 'spring', damping: 12, stiffness: 120 } },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const CARD_CLASS =
  'group group/spotlight relative rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all duration-300 p-4 flex flex-col gap-2.5'

function SubHeading({ icon: Icon, children }: { icon: typeof Package; children: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
      </span>
    </div>
  )
}

function IconBadge({ icon: Icon }: { icon: typeof FaGithub }) {
  return (
    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
      <Icon className="w-4 h-4 text-primary" />
    </div>
  )
}

function CardFooterLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: typeof FaGithub
  children: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
    >
      <Icon className="w-3 h-3" /> {children}
    </a>
  )
}

export default function OpenSource() {
  const [showAllPRs, setShowAllPRs] = useState(false)
  const repoCount = new Set(contributions.map((c) => c.repo)).size

  const visibleContributions = showAllPRs ? contributions : contributions.slice(0, 6)

  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl">
      <div className="mb-8">
        <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-1.5">Open Source</h2>
        <p className="text-xs text-muted-foreground">
          {contributions.length} pull requests merged across {repoCount} public repositories &middot; {packages.length} packages published
        </p>
      </div>

      <div className="space-y-12">
        {/* Pull requests */}
        <div>
          <SubHeading icon={GitPullRequest}>Contributions</SubHeading>
          <div className="flex flex-col border-t border-border mt-6">
            {visibleContributions.map((c) => {
              const meta = kindMeta[c.kind]
              const Icon = meta.icon
              return (
                <a
                  key={c.url}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-border hover:bg-foreground/5 transition-colors"
                >
                  <div className="w-full sm:w-1/3 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <FaGithub className="w-4 h-4 text-muted-foreground" />
                      {c.repo}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      #{c.number} &middot; {formatDate(c.date)}
                    </span>
                  </div>

                  <div className="w-full sm:w-2/3 flex flex-col gap-3">
                    <p className="text-sm font-body text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">
                      {c.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold`}>
                        <Icon className="w-3 h-3" /> {meta.label}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                        View PR <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
          
          {contributions.length > 6 && (
            <div className="mt-8">
              <button
                onClick={() => setShowAllPRs(!showAllPRs)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                &rarr; {showAllPRs ? 'Show less' : `Show all ${contributions.length} contributions`}
              </button>
            </div>
          )}
        </div>

        {/* Published packages */}
        <div className="mt-20">
          <SubHeading icon={Package}>Packages</SubHeading>
          <div className="flex flex-col border-t border-border mt-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-border hover:bg-foreground/5 transition-colors"
              >
                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <FaNpm className="w-4 h-4 text-muted-foreground" />
                    {pkg.name}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <CardFooterLink href={pkg.npm} icon={Download}>npm</CardFooterLink>
                    <CardFooterLink href={pkg.github} icon={FaGithub}>Code</CardFooterLink>
                  </div>
                </div>

                <div className="w-full sm:w-2/3 flex flex-col gap-3">
                  <p className="text-sm font-body text-foreground/90 leading-relaxed">
                    {pkg.description}
                  </p>
                  <code className="inline-block self-start text-[11px] font-mono text-muted-foreground bg-foreground/5 rounded px-2 py-1">
                    {pkg.install}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <GitHubCharts />
        </div>

        {/* Let's Connect CTA */}
        <div className="pt-24 mt-12">
          <div className="text-left border-t border-border pt-12">
            <h2 className="text-4xl sm:text-5xl font-serif text-foreground mb-6">Let's Connect.</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              I'm always open to discussing new projects, open-source collaborations, or creative ideas.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="mailto:misalvijay153@gmail.com" className="inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background hover:opacity-90 px-6 py-3 rounded-full transition-opacity">
                Send an Email
              </a>
              <a href="https://www.linkedin.com/in/vijaymisal/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium border border-border hover:border-foreground/30 px-6 py-3 rounded-full transition-colors text-foreground">
                 LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
