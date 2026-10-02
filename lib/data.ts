import { Bug, Sparkles, FileText, TestTube2, Eraser } from 'lucide-react'
import generatedStats from './generated/stats.json'

export type Kind = 'fix' | 'feature' | 'docs' | 'tests' | 'cleanup'

export type Contribution = {
  repo: string
  title: string
  url: string
  number: number
  date: string // YYYY-MM-DD (merge date)
  kind: Kind
  techs: readonly string[]
  /** true when added by scripts/update-stats.mjs rather than by hand */
  auto?: boolean
}

type GeneratedStats = {
  updatedAt: string
  packages: Record<string, { monthlyDownloads: number }>
  contributions: Contribution[]
}

const stats = generatedStats as GeneratedStats

// Hand-curated merged PRs, newest first. scripts/update-stats.mjs adds new
// merged PRs to lib/generated/stats.json daily; they are merged in below.
// To fix an auto-added PR's kind/techs, copy it here — hand-written entries
// win over auto entries with the same url.
const handContributions: readonly Contribution[] = [
  {
    repo: 'StellarCanary/ProtocolCanary-Action',
    title: "test(version): cover whitespace-only token",
    url: 'https://github.com/StellarCanary/ProtocolCanary-Action/pull/281',
    number: 281,
    date: '2026-09-30',
    kind: 'tests',
    techs: ['TypeScript']
  },
  {
    repo: 'securo-finance/securo',
    title: "fix(enable-banking): fall back to counterparty name when description is missing",
    url: 'https://github.com/securo-finance/securo/pull/756',
    number: 756,
    date: '2026-09-29',
    kind: 'fix',
    techs: ['Python']
  },
  {
    repo: 'securo-finance/securo',
    title: "fix(budgets): offset positive refund transactions in category budget calculation",
    url: 'https://github.com/securo-finance/securo/pull/757',
    number: 757,
    date: '2026-09-29',
    kind: 'fix',
    techs: ['Python']
  },
  {
    repo: 'modelcontextprotocol/typescript-sdk',
    title: "fix(server): restore onclose after modern exchanges",
    url: 'https://github.com/modelcontextprotocol/typescript-sdk/pull/2778',
    number: 2778,
    date: '2026-09-28',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'StellarCanary/ProtocolCanary-Action',
    title: "test(artifact): cover empty sanitized differentiator",
    url: 'https://github.com/StellarCanary/ProtocolCanary-Action/pull/257',
    number: 257,
    date: '2026-09-27',
    kind: 'tests',
    techs: ['TypeScript']
  },
  {
    repo: 'StellarCanary/ProtocolCanary-Action',
    title: "test(errors): cover timeout error code",
    url: 'https://github.com/StellarCanary/ProtocolCanary-Action/pull/213',
    number: 213,
    date: '2026-09-27',
    kind: 'tests',
    techs: ['TypeScript']
  },
  {
    repo: 'StellarCanary/ProtocolCanary-Action',
    title: "test(errors): cover canary execution failure code",
    url: 'https://github.com/StellarCanary/ProtocolCanary-Action/pull/212',
    number: 212,
    date: '2026-09-27',
    kind: 'tests',
    techs: ['TypeScript']
  },
  {
    repo: 'StellarCanary/ProtocolCanary-Action',
    title: "test(errors): cover invalid report error code",
    url: 'https://github.com/StellarCanary/ProtocolCanary-Action/pull/214',
    number: 214,
    date: '2026-09-27',
    kind: 'tests',
    techs: ['TypeScript']
  },
  {
    repo: 'Automattic/harper',
    title: "fix(core): stop SplitWords treating short non-anchor words as split anchors",
    url: 'https://github.com/Automattic/harper/pull/4212',
    number: 4212,
    date: '2026-09-26',
    kind: 'fix',
    techs: ['Rust']
  },
  {
    repo: 'Automattic/harper',
    title: "fix(missing_to): avoid false positive on participial verbs in prepositional phrases",
    url: 'https://github.com/Automattic/harper/pull/4204',
    number: 4204,
    date: '2026-09-24',
    kind: 'fix',
    techs: ['Rust']
  },
  {
    repo: 'vitejs/vite',
    title: "fix: handle `server.ws: false` in mergeConfig",
    url: 'https://github.com/vitejs/vite/pull/23511',
    number: 23511,
    date: '2026-09-24',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'tj/git-extras',
    title: "feat(changelog): support excluding pathspecs",
    url: 'https://github.com/tj/git-extras/pull/1275',
    number: 1275,
    date: '2026-09-20',
    kind: 'feature',
    techs: ['Bash', 'Git', 'CLI']
  },
  {
    repo: 'tj/git-extras',
    title: "fix(ignore-io): use GitHub gitignore templates",
    url: 'https://github.com/tj/git-extras/pull/1273',
    number: 1273,
    date: '2026-09-20',
    kind: 'fix',
    techs: ['Bash', 'Git', 'CLI']
  },
  {
    repo: 'davila7/claude-code-templates',
    title: "feat(commands): add flaky-test-triage command",
    url: 'https://github.com/davila7/claude-code-templates/pull/907',
    number: 907,
    date: '2026-09-17',
    kind: 'feature',
    techs: ['TypeScript', 'CLI', 'Testing']
  },
  {
    repo: 'axios/axios',
    title: "fix(fetch): preserve response size errors across runtime wrappers",
    url: 'https://github.com/axios/axios/pull/11179',
    number: 11179,
    date: '2026-09-16',
    kind: 'fix',
    techs: ['JavaScript', 'Node.js', 'Testing']
  },
  {
    repo: 'davila7/claude-code-templates',
    title: "feat(commands): add regression triage command",
    url: 'https://github.com/davila7/claude-code-templates/pull/904',
    number: 904,
    date: '2026-09-15',
    kind: 'feature',
    techs: ['TypeScript', 'CLI', 'Testing']
  },
  {
    repo: 'aaubry/YamlDotNet',
    title: "Fix IndexOutOfRangeException when applying a naming convention to an empty string",
    url: 'https://github.com/aaubry/YamlDotNet/pull/1128',
    number: 1128,
    date: '2026-09-15',
    kind: 'fix',
    techs: ['C#', '.NET', 'YAML']
  },
  {
    repo: 'gamekeepers/sheshnag',
    title: "fix(orgs): log warning when invite email fails",
    url: 'https://github.com/gamekeepers/sheshnag/pull/108',
    number: 108,
    date: '2026-09-14',
    kind: 'fix',
    techs: ['Python', 'FastAPI']
  },
  {
    repo: 'console-rs/indicatif',
    title: "Fix HumanFloatCount printing \"-0\" for values that round to zero",
    url: 'https://github.com/console-rs/indicatif/pull/831',
    number: 831,
    date: '2026-09-14',
    kind: 'fix',
    techs: ['Rust', 'CLI']
  },
  {
    repo: 'stephencelis/SQLite.swift',
    title: "Fix invalid SQL for column-level CHECK constraints using range/BETWEEN expressions",
    url: 'https://github.com/stephencelis/SQLite.swift/pull/1371',
    number: 1371,
    date: '2026-09-13',
    kind: 'fix',
    techs: ['Swift', 'SQLite']
  },
  {
    repo: 'stephencelis/SQLite.swift',
    title: "Fix recurring crash when Connection deinitializes",
    url: 'https://github.com/stephencelis/SQLite.swift/pull/1373',
    number: 1373,
    date: '2026-09-13',
    kind: 'fix',
    techs: ['Swift', 'SQLite']
  },
  {
    repo: 'kubestellar/console',
    title: "refactor(updater): expose test seams for polling intervals and SHA detection",
    url: 'https://github.com/kubestellar/console/pull/23356',
    number: 23356,
    date: '2026-09-13',
    kind: 'cleanup',
    techs: ['React', 'TypeScript']
  },
  {
    repo: 'kubestellar/docs',
    title: "ci(telemetry): add structured CI-observability summary to typecheck.yml",
    url: 'https://github.com/kubestellar/docs/pull/6907',
    number: 6907,
    date: '2026-09-13',
    kind: 'cleanup',
    techs: ['GitHub Actions', 'TypeScript', 'YAML']
  },
  {
    repo: 'kubestellar/console',
    title: "fix(theme): use optional chaining for theme font and weight properties",
    url: 'https://github.com/kubestellar/console/pull/23352',
    number: 23352,
    date: '2026-09-13',
    kind: 'fix',
    techs: ['React', 'TypeScript']
  },
  {
    repo: 'kubestellar/console',
    title: "fix(hooks): upgrade swallowed parse error from console.warn to console.error in useDashboardCards",
    url: 'https://github.com/kubestellar/console/pull/23351',
    number: 23351,
    date: '2026-09-13',
    kind: 'fix',
    techs: ['React', 'TypeScript']
  },
  {
    repo: 'kubestellar/docs',
    title: "ci(vitest): add timeout-minutes, concurrency group, and self-trigger path",
    url: 'https://github.com/kubestellar/docs/pull/6904',
    number: 6904,
    date: '2026-09-13',
    kind: 'cleanup',
    techs: ['GitHub Actions', 'Vitest', 'YAML']
  },
  {
    repo: 'bats-core/bats-core',
    title: "fix(bats-preprocess): make test-name encoding locale-independent",
    url: 'https://github.com/bats-core/bats-core/pull/1236',
    number: 1236,
    date: '2026-09-12',
    kind: 'fix',
    techs: ['Bash', 'Testing']
  },
  {
    repo: 'marcoroth/herb',
    title: "Formatter: fix attribute spacing lost on elements nested in ERB blocks",
    url: 'https://github.com/marcoroth/herb/pull/2148',
    number: 2148,
    date: '2026-09-12',
    kind: 'fix',
    techs: ['Ruby', 'HTML', 'ERB']
  },
  {
    repo: 'Pawansingh3889/sql-sop',
    title: "fix: include dbt rules in SARIF descriptors",
    url: 'https://github.com/Pawansingh3889/sql-sop/pull/85',
    number: 85,
    date: '2026-09-11',
    kind: 'fix',
    techs: ['Python', 'SQL']
  },
  {
    repo: 'gamekeepers/sheshnag',
    title: "fix(ollama): return machine-readable EMPTY_RESPONSE prefix when choices is empty",
    url: 'https://github.com/gamekeepers/sheshnag/pull/84',
    number: 84,
    date: '2026-09-08',
    kind: 'fix',
    techs: ['Python', 'FastAPI']
  },
  {
    repo: 'gamekeepers/sheshnag',
    title: "fix(ollama): add negative caching to version probe so failed probes run once",
    url: 'https://github.com/gamekeepers/sheshnag/pull/86',
    number: 86,
    date: '2026-09-08',
    kind: 'fix',
    techs: ['Python', 'FastAPI']
  },
  {
    repo: 'gamekeepers/sheshnag',
    title: "fix(worker): time-throttle progress reporting to reduce backend HTTP round trips",
    url: 'https://github.com/gamekeepers/sheshnag/pull/87',
    number: 87,
    date: '2026-09-08',
    kind: 'fix',
    techs: ['Python', 'FastAPI']
  },
  {
    repo: 'gamekeepers/sheshnag',
    title: "fix(daemon): log Server header and warn on non-Ollama server at startup",
    url: 'https://github.com/gamekeepers/sheshnag/pull/85',
    number: 85,
    date: '2026-09-07',
    kind: 'fix',
    techs: ['Python', 'FastAPI']
  },
  {
    repo: 'securo-finance/securo',
    title: "fix(security): prevent path traversal prefix collision and add tomllib fallback",
    url: 'https://github.com/securo-finance/securo/pull/784',
    number: 784,
    date: '2026-09-05',
    kind: 'fix',
    techs: ['Python', 'Security']
  },
  {
    repo: 'Cyrax321/CONTINUUM',
    title: "fix(http): handle malformed Content-Length and chunked Transfer-Encoding in dashboard and gateway (#522)",
    url: 'https://github.com/Cyrax321/CONTINUUM/pull/525',
    number: 525,
    date: '2026-09-05',
    kind: 'fix',
    techs: ['TypeScript', 'Node.js']
  },
  {
    repo: 'medusajs/medusa',
    title: "fix(docs-ui): MainNav z-index overlap, duplicate GA key, and Windows broken-link-checker path bug",
    url: 'https://github.com/medusajs/medusa/pull/16362',
    number: 16362,
    date: '2026-09-04',
    kind: 'fix',
    techs: ['TypeScript', 'Next.js']
  },
  {
    repo: 'collective/icalendar',
    title: "ci: pin GitHub Action steps by commit hash",
    url: 'https://github.com/collective/icalendar/pull/1688',
    number: 1688,
    date: '2026-09-02',
    kind: 'cleanup',
    techs: ['GitHub Actions', 'Python']
  },
  {
    repo: 'PostHog/posthog.com',
    title: "fix(security): add RFC 9116 Expires field to security.txt",
    url: 'https://github.com/PostHog/posthog.com/pull/19830',
    number: 19830,
    date: '2026-09-01',
    kind: 'fix',
    techs: ['TypeScript', 'Security']
  },
  {
    repo: 'backstage/community-plugins',
    title: "docs: enhance kafka workspace README",
    url: 'https://github.com/backstage/community-plugins/pull/10268',
    number: 10268,
    date: '2026-08-31',
    kind: 'docs',
    techs: ['Backstage', 'Kafka', 'TypeScript']
  },
  {
    repo: 'milvus-io/milvus-docs',
    title: "docs: fix dense vector index link",
    url: 'https://github.com/milvus-io/milvus-docs/pull/3629',
    number: 3629,
    date: '2026-08-31',
    kind: 'docs',
    techs: ['Milvus', 'Docs']
  },
  {
    repo: 'qdrant/qdrant',
    title: "fix(strict-mode): enforce max_query_limit on scroll requests when limit is omitted",
    url: 'https://github.com/qdrant/qdrant/pull/10382',
    number: 10382,
    date: '2026-08-30',
    kind: 'fix',
    techs: ['Rust']
  },
  {
    repo: 'apache/superset',
    title: "test(explore): zero-value stacked bar segment no longer overlaps its neighbor's label",
    url: 'https://github.com/apache/superset/pull/42882',
    number: 42882,
    date: '2026-08-30',
    kind: 'tests',
    techs: ['React', 'TypeScript', 'Jest']
  },
  {
    repo: 'sraodev/universal-bluetooth-sdk',
    title: "fix(cli): make help and --help exit successfully without a daemon (#5)",
    url: 'https://github.com/sraodev/universal-bluetooth-sdk/pull/15',
    number: 15,
    date: '2026-08-30',
    kind: 'fix',
    techs: ['Rust', 'CLI']
  },
  {
    repo: 'eljulians/skillfile',
    title: "fix: handle tab-separated install lines during init re-run",
    url: 'https://github.com/eljulians/skillfile/pull/220',
    number: 220,
    date: '2026-08-30',
    kind: 'fix',
    techs: ['Go']
  },
  {
    repo: 'lingdojo/kana-dojo',
    title: "content: add new cultural etiquette tip (乾杯 3)",
    url: 'https://github.com/lingdojo/kana-dojo/pull/29445',
    number: 29445,
    date: '2026-08-30',
    kind: 'docs',
    techs: ['TypeScript']
  },
  {
    repo: 'anoopcodehack/DevBoard',
    title: "feat(board): add focus mode toggle to hide done tasks (#471)",
    url: 'https://github.com/anoopcodehack/DevBoard/pull/472',
    number: 472,
    date: '2026-08-30',
    kind: 'feature',
    techs: ['React', 'TypeScript', 'Tailwind']
  },
  {
    repo: 'Rohan-Shridhar/gridcraft',
    title: "fix(grid): make 64 and 128 grid sizes selectable and align default grid size (#116)",
    url: 'https://github.com/Rohan-Shridhar/gridcraft/pull/117',
    number: 117,
    date: '2026-08-30',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'openslop/openslop',
    title: "fix(loading): add 4th RailItemSkeleton in left rail for History panel",
    url: 'https://github.com/openslop/openslop/pull/679',
    number: 679,
    date: '2026-08-29',
    kind: 'fix',
    techs: ['React', 'TypeScript', 'Tailwind']
  },
  {
    repo: 'kubestellar/console',
    title: "✨ feat(a11y): add keyboard navigation (arrows, escape) to onboarding tour",
    url: 'https://github.com/kubestellar/console/pull/22904',
    number: 22904,
    date: '2026-08-29',
    kind: 'feature',
    techs: ['React', 'TypeScript', 'Accessibility']
  },
  {
    repo: 'kubestellar/console',
    title: "✨ feat(a11y): allow dismissing Tooltip with Escape key on keyboard focus",
    url: 'https://github.com/kubestellar/console/pull/22905',
    number: 22905,
    date: '2026-08-29',
    kind: 'feature',
    techs: ['React', 'TypeScript', 'Accessibility']
  },
  {
    repo: 'kubestellar/docs',
    title: "🐛 fix(hive): sync correct ADR knowledge-system path and restore internal links",
    url: 'https://github.com/kubestellar/docs/pull/6618',
    number: 6618,
    date: '2026-08-29',
    kind: 'docs',
    techs: ['Docs', 'Markdown']
  },
  {
    repo: 'MuhammadNiazAli/nextjs-supabase-starter',
    title: "feat(security): configure comprehensive security headers in next.config.js",
    url: 'https://github.com/MuhammadNiazAli/nextjs-supabase-starter/pull/109',
    number: 109,
    date: '2026-08-29',
    kind: 'feature',
    techs: ['Next.js', 'Security', 'TypeScript']
  },
  {
    repo: 'MuhammadNiazAli/nextjs-supabase-starter',
    title: "test(auth): add unit tests for authSchemas validation edge cases",
    url: 'https://github.com/MuhammadNiazAli/nextjs-supabase-starter/pull/105',
    number: 105,
    date: '2026-08-29',
    kind: 'tests',
    techs: ['TypeScript', 'Zod', 'Jest']
  },
  {
    repo: 'r-lib/actions',
    title: "fix(setup-r): export correct RTOOLS HOME env vars on Windows ARM64 and x64",
    url: 'https://github.com/r-lib/actions/pull/1104',
    number: 1104,
    date: '2026-08-28',
    kind: 'fix',
    techs: ['GitHub Actions', 'YAML']
  },
  {
    repo: 'anoopcodehack/DevBoard',
    title: "feat(board): add animated empty state when board has no tasks (#448)",
    url: 'https://github.com/anoopcodehack/DevBoard/pull/449',
    number: 449,
    date: '2026-08-28',
    kind: 'feature',
    techs: ['React', 'TypeScript', 'Framer Motion']
  },
  {
    repo: 'rclone/rclone',
    title: "vfscache: fix log message growing without bound on repeated write errors",
    url: 'https://github.com/rclone/rclone/pull/9776',
    number: 9776,
    date: '2026-08-27',
    kind: 'fix',
    techs: ['Go']
  },
  {
    repo: 'tj/git-extras',
    title: "feat(mr): support Forgejo/Codeberg pull request URLs",
    url: 'https://github.com/tj/git-extras/pull/1267',
    number: 1267,
    date: '2026-08-27',
    kind: 'feature',
    techs: ['Shell', 'Git']
  },
  {
    repo: 'Automattic/mongoose',
    title: "docs(schema): clarify duplicate index warning to note index is not created (gh-16476)",
    url: 'https://github.com/Automattic/mongoose/pull/16478',
    number: 16478,
    date: '2026-08-25',
    kind: 'docs',
    techs: ['MongoDB', 'JavaScript', 'Docs']
  },
  {
    repo: 'PostHog/posthog-rs',
    title: "feat: add group_identify helper for creating and updating group properties",
    url: 'https://github.com/PostHog/posthog-rs/pull/232',
    number: 232,
    date: '2026-08-24',
    kind: 'feature',
    techs: ['Rust', 'PostHog']
  },
  {
    repo: 'vitejs/vite',
    title: "fix(css): keep newline-separated srcset candidates intact",
    url: 'https://github.com/vitejs/vite/pull/23265',
    number: 23265,
    date: '2026-08-23',
    kind: 'fix',
    techs: ['TypeScript', 'CSS']
  },
  {
    repo: 'carlos-emr/carlos',
    title: "fix: align lab results empty-state colspan with rendered column count",
    url: 'https://github.com/carlos-emr/carlos/pull/3374',
    number: 3374,
    date: '2026-08-22',
    kind: 'fix',
    techs: ['Java', 'JavaScript']
  },
  {
    repo: 'mautic/user-documentation',
    title: "docs: update points documentation for 7.0",
    url: 'https://github.com/mautic/user-documentation/pull/927',
    number: 927,
    date: '2026-08-18',
    kind: 'docs',
    techs: ['Docs']
  },
  {
    repo: 'reticlehq/reticle',
    title: "docs: list every package and app in the architecture docs",
    url: 'https://github.com/reticlehq/reticle/pull/389',
    number: 389,
    date: '2026-08-18',
    kind: 'docs',
    techs: ['Go', 'TypeScript']
  },
  {
    repo: 'h3js/h3',
    title: "fix(request): compare methods case-insensitively in isMethod",
    url: 'https://github.com/h3js/h3/pull/1528',
    number: 1528,
    date: '2026-08-18',
    kind: 'fix',
    techs: ['JavaScript', 'Node.js']
  },
  {
    repo: 'tenstorrent/tt-umd',
    title: "Delete Grayskull board types (E75, E150, E300)",
    url: 'https://github.com/tenstorrent/tt-umd/pull/3138',
    number: 3138,
    date: '2026-08-18',
    kind: 'cleanup',
    techs: ['C++']
  },
  {
    repo: 'blnkfinance/blnk',
    title: "fix(database): include meta_data in GetBalanceByIDLite",
    url: 'https://github.com/blnkfinance/blnk/pull/351',
    number: 351,
    date: '2026-08-18',
    kind: 'fix',
    techs: ['Go']
  },
  {
    repo: 'moov-io/metro2',
    title: "fix(utils): marshal zero-value date fields as empty JSON string",
    url: 'https://github.com/moov-io/metro2/pull/256',
    number: 256,
    date: '2026-08-17',
    kind: 'fix',
    techs: ['Go']
  },
  {
    repo: 'tj/git-extras',
    title: "fix(is-git-repo): recognize bare repositories",
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
    repo: 'Team-Stunner/Health-Bites-GFG',
    title: "meal recommendation",
    url: 'https://github.com/Team-Stunner/Health-Bites-GFG/pull/3',
    number: 3,
    date: '2026-08-15',
    kind: 'fix',
    techs: ['TypeScript']
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
    title: "Fix reference link title incorrectly kept when followed by trailing garbage",
    url: 'https://github.com/commonmark/cmark/pull/627',
    number: 627,
    date: '2026-08-12',
    kind: 'fix',
    techs: ['C']
  },
  {
    repo: 'apache/superset',
    title: "fix(explore): stacked Timeseries Bar total excludes the sort-only metric",
    url: 'https://github.com/apache/superset/pull/42881',
    number: 42881,
    date: '2026-08-10',
    kind: 'fix',
    techs: ['React', 'TypeScript', 'Python']
  },
  {
    repo: 'mercadona/rele',
    title: "fix: publish() reports the wrong error when settings has no RELE dict",
    url: 'https://github.com/mercadona/rele/pull/343',
    number: 343,
    date: '2026-08-10',
    kind: 'fix',
    techs: ['Python', 'Django']
  },
  {
    repo: 'reductstore/reductstore',
    title: "Avoid blocking system-event replication on replication updates",
    url: 'https://github.com/reductstore/reductstore/pull/1594',
    number: 1594,
    date: '2026-08-08',
    kind: 'fix',
    techs: ['Rust']
  },
  {
    repo: 'collective/icalendar',
    title: "Remove unreachable branches from vOrg.from_ical and vOrg.from_jcal",
    url: 'https://github.com/collective/icalendar/pull/1643',
    number: 1643,
    date: '2026-08-07',
    kind: 'cleanup',
    techs: ['Python']
  },
  {
    repo: 'dfa1/rocksdb-ffm',
    title: "Transaction#get: use rocksdb_transaction_get instead of PinnableSlice",
    url: 'https://github.com/dfa1/rocksdb-ffm/pull/50',
    number: 50,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['Java']
  },
  {
    repo: 'anivar/decern',
    title: "sdks: cap error-body read at 64 KiB",
    url: 'https://github.com/anivar/decern/pull/23',
    number: 23,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['Go', 'Python', 'TypeScript']
  },
  {
    repo: 'kubestellar/console',
    title: "🐛 Fix: fail coverage merge job on incomplete shard artifact set",
    url: 'https://github.com/kubestellar/console/pull/22284',
    number: 22284,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'alibaba/open-code-review',
    title: "docs(i18n): sync max_tokens configuration docs to ja, ru, zh",
    url: 'https://github.com/alibaba/open-code-review/pull/766',
    number: 766,
    date: '2026-08-07',
    kind: 'docs',
    techs: ['Docs']
  },
  {
    repo: 'nivaas219/ossfind',
    title: "Improve GitHub API error handling",
    url: 'https://github.com/nivaas219/ossfind/pull/12',
    number: 12,
    date: '2026-08-07',
    kind: 'fix',
    techs: ['Python']
  },
  {
    repo: 'royalpinto007/Tiny-Day',
    title: "fix: surface notification scheduling failures instead of swallowing them",
    url: 'https://github.com/royalpinto007/Tiny-Day/pull/29',
    number: 29,
    date: '2026-08-06',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'DefNotArham/Watchly',
    title: "fix: add smooth auto-scroll to the chat panel",
    url: 'https://github.com/DefNotArham/Watchly/pull/9',
    number: 9,
    date: '2026-08-06',
    kind: 'fix',
    techs: ['TypeScript']
  },
  {
    repo: 'LunarVagabond/Pipe-Deck',
    title: "[#450] - add unit tests for useMixerControls, filterGraph, recentStreams",
    url: 'https://github.com/LunarVagabond/Pipe-Deck/pull/454',
    number: 454,
    date: '2026-08-06',
    kind: 'tests',
    techs: ['Vue', 'TypeScript']
  },
  {
    repo: 'sara-czasak/py-simple-wrap',
    title: "feat: add easy_images module for simple image processing",
    url: 'https://github.com/sara-czasak/py-simple-wrap/pull/84',
    number: 84,
    date: '2026-08-06',
    kind: 'feature',
    techs: ['Python']
  },
  {
    repo: 'Shashank-H/integrate-baumer-cam',
    title: "feat: Update Baumer camera configuration and resolution handling",
    url: 'https://github.com/Shashank-H/integrate-baumer-cam/pull/2',
    number: 2,
    date: '2026-03-05',
    kind: 'feature',
    techs: ['Python']
  },
  {
    repo: 'Shashank-H/integrate-baumer-cam',
    title: "feat: Refactor RTSPSource to improve connection handling and frame re…",
    url: 'https://github.com/Shashank-H/integrate-baumer-cam/pull/1',
    number: 1,
    date: '2026-02-24',
    kind: 'feature',
    techs: ['Python']
  }
]

const handUrls = new Set(handContributions.map((c) => c.url))

// Hand-written + auto entries, de-duplicated by url, newest first.
export const contributions: readonly Contribution[] = [
  ...handContributions,
  ...stats.contributions.filter((c) => !handUrls.has(c.url)),
].sort((a, b) => b.date.localeCompare(a.date))

// Monthly downloads come from lib/generated/stats.json (refreshed daily from
// api.npmjs.org/downloads/point/last-month); the hardcoded values in
// `basePackages` are the fallback.
export const packagesSnapshotDate = stats.updatedAt.slice(0, 10)

export const packageGroups = {
  vision: {
    title: 'Image quality & computer vision',
    blurb: 'Pre-OCR and KYC photo checks: blur, exposure, glare, contrast, shadows, near-duplicates, and metadata stripping. The same problem space as the visual-inspection work I do at Loopr AI.',
  },
  india: {
    title: 'Indian fintech & compliance',
    blurb: 'Zero-dependency validators and formatters for PAN, GSTIN, Aadhaar, UPI, and rupee amounts, with checksum verification and masking.',
  },
  devtools: {
    title: 'Developer tooling',
    blurb: 'Small CLIs that catch release and CI mistakes before they ship.',
  },
} as const

const basePackages = [
  {
    name: 'blur-score',
    group: 'vision',
    monthlyDownloads: 1006,
    description: 'Detect how blurry an image is (0-1 sharpness score) using Laplacian variance analysis with Sharp.',
    install: 'npm i blur-score',
    npm: 'https://www.npmjs.com/package/blur-score',
    github: 'https://github.com/vjymisal0/blur-score',
  },
  {
    name: 'exposure-score',
    group: 'vision',
    monthlyDownloads: 884,
    description: 'Detect over- or under-exposed photos (0-1 score) using luminance histogram analysis.',
    install: 'npm i exposure-score',
    npm: 'https://www.npmjs.com/package/exposure-score',
    github: 'https://github.com/vjymisal0/exposure-score',
  },
  {
    name: 'pan-card-validator',
    group: 'india',
    monthlyDownloads: 1115,
    description: 'Validate and parse Indian PAN (Permanent Account Number) card numbers with entity structure detection.',
    install: 'npm i pan-card-validator',
    npm: 'https://www.npmjs.com/package/pan-card-validator',
    github: 'https://github.com/vjymisal0/pan-validator',
  },
  {
    name: 'gst-validator',
    group: 'india',
    monthlyDownloads: 1007,
    description: 'Validate and parse Indian GSTIN numbers with state code detection, checksum verification, and embedded PAN extraction.',
    install: 'npm i gst-validator',
    npm: 'https://www.npmjs.com/package/gst-validator',
    github: 'https://github.com/vjymisal0/gstin-validate',
  },
  {
    name: 'exif-purge',
    group: 'vision',
    monthlyDownloads: 968,
    description: 'Strip EXIF/GPS/IPTC metadata from images before upload or storage, with an optional read-only inspector.',
    install: 'npm i exif-purge',
    npm: 'https://www.npmjs.com/package/exif-purge',
    github: 'https://github.com/vjymisal0/strip-exif',
  },
  {
    name: 'photo-hash',
    group: 'vision',
    monthlyDownloads: 948,
    description: 'Detect near-duplicate photos using a perceptual difference hash (dHash), robust to resizing and recompression.',
    install: 'npm i photo-hash',
    npm: 'https://www.npmjs.com/package/photo-hash',
    github: 'https://github.com/vjymisal0/photo-hash',
  },
  {
    name: '@vjymisal0/upi-link',
    group: 'india',
    monthlyDownloads: 907,
    description: 'Create and parse UPI payment deep links (upi://pay) with zero runtime dependencies.',
    install: 'npm i @vjymisal0/upi-link',
    npm: 'https://www.npmjs.com/package/@vjymisal0/upi-link',
    github: 'https://github.com/vjymisal0/upi-link',
  },
  {
    name: 'glare-score',
    group: 'vision',
    monthlyDownloads: 517,
    description: 'Detect and quantify specular glare and flash reflection hotspots in documents and photos for KYC verification.',
    install: 'npm i glare-score',
    npm: 'https://www.npmjs.com/package/glare-score',
    github: 'https://github.com/vjymisal0/glare-score',
  },
  {
    name: 'pkg-bin-doctor',
    group: 'devtools',
    monthlyDownloads: 421,
    description: 'Pre-publish CLI doctor that validates package.json bin entries, shebangs, and execution permissions.',
    install: 'npm i pkg-bin-doctor',
    npm: 'https://www.npmjs.com/package/pkg-bin-doctor',
    github: 'https://github.com/vjymisal0/pkg-bin-doctor',
  },
  {
    name: 'contrast-score',
    group: 'vision',
    monthlyDownloads: 522,
    description: 'Analyze document and photo contrast quality using Michelson contrast, RMS contrast, and luminance distribution.',
    install: 'npm i contrast-score',
    npm: 'https://www.npmjs.com/package/contrast-score',
    github: 'https://github.com/vjymisal0/contrast-score',
  },
  {
    name: '@vjymisal0/aadhaar-mask',
    group: 'india',
    monthlyDownloads: 413,
    description: 'Zero-dependency, regulation-compliant Indian Aadhaar validator, Verhoeff checksum verifier, and 8-digit secure masker.',
    install: 'npm i @vjymisal0/aadhaar-mask',
    npm: 'https://www.npmjs.com/package/@vjymisal0/aadhaar-mask',
    github: 'https://github.com/vjymisal0/aadhaar-mask',
  },
  {
    name: 'env-example-drift',
    group: 'devtools',
    monthlyDownloads: 400,
    description: 'Check that .env and .env.example contain the exact same variable definitions to prevent CI/CD runtime surprises.',
    install: 'npm i env-example-drift',
    npm: 'https://www.npmjs.com/package/env-example-drift',
    github: 'https://github.com/vjymisal0/env-example-drift',
  },
  {
    name: 'shadow-score',
    group: 'vision',
    monthlyDownloads: 476,
    description: 'Detect and quantify harsh directional shadows in document and face verification photos using Otsu luminance segmentation.',
    install: 'npm i shadow-score',
    npm: 'https://www.npmjs.com/package/shadow-score',
    github: 'https://github.com/vjymisal0/shadow-score',
  },
  {
    name: 'todo-expiry',
    group: 'devtools',
    monthlyDownloads: 383,
    description: 'Zero-dependency CLI & CI tool that fails builds when dated TODO/FIXME comments expire.',
    install: 'npm i todo-expiry',
    npm: 'https://www.npmjs.com/package/todo-expiry',
    github: 'https://github.com/vjymisal0/todo-expiry',
  },
  {
    name: 'upi-validator',
    group: 'india',
    monthlyDownloads: 363,
    description: 'Zero-dependency Indian UPI ID (VPA) validator, parser, bank-handle verifier, and QR URI generator.',
    install: 'npm i upi-validator',
    npm: 'https://www.npmjs.com/package/upi-validator',
    github: 'https://github.com/vjymisal0/upi-validator',
  },
  {
    name: 'rupee-words',
    group: 'india',
    monthlyDownloads: 378,
    description: 'Convert numeric Indian Rupee amounts into English words with Indian numbering scale (Lakhs/Crores) and paise handling.',
    install: 'npm i rupee-words',
    npm: 'https://www.npmjs.com/package/rupee-words',
    github: 'https://github.com/vjymisal0/rupee-words',
  },
] as const

export const packages = basePackages.map((p) => ({
  ...p,
  monthlyDownloads: stats.packages[p.name]?.monthlyDownloads ?? (p.monthlyDownloads as number),
}))

// The most-starred repos among `contributions`, snapshotted 2026-09-30 via
// the GitHub GraphQL API. Star counts drift — refresh periodically rather
// than treating these as live.
export const notableRepos = [
  { repo: 'axios/axios', stars: 109249, url: 'https://github.com/axios/axios/pull/11179' },
  { repo: 'vitejs/vite', stars: 83079, url: 'https://github.com/vitejs/vite/pull/23511' },
  { repo: 'apache/superset', stars: 74978, url: 'https://github.com/apache/superset/pull/42881' },
  { repo: 'rclone/rclone', stars: 60021, url: 'https://github.com/rclone/rclone/pull/9776' },
  { repo: 'alibaba/open-code-review', stars: 42722, url: 'https://github.com/alibaba/open-code-review/pull/766' },
  { repo: 'chatwoot/chatwoot', stars: 37351, url: 'https://github.com/chatwoot/chatwoot/pull/15418' },
  { repo: 'medusajs/medusa', stars: 36515, url: 'https://github.com/medusajs/medusa/pull/16362' },
  { repo: 'qdrant/qdrant', stars: 34885, url: 'https://github.com/qdrant/qdrant/pull/10382' },
  { repo: 'davila7/claude-code-templates', stars: 32200, url: 'https://github.com/davila7/claude-code-templates/pull/907' },
  { repo: 'Automattic/mongoose', stars: 27469, url: 'https://github.com/Automattic/mongoose/pull/16478' },
  { repo: 'tj/git-extras', stars: 18118, url: 'https://github.com/tj/git-extras/pull/1267' },
  { repo: 'Automattic/harper', stars: 16046, url: 'https://github.com/Automattic/harper/pull/4212' },
  { repo: 'modelcontextprotocol/typescript-sdk', stars: 13489, url: 'https://github.com/modelcontextprotocol/typescript-sdk/pull/2778' },
  { repo: 'benoitc/gunicorn', stars: 10688, url: 'https://github.com/benoitc/gunicorn/pull/3684' },
  { repo: 'stephencelis/SQLite.swift', stars: 10187, url: 'https://github.com/stephencelis/SQLite.swift/pull/1373' },
] as const

// Hand-picked PRs shown above the full list. `why` explains what the change
// fixed in plain terms — keep it to what the PR itself states.
export const featuredContributions = [
  {
    url: 'https://github.com/stephencelis/SQLite.swift/pull/1373',
    why: 'Fixed a recurring crash when a database Connection deinitializes, in a Swift SQLite library used across iOS and macOS apps.',
  },
  {
    url: 'https://github.com/qdrant/qdrant/pull/10382',
    why: 'Closed a strict-mode gap in the Rust vector database: scroll requests that omitted a limit bypassed the configured max_query_limit.',
  },
  {
    url: 'https://github.com/axios/axios/pull/11179',
    why: 'Made response-size errors from the fetch adapter survive runtime wrappers, so callers see the real error instead of a generic one.',
  },
  {
    url: 'https://github.com/modelcontextprotocol/typescript-sdk/pull/2778',
    why: 'Restored the server onclose handler after modern protocol exchanges in the official Model Context Protocol TypeScript SDK.',
  },
  {
    url: 'https://github.com/vitejs/vite/pull/23511',
    why: 'Made mergeConfig handle server.ws: false instead of mishandling a disabled WebSocket server.',
  },
  {
    url: 'https://github.com/apache/superset/pull/42881',
    why: 'Fixed stacked Timeseries Bar totals so a metric used only for sorting is no longer counted in the total.',
  },
] as const

export const kindMeta: Record<Kind, { label: string; icon: typeof Bug; color: string; hex: string }> = {
  fix: { label: 'Fix', icon: Bug, color: 'bg-red-500/15 text-red-700 dark:text-red-400', hex: '#f87171' },
  feature: { label: 'Feature', icon: Sparkles, color: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-400', hex: '#34d399' },
  docs: { label: 'Docs', icon: FileText, color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400', hex: '#60a5fa' },
  tests: { label: 'Tests', icon: TestTube2, color: 'bg-violet-500/15 text-violet-700 dark:text-violet-400', hex: '#a78bfa' },
  cleanup: { label: 'Cleanup', icon: Eraser, color: 'bg-orange-500/15 text-orange-800 dark:text-orange-400', hex: '#fb923c' },
}
