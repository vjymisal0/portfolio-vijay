'use server'

const GITHUB_USERNAME = 'vjymisal0'

export type ContributionDay = { date: string; count: number; level: number }

// Every contribution since the account was created (Jan 2022), with per-year
// totals so the heatmap can switch between years.
export async function getContributionCalendar() {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=all`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!res.ok) throw new Error('Failed to fetch contribution calendar')

    const data = await res.json()
    const today = new Date().toISOString().slice(0, 10)
    const days: ContributionDay[] = (data.contributions ?? [])
      .filter((d: ContributionDay) => d.date <= today)
      .sort((a: ContributionDay, b: ContributionDay) => a.date.localeCompare(b.date))
    const totals: Record<string, number> = data.total ?? {}

    return { success: true, days, totals }
  } catch (error) {
    console.error('GitHub contribution calendar error:', error)
    return { success: false, days: [] as ContributionDay[], totals: {} as Record<string, number> }
  }
}
