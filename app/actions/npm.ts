'use server'

export type MonthlyDownloads = { month: string; downloads: number }
export type DailyDownloads = { day: string; downloads: number }

type RangeResponse = { downloads: { day: string; downloads: number }[] }

// Total downloads per calendar month across the given packages, for the last
// 12 months (npm's range API caps a query at 18 months). The bulk endpoint
// rejects scoped names, so those are fetched one by one.
export async function getNpmMonthlyDownloads(names: string[]) {
  try {
    const end = new Date()
    end.setUTCDate(end.getUTCDate() - 1)
    const start = new Date(Date.UTC(end.getUTCFullYear() - 1, end.getUTCMonth() + 1, 1))
    const range = `${start.toISOString().slice(0, 10)}:${end.toISOString().slice(0, 10)}`
    const opts = { next: { revalidate: 21600 } } // 6 hours

    const unscoped = names.filter((n) => !n.startsWith('@'))
    const scoped = names.filter((n) => n.startsWith('@'))

    const series: RangeResponse[] = []
    if (unscoped.length) {
      const res = await fetch(`https://api.npmjs.org/downloads/range/${range}/${unscoped.join(',')}`, opts)
      if (!res.ok) throw new Error(`npm responded ${res.status}`)
      const data = await res.json()
      // A single-package query returns the series directly, not keyed by name.
      if (unscoped.length === 1) series.push(data)
      else for (const n of unscoped) if (data[n]) series.push(data[n])
    }
    for (const n of scoped) {
      const res = await fetch(`https://api.npmjs.org/downloads/range/${range}/${n}`, opts)
      if (res.ok) series.push(await res.json())
    }

    const byDay = new Map<string, number>()
    for (const s of series) {
      for (const d of s.downloads ?? []) {
        byDay.set(d.day, (byDay.get(d.day) ?? 0) + d.downloads)
      }
    }

    const days: DailyDownloads[] = Array.from(byDay, ([day, downloads]) => ({ day, downloads }))
      .sort((a, b) => a.day.localeCompare(b.day))
    // npm publishes a day's counts some hours after it ends, so the newest
    // day can still read 0. Drop up to two trailing unpublished days.
    for (let i = 0; i < 2 && days.length > 1 && days[days.length - 1].downloads === 0; i++) days.pop()

    const byMonth = new Map<string, number>()
    for (const d of days) {
      const month = d.day.slice(0, 7)
      byMonth.set(month, (byMonth.get(month) ?? 0) + d.downloads)
    }
    const months: MonthlyDownloads[] = Array.from(byMonth, ([month, downloads]) => ({ month, downloads }))

    return { success: true, months, days }
  } catch (error) {
    console.error('npm downloads error:', error)
    return { success: false, months: [] as MonthlyDownloads[], days: [] as DailyDownloads[] }
  }
}

type PointResponse = { downloads: number; end: string }

// Combined downloads over npm's rolling "last month" window (30 days ending
// at the newest day npm has published).
export async function getNpmLastMonthTotal(names: string[]) {
  try {
    const opts = { next: { revalidate: 21600 } } // 6 hours
    const unscoped = names.filter((n) => !n.startsWith('@'))
    const scoped = names.filter((n) => n.startsWith('@'))

    const points: PointResponse[] = []
    if (unscoped.length) {
      const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${unscoped.join(',')}`, opts)
      if (!res.ok) throw new Error(`npm responded ${res.status}`)
      const data = await res.json()
      if (unscoped.length === 1) points.push(data)
      else for (const n of unscoped) if (data[n]) points.push(data[n])
    }
    for (const n of scoped) {
      const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${n}`, opts)
      if (res.ok) points.push(await res.json())
    }
    if (points.length === 0) throw new Error('no npm data')

    const total = points.reduce((sum, p) => sum + (p.downloads ?? 0), 0)
    return { success: true, total, end: points[0].end }
  } catch (error) {
    console.error('npm last-month error:', error)
    return { success: false, total: 0, end: '' }
  }
}
