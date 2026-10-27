'use server'

export type DailyDownloads = { day: string; downloads: number }

type RangeResponse = { downloads: { day: string; downloads: number }[] }
type PointResponse = { downloads: number; end: string }

const opts = { next: { revalidate: 21600 } } // 6 hours
const day = (d: Date) => d.toISOString().slice(0, 10)
// Yesterday (UTC): npm publishes a day's counts some hours after it ends.
const yesterday = () => day(new Date(Date.now() - 864e5))

// npm caps one range/point query at 18 months, so longer spans are split
// into consecutive chunks.
function rangeChunks(start: string, end: string) {
  const out: string[] = []
  for (let from = Date.parse(start); from <= Date.parse(end); from += 540 * 864e5) {
    out.push(`${day(new Date(from))}:${day(new Date(Math.min(from + 539 * 864e5, Date.parse(end))))}`)
  }
  return out
}

// The bulk endpoint rejects scoped names, so those are fetched one by one.
// Returns one response per package (bulk responses are keyed by name, except
// for a single-package query, which returns the body directly).
async function fetchPerPackage<T>(kind: 'range' | 'point', range: string, names: string[]) {
  const unscoped = names.filter((n) => !n.startsWith('@'))
  const scoped = names.filter((n) => n.startsWith('@'))
  const out: T[] = []
  if (unscoped.length) {
    const res = await fetch(`https://api.npmjs.org/downloads/${kind}/${range}/${unscoped.join(',')}`, opts)
    if (!res.ok) throw new Error(`npm responded ${res.status}`)
    const data = await res.json()
    if (unscoped.length === 1) out.push(data)
    else for (const n of unscoped) if (data[n]) out.push(data[n])
  }
  for (const n of scoped) {
    const res = await fetch(`https://api.npmjs.org/downloads/${kind}/${range}/${n}`, opts)
    if (res.ok) out.push(await res.json())
  }
  return out
}

// Combined daily downloads across the given packages from `since` (the first
// publish) through yesterday.
export async function getNpmDailyDownloads(names: string[], since: string) {
  try {
    const byDay = new Map<string, number>()
    for (const range of rangeChunks(since, yesterday())) {
      for (const s of await fetchPerPackage<RangeResponse>('range', range, names)) {
        for (const d of s.downloads ?? []) byDay.set(d.day, (byDay.get(d.day) ?? 0) + d.downloads)
      }
    }

    const days: DailyDownloads[] = Array.from(byDay, ([day, downloads]) => ({ day, downloads }))
      .sort((a, b) => a.day.localeCompare(b.day))

    return { success: true, days }
  } catch (error) {
    console.error('npm downloads error:', error)
    return { success: false, days: [] as DailyDownloads[] }
  }
}

// Combined downloads over the 30 days ending yesterday (UTC) and since the
// first publish, the same windows scripts/update-stats.mjs bakes into the
// snapshot, so the live values match it instead of jumping on load. npm's
// `last-month` alias is not used: it froze at 2026-06-02:2026-07-01 and reads
// 0 for every package.
export async function getNpmTotals(names: string[], since: string) {
  try {
    const end = yesterday()
    const month = await fetchPerPackage<PointResponse>('point', `${day(new Date(Date.now() - 30 * 864e5))}:${end}`, names)
    if (month.length === 0) throw new Error('no npm data')
    // a window ending days short of the one asked for is stale data, not zero downloads
    if (month.some((p) => Date.parse(end) - Date.parse(p.end) > 3 * 864e5)) throw new Error(`stale npm window ending ${month[0].end}`)

    let allTime = 0
    for (const range of rangeChunks(since, end)) {
      for (const p of await fetchPerPackage<PointResponse>('point', range, names)) allTime += p.downloads ?? 0
    }

    return { success: true, month: month.reduce((sum, p) => sum + (p.downloads ?? 0), 0), allTime, end: month[0].end }
  } catch (error) {
    console.error('npm totals error:', error)
    return { success: false, month: 0, allTime: 0, end: '' }
  }
}
