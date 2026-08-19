'use client'

import { useEffect, useMemo, useState } from 'react'
import { getContributionCalendar, type ContributionDay } from '@/app/actions/github'

const LEVEL_COLORS = [
  'hsl(var(--border))',
  '#164a85',
  '#1c5cab',
  '#2a78d6',
  '#5598e7',
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function buildWeeks(days: ContributionDay[]) {
  if (days.length === 0) return []
  const cells: (ContributionDay | null)[] = []
  const firstDow = new Date(days[0].date + 'T00:00:00').getDay()
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (const d of days) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

function monthLabels(weeks: (ContributionDay | null)[][]) {
  const labels: { week: number; label: string }[] = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstDay = week.find((d) => d !== null)
    if (!firstDay) return
    const month = new Date(firstDay.date + 'T00:00:00').getMonth()
    if (month !== lastMonth) {
      labels.push({ week: wi, label: MONTHS[month] })
      lastMonth = month
    }
  })
  return labels
}

const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function ContributionHeatmap({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const [days, setDays] = useState<ContributionDay[]>([])
  const [total, setTotal] = useState(0)
  const [hover, setHover] = useState<ContributionDay | null>(null)

  useEffect(() => {
    getContributionCalendar().then((res) => {
      if (res.success) {
        setDays(res.days)
        setTotal(res.total)
      }
    })
  }, [])

  const visibleDays = useMemo(() => {
    if (variant === 'full') return days
    return days.slice(-105) // ~15 weeks for the compact teaser
  }, [days, variant])

  const weeks = useMemo(() => buildWeeks(visibleDays), [visibleDays])
  const months = useMemo(() => (variant === 'full' ? monthLabels(weeks) : []), [weeks, variant])

  const cellSize = variant === 'full' ? 11 : 9
  const gap = variant === 'full' ? 3 : 2

  if (days.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      {variant === 'full' && (
        <div
          className="flex text-[10px] text-muted-foreground mb-1"
          style={{ paddingLeft: 0, gap }}
        >
          {weeks.map((_, wi) => {
            const m = months.find((m) => m.week === wi)
            return (
              <div key={wi} style={{ width: cellSize }}>
                {m?.label}
              </div>
            )
          })}
        </div>
      )}
      <div className="relative">
        <div className="flex" style={{ gap }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap }}>
              {week.map((day, di) => (
                <div
                  key={di}
                  onMouseEnter={() => day && setHover(day)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderRadius: 2,
                    backgroundColor: day ? LEVEL_COLORS[day.level] : 'transparent',
                  }}
                  className={day ? 'cursor-pointer transition-transform hover:scale-125' : ''}
                />
              ))}
            </div>
          ))}
        </div>
        {hover && (
          <div className="absolute -top-9 left-0 rounded-lg border border-border bg-background px-2.5 py-1.5 shadow-lg text-xs whitespace-nowrap z-10 pointer-events-none">
            <span className="font-medium text-foreground">{hover.count} contribution{hover.count === 1 ? '' : 's'}</span>
            <span className="text-muted-foreground"> &middot; {formatDate(hover.date)}</span>
          </div>
        )}
      </div>
      {variant === 'full' && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">{total} contributions in the last year</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span className="text-[10px] text-muted-foreground">More</span>
          </div>
        </div>
      )}
    </div>
  )
}
