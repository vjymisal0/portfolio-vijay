import { Bug, Sparkles, FileText, TestTube2, Eraser } from 'lucide-react'

// Real merged PRs, newest first. Add a new entry here whenever one lands —
// same pattern as the `projects` array in components/projects.tsx. This is
// the single source of truth: components/open-source.tsx and
// components/github-charts.tsx both read from here.
export const contributions = [
  {
    repo: 'Automattic/mongoose',
    title: 'docs(schema): clarify duplicate index warning to note index is not created',
    url: 'https://github.com/Automattic/mongoose/pull/16478',
    number: 16478,
    date: '2026-08-25',
    kind: 'docs',
    techs: ['MongoDB', 'JavaScript', 'Docs']
  },
  {
    repo: 'PostHog/posthog-rs',
    title: 'feat: add group_identify helper for creating and updating group properties',
    url: 'https://github.com/PostHog/posthog-rs/pull/232',
    number: 232,
    date: '2026-08-24',
    kind: 'feature',
    techs: ['Rust', 'PostHog']
  },
  {
    repo: 'vitejs/vite',
    title: 'fix(css): keep newline-separated srcset candidates intact',
    url: 'https://github.com/vitejs/vite/pull/23265',
    number: 23265,
    date: '2026-08-23',
    kind: 'fix',
    techs: ['TypeScript', 'CSS']
  },
  {
    repo: 'carlos-emr/carlos',
    title: 'fix: align lab results empty-state colspan with rendered column count',
    url: 'https://github.com/carlos-emr/carlos/pull/3374',
    number: 3374,
    date: '2026-08-22',
    kind: 'fix',
    techs: ['Java', 'JavaScript']
  },
  {
    repo: 'mautic/user-documentation',
    title: 'docs: update points documentation for 7.0',
    url: 'https://github.com/mautic/user-documentation/pull/927',
    number: 927,
    date: '2026-08-18',
    kind: 'docs',
    techs: ['Docs']
  },
  {
    repo: 'tenstorrent/tt-umd',
    title: 'Delete Grayskull board types (E75, E150, E300)',
    url: 'https://github.com/tenstorrent/tt-umd/pull/3138',
    number: 3138,
    date: '2026-08-18',
    kind: 'cleanup',
    techs: ['C++']
  },
  {
    repo: 'h3js/h3',
    title: 'fix(request): compare methods case-insensitively in isMethod',
    url: 'https://github.com/h3js/h3/pull/1528',
    number: 1528,
    date: '2026-08-18',
    kind: 'fix',
    techs: ['JavaScript', 'Node.js']
  },
  {
    repo: 'reticlehq/reticle',
    title: 'docs: list every package and app in the architecture docs',
    url: 'https://github.com/reticlehq/reticle/pull/389',
    number: 389,
    date: '2026-08-18',
    kind: 'docs',
    techs: ['Go', 'TypeScript']
  },
  {
    repo: 'blnkfinance/blnk',
    title: 'fix(database): include meta_data in GetBalanceByIDLite',
    url: 'https://github.com/blnkfinance/blnk/pull/351',
    number: 351,
    date: '2026-08-18',
    kind: 'fix',
    techs: ['Go']
  },
  {
    repo: 'moov-io/metro2',
    title: 'fix(utils): marshal zero-value date fields as empty JSON string',
    url: 'https://github.com/moov-io/metro2/pull/256',
    number: 256,
    date: '2026-08-17',
    kind: 'fix',
    techs: ['Go']
  },
  {
    repo: 'tj/git-extras',
    title: 'fix(is-git-repo): recognize bare repositories',
    url: 'https://github.com/tj/git-extras/pull/1266',
    number: 1266,
    date: '2026-08-17',
    kind: 'fix',
    techs: ['Shell']
  },
  {
    repo: 'benoitc/gunicorn',
    title: "fix: don't warn about dropped body bytes when sendfile has none",
    url: 'https://github.com/benoitc/gunicorn/pull/3684',
    number: 3684,
    date: '2026-08-16',
    kind: 'fix',
    techs: ['Python']
  },
  {
    repo: 'chatwoot/chatwoot',
    title: "fix: Alt+E resolve shortcut also opens Chrome's built-in menu on Windows",
    url: 'https://github.com/chatwoot/chatwoot/pull/15418',
    number: 15418,
    date: '2026-08-12',
    kind: 'fix',
    techs: ['Vue', 'Ruby']
  },
  {
    repo: 'commonmark/cmark',
    title: 'Fix reference link title incorrectly kept when followed by trailing garbage',
    url: 'https://github.com/commonmark/cmark/pull/627',
    number: 627,
    date: '2026-08-12',
    kind: 'fix',
    techs: ['C']
  },
  {
    repo: 'apache/superset',
    title: 'fix(explore): stacked Timeseries Bar total excludes the sort-only metric',
    url: 'https://github.com/apache/superset/pull/42881',
    number: 42881,
    date: '2026-08-10',
    kind: 'fix',
    techs: ['React', 'TypeScript', 'Python']
  },
  {
    repo: 'mercadona/rele',
    title: 'fix: publish() reports the wrong error when settings has no RELE dict',
    url: 'https://github.com/mercadona/rele/pull/343',
    number: 343,
    date: '2026-08-10',
    kind: 'fix',
    techs: ['Python', 'Django']
  },
  {
    repo: 'reductstore/reductstore',
    title: 'Avoid blocking system-event replication on replication updates',
    url: 'https://github.com/reductstore/reductstore/pull/1594',
    number: 1594,
    date: '2026-08-08',
    kind: 'fix',
    techs: ['Rust']
  },
  {
    repo: 'collective/icalendar',
    title: 'Remove unreachable branches from vOrg.from_ical and vOrg.from_jcal',
    url: 'https://github.com/collective/icalendar/pull/1643',
    number: 1643,
    date: '2026-08-07',
    kind: 'cleanup',
    techs: ['Python']
  },
  {
    repo: 'dfa1/rocksdbffm',
    title: 'Transaction#get: use rocksdb_transaction_get instead of PinnableSlice',
    url: 'https://github.com/dfa1/rocksdbffm/pull/50',
    number: 50,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['Java']
  },
  {
    repo: 'anivar/decern',
    title: 'sdks: cap error-body read at 64 KiB',
    url: 'https://github.com/anivar/decern/pull/23',
    number: 23,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['Go', 'Python', 'TypeScript']
  },
  {
    repo: 'kubestellar/console',
    title: 'Fix: fail coverage merge job on incomplete shard artifact set',
    url: 'https://github.com/kubestellar/console/pull/22284',
    number: 22284,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'alibaba/open-code-review',
    title: 'docs(i18n): sync max_tokens configuration docs to ja, ru, zh',
    url: 'https://github.com/alibaba/open-code-review/pull/766',
    number: 766,
    date: '2026-08-07',
    kind: 'docs',
    techs: ['Docs']
  },
  {
    repo: 'nivaas219/ossfind',
    title: 'Improve GitHub API error handling',
    url: 'https://github.com/nivaas219/ossfind/pull/12',
    number: 12,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['Python']
  },
  {
    repo: 'royalpinto007/Tiny-Day',
    title: 'fix: surface notification scheduling failures instead of swallowing them',
    url: 'https://github.com/royalpinto007/Tiny-Day/pull/29',
    number: 29,
    date: '2026-08-06',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'DefNotArham/Watchly',
    title: 'fix: add smooth auto-scroll to the chat panel',
    url: 'https://github.com/DefNotArham/Watchly/pull/9',
    number: 9,
    date: '2026-08-06',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'LunarVagabond/Pipe-Deck',
    title: 'add unit tests for useMixerControls, filterGraph, recentStreams',
    url: 'https://github.com/LunarVagabond/Pipe-Deck/pull/454',
    number: 454,
    date: '2026-08-06',
    kind: 'tests',
    techs: ['Vue', 'TypeScript']
  },
  {
    repo: 'sara-czasak/py-simple-wrap',
    title: 'feat: add easy_images module for simple image processing',
    url: 'https://github.com/sara-czasak/py-simple-wrap/pull/84',
    number: 84,
    date: '2026-08-06',
    kind: 'feature',
    techs: ['Python']
  }
] as const

export const packages = [
  {
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

// The most-starred repos among `contributions`, snapshotted 2026-08-19 via
// `gh api repos/{repo} --jq .stargazers_count`. Star counts drift — refresh
// periodically rather than treating these as live.
export const notableRepos = [
  { repo: 'vitejs/vite', stars: 82488, url: 'https://github.com/vitejs/vite/pull/23265' },
  { repo: 'apache/superset', stars: 74311, url: 'https://github.com/apache/superset/pull/42881' },
  { repo: 'chatwoot/chatwoot', stars: 35987, url: 'https://github.com/chatwoot/chatwoot/pull/15418' },
  { repo: 'alibaba/open-code-review', stars: 20839, url: 'https://github.com/alibaba/open-code-review/pull/766' },
  { repo: 'tj/git-extras', stars: 18094, url: 'https://github.com/tj/git-extras/pull/1266' },
  { repo: 'benoitc/gunicorn', stars: 10654, url: 'https://github.com/benoitc/gunicorn/pull/3684' },
  { repo: 'h3js/h3', stars: 5410, url: 'https://github.com/h3js/h3/pull/1528' },
] as const

export type Contribution = (typeof contributions)[number]
export type Kind = Contribution['kind']

export const kindMeta: Record<Kind, { label: string; icon: typeof Bug; color: string; hex: string }> = {
  fix: { label: 'Fix', icon: Bug, color: 'bg-red-500/15 text-red-400', hex: '#f87171' },
  feature: { label: 'Feature', icon: Sparkles, color: 'bg-emerald-500/15 text-emerald-400', hex: '#34d399' },
  docs: { label: 'Docs', icon: FileText, color: 'bg-blue-500/15 text-blue-400', hex: '#60a5fa' },
  tests: { label: 'Tests', icon: TestTube2, color: 'bg-violet-500/15 text-violet-400', hex: '#a78bfa' },
  cleanup: { label: 'Cleanup', icon: Eraser, color: 'bg-orange-500/15 text-orange-400', hex: '#fb923c' },
}
