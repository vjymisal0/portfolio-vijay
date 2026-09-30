'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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

export default function ContributionHeatmap() {
  const [days, setDays] = useState<ContributionDay[]>([])
  const [totals, setTotals] = useState<Record<string, number>>({})
  const [range, setRange] = useState<string>('')
  const [hover, setHover] = useState<{ day: ContributionDay; x: number; y: number } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getContributionCalendar().then((res) => {
      if (res.success) {
        setDays(res.days)
        setTotals(res.totals)
      }
    })
  }, [])

  const years = useMemo(() => Object.keys(totals).sort((a, b) => b.localeCompare(a)), [totals])
  const allTime = useMemo(() => Object.values(totals).reduce((a, b) => a + b, 0), [totals])

  // Default to the most recent year until the visitor picks one.
  const year = range || years[0] || ''
  const visibleDays = useMemo(() => days.filter((d) => d.date.startsWith(year)), [days, year])

  const rangeTotal = useMemo(() => visibleDays.reduce((sum, d) => sum + d.count, 0), [visibleDays])
  const weeks = useMemo(() => buildWeeks(visibleDays), [visibleDays])
  const months = useMemo(() => monthLabels(weeks), [weeks])

  const cellSize = 11
  const gap = 3

  if (days.length === 0) return null


  return (
    <div className="flex flex-col gap-3">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{allTime.toLocaleString()}</span> contributions since {years[years.length - 1]}
        </p>
        <div role="tablist" aria-label="Contribution year" className="flex flex-wrap gap-1">
          {years.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={year === t}
              onClick={() => setRange(t)}
              className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${year === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="-mt-10 overflow-x-auto pb-1 pt-10">
        <div ref={gridRef} className="relative w-max">
          <div className="flex text-[10px] text-muted-foreground mb-1" style={{ gap }}>
            {weeks.map((_, wi) => {
              const m = months.find((m) => m.week === wi)
              return (
                <div key={wi} className="whitespace-nowrap" style={{ width: cellSize }}>
                  {m?.label}
                </div>
              )
            })}
          </div>
          <div className="flex" style={{ gap }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    onMouseEnter={(e) => {
                      if (!day || !gridRef.current) return
                      const g = gridRef.current.getBoundingClientRect()
                      const c = e.currentTarget.getBoundingClientRect()
                      setHover({ day, x: c.left - g.left + c.width / 2, y: c.top - g.top })
                    }}
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
            <div
              role="tooltip"
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-[11px] text-background shadow-lg"
              style={{ left: hover.x, top: hover.y - 6 }}
            >
              <span className="font-semibold">{hover.day.count === 0 ? 'No' : hover.day.count} contribution{hover.day.count === 1 ? '' : 's'}</span> on {formatDate(hover.day.date)}
              <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          {rangeTotal.toLocaleString()} contributions in {year}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground">Less</span>
          {LEVEL_COLORS.map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: c }} />
          ))}
          <span className="text-[10px] text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}
