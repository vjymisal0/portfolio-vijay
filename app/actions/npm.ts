'use server'

export type MonthlyDownloads = { month: string; downloads: number }

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

    const byMonth = new Map<string, number>()
    for (const s of series) {
      for (const d of s.downloads ?? []) {
        const month = d.day.slice(0, 7)
        byMonth.set(month, (byMonth.get(month) ?? 0) + d.downloads)
      }
    }

    const months: MonthlyDownloads[] = Array.from(byMonth, ([month, downloads]) => ({ month, downloads }))
      .sort((a, b) => a.month.localeCompare(b.month))

    return { success: true, months }
  } catch (error) {
    console.error('npm downloads error:', error)
    return { success: false, months: [] as MonthlyDownloads[] }
  }
}
