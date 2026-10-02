#!/usr/bin/env node
// Refreshes lib/generated/stats.json with npm monthly downloads and newly
// merged upstream PRs. Never touches lib/data.ts (it only reads it).
//
// Usage: npm run stats:update   (loads .env via node --env-file)
// Requires Node 20.12+, no dependencies.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATA_TS = join(ROOT, 'lib/data.ts')
const STATS_JSON = join(ROOT, 'lib/generated/stats.json')

// Fallback for running without --env-file.
if (!process.env.GITHUB_TOKEN && existsSync(join(ROOT, '.env')) && process.loadEnvFile) {
  process.loadEnvFile(join(ROOT, '.env'))
}

const { GITHUB_TOKEN, NOTIFY_WEBHOOK_URL } = process.env
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'vjymisal0'

class FatalError extends Error {}

async function notify(text) {
  if (!NOTIFY_WEBHOOK_URL) return
  try {
    // `content` = Discord, `text` = Slack / Telegram sendMessage (?chat_id=… in the URL).
    await fetch(NOTIFY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: text, text, disable_web_page_preview: true }),
    })
  } catch (err) {
    console.warn(`[warn] webhook failed: ${err.message}`)
  }
}

// --- Read the hand-written data from lib/data.ts (text only, no TS import) ---

function sliceBlock(src, startMarker) {
  const start = src.indexOf(startMarker)
  if (start === -1) throw new FatalError(`Could not find "${startMarker}" in lib/data.ts`)
  const end = src.indexOf('\n]', start)
  return src.slice(start, end)
}

async function readDataTs() {
  const src = await readFile(DATA_TS, 'utf8')
  const pkgBlock = sliceBlock(src, 'const basePackages = [')
  const packageNames = [...pkgBlock.matchAll(/^\s*name:\s*'([^']+)'/gm)].map((m) => m[1])
  const contribBlock = sliceBlock(src, 'const handContributions')
  const handUrls = new Set([...contribBlock.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1]))
  const kindBlock = src.slice(src.indexOf('export type Kind'), src.indexOf('\n', src.indexOf('export type Kind')))
  const kinds = [...kindBlock.matchAll(/'([a-z-]+)'/g)].map((m) => m[1])
  if (!packageNames.length) throw new FatalError('No package names found in lib/data.ts')
  if (!kinds.length) throw new FatalError('No Kind union found in lib/data.ts')
  return { packageNames, handUrls, kinds }
}

// --- npm ---

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchMonthlyDownloads(name) {
  const url = `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(name)}`
  let res
  for (let attempt = 1; attempt <= 4; attempt++) {
    res = await fetch(url)
    if (res.status !== 429 && res.status < 500) break
    // npm's downloads API rate-limits bursts; back off and retry.
    const retryAfter = Number(res.headers.get('retry-after')) || 0
    await sleep(Math.max(retryAfter * 1000, 2000 * 2 ** (attempt - 1)))
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const body = await res.json()
  if (typeof body.downloads !== 'number') throw new Error('no downloads field')
  return body.downloads
}

// --- GitHub ---

async function gh(url) {
  const res = await fetch(url.startsWith('http') ? url : `https://api.github.com${url}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-stats-updater',
    },
  })
  if (res.status === 401) throw new FatalError('GitHub auth failed (401): check GITHUB_TOKEN')
  if (!res.ok) {
    const msg = `GitHub ${res.status} for ${url}: ${(await res.text()).slice(0, 200)}`
    // 403/429 on the search endpoint means we can't trust the result set.
    if (url.includes('/search/')) throw new FatalError(msg)
    throw new Error(msg)
  }
  return res.json()
}

function makeKindInferrer(kinds) {
  const pick = (...candidates) => candidates.find((k) => kinds.includes(k))
  const fallback = pick('cleanup', 'fix') ?? kinds[0]
  const byPrefix = {
    fix: pick('fix', 'bugfix', 'bug'),
    bugfix: pick('fix', 'bugfix', 'bug'),
    hotfix: pick('fix', 'bugfix', 'bug'),
    feat: pick('feature', 'feat'),
    feature: pick('feature', 'feat'),
    test: pick('tests', 'test'),
    tests: pick('tests', 'test'),
    docs: pick('docs', 'doc'),
    doc: pick('docs', 'doc'),
    chore: pick('cleanup'),
    refactor: pick('cleanup'),
    style: pick('cleanup'),
    perf: pick('cleanup'),
    build: pick('cleanup'),
    ci: pick('cleanup'),
  }
  return (title) => {
    const m = title.trim().match(/^([a-z]+)(\([^)]*\))?!?:/i)
    if (m) return byPrefix[m[1].toLowerCase()] ?? fallback
    // No conventional prefix: rough keyword guess.
    if (/\b(fix|fixes|fixed|bug|crash|error)\b/i.test(title)) return pick('fix') ?? fallback
    if (/\b(add|adds|support|implement|introduce)\b/i.test(title)) return pick('feature') ?? fallback
    if (/\b(doc|docs|readme|typo)\b/i.test(title)) return pick('docs') ?? fallback
    if (/\btests?\b/i.test(title)) return pick('tests') ?? fallback
    return fallback
  }
}

async function searchMergedPRs() {
  const q = `is:pr is:merged author:${GITHUB_USERNAME} -user:${GITHUB_USERNAME}`
  const items = []
  for (let page = 1; page <= 10; page++) {
    const body = await gh(
      `/search/issues?q=${encodeURIComponent(q)}&sort=created&order=desc&per_page=100&page=${page}`
    )
    items.push(...body.items)
    if (body.items.length < 100 || items.length >= Math.min(body.total_count, 1000)) break
  }
  return items
}

// --- main ---

async function main() {
  if (!GITHUB_TOKEN) throw new FatalError('GITHUB_TOKEN is not set (see .env.example)')

  const { packageNames, handUrls, kinds } = await readDataTs()
  const prev = existsSync(STATS_JSON)
    ? JSON.parse(await readFile(STATS_JSON, 'utf8'))
    : { updatedAt: null, packages: {}, contributions: [] }

  // npm
  const packages = {}
  let pkgUpdated = 0
  const pkgFailed = []
  for (const name of packageNames) {
    try {
      const downloads = await fetchMonthlyDownloads(name)
      packages[name] = { monthlyDownloads: downloads }
      if (prev.packages?.[name]?.monthlyDownloads !== downloads) pkgUpdated++
    } catch (err) {
      pkgFailed.push(name)
      console.warn(`[warn] npm ${name}: ${err.message} (keeping previous value)`)
      if (prev.packages?.[name]) packages[name] = prev.packages[name]
    }
  }
  const totalDownloads = Object.values(packages).reduce((s, p) => s + p.monthlyDownloads, 0)

  // GitHub
  await gh('/user') // fails fast with a clear message on bad tokens
  const inferKind = makeKindInferrer(kinds)
  const knownUrls = new Set([...handUrls, ...(prev.contributions ?? []).map((c) => c.url)])
  const langCache = new Map()
  const added = []

  for (const item of await searchMergedPRs()) {
    const url = item.html_url
    if (knownUrls.has(url)) continue
    const repo = item.repository_url.replace('https://api.github.com/repos/', '')

    // Confirm via the PR API: search occasionally returns stale hits (e.g.
    // PRs in repos that have since gone private), which would be dead links.
    let mergedAt = null
    try {
      mergedAt = (await gh(item.pull_request.url)).merged_at
    } catch (err) {
      console.warn(`[warn] skipping ${url}: ${err.message.split(':')[0]}`)
      continue
    }
    if (!mergedAt) continue // not actually merged

    if (!langCache.has(repo)) {
      try {
        langCache.set(repo, (await gh(item.repository_url)).language ?? null)
      } catch (err) {
        console.warn(`[warn] repo ${repo}: ${err.message}`)
        langCache.set(repo, null)
      }
    }
    const lang = langCache.get(repo)

    added.push({
      repo,
      title: item.title,
      url,
      number: item.number,
      date: mergedAt.slice(0, 10),
      kind: inferKind(item.title),
      techs: lang ? [lang] : [],
      auto: true,
    })
    knownUrls.add(url)
  }

  const contributions = [...added, ...(prev.contributions ?? [])]
    // drop auto entries that have since been hand-copied into data.ts
    .filter((c) => !handUrls.has(c.url))
    .sort((a, b) => b.date.localeCompare(a.date) || b.number - a.number)

  const next = { updatedAt: new Date().toISOString(), packages, contributions }
  const strip = ({ updatedAt, ...rest }) => JSON.stringify(rest)
  const changed = strip(next) !== strip(prev)

  if (changed) {
    await mkdir(dirname(STATS_JSON), { recursive: true })
    await writeFile(STATS_JSON, JSON.stringify(next, null, 2) + '\n')
  }

  const prevTotal = Object.values(prev.packages ?? {}).reduce((s, p) => s + p.monthlyDownloads, 0)
  const fmt = (n) => n.toLocaleString('en-US')
  const delta = (n) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `−${fmt(-n)}` : '±0')
  const pkgLines = packageNames
    .filter((n) => packages[n])
    .sort((a, b) => packages[b].monthlyDownloads - packages[a].monthlyDownloads)
    .map((n) => {
      const now = packages[n].monthlyDownloads
      const was = prev.packages?.[n]?.monthlyDownloads
      return `  ${n}: ${fmt(now)}${was === undefined ? ' (new)' : was !== now ? ` (${delta(now - was)})` : ''}`
    })

  const summary = [
    `Portfolio stats: ${changed ? 'UPDATED' : 'no changes'}`,
    ``,
    `npm, last 30 days: ${fmt(totalDownloads)} total${prevTotal ? ` (${delta(totalDownloads - prevTotal)})` : ''}`,
    `packages changed: ${pkgUpdated}/${packageNames.length}${pkgFailed.length ? ` | failed, kept old value: ${pkgFailed.join(', ')}` : ''}`,
    ...pkgLines,
    ``,
    `new merged PRs: ${added.length}`,
    ...added.map((c) => `  + ${c.repo}#${c.number} (${c.date}, ${c.kind}) ${c.title}`),
    `PRs on site: ${handUrls.size + contributions.length} (${handUrls.size} hand-written + ${contributions.length} auto)`,
  ].join('\n')
  console.log(summary)
  // update-stats.sh sets NOTIFY_DEFER=1 and sends one combined message with the git result.
  if (!process.env.NOTIFY_DEFER) await notify(summary)
}

main().catch(async (err) => {
  const msg = `Portfolio stats update FAILED: ${err.message}`
  console.error(msg)
  if (!process.env.NOTIFY_DEFER) await notify(msg)
  process.exit(1)
})
