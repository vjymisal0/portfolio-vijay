'use server'

const GITHUB_USERNAME = 'vjymisal0'

export async function getLiveGitHubStats() {
  try {
    // Attempt to fetch public repos to calculate language distribution
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!res.ok) throw new Error('Failed to fetch from GitHub API')
    
    const repos = await res.json()
    
    // Calculate language distribution
    const langCounts: Record<string, number> = {}
    let total = 0
    
    for (const repo of repos) {
      if (repo.language && !repo.fork) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
        total++
      }
    }
    
    const languageData = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        value: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4) // Top 4 languages
      
    return {
      success: true,
      languageData: languageData.length > 0 ? languageData : null
    }
  } catch (error) {
    console.error('GitHub API error:', error)
    return { success: false, languageData: null }
  }
}

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
