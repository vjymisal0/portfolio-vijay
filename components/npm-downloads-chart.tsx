'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getNpmMonthlyDownloads, type DailyDownloads, type MonthlyDownloads } from '@/app/actions/npm'

type Range = 'daily' | 'monthly'
type Point = { key: string; downloads: number }

const monthLabel = (m: string, withYear = false) =>
  new Date(m + '-01T00:00:00').toLocaleDateString('en-US', withYear ? { month: 'long', year: 'numeric' } : { month: 'short' })

const dayLabel = (d: string, withWeekday = false) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', withWeekday ? { weekday: 'short', month: 'short', day: 'numeric' } : { month: 'short', day: 'numeric' })

const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`)

const sum = (days: DailyDownloads[]) => days.reduce((s, d) => s + d.downloads, 0)

// Counts up from 0 the first time it scrolls into view.
function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value.toLocaleString()
      return
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString() },
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref} className={`tabular-nums ${className ?? ''}`}>0</span>
}

function LiveBadge({ through }: { through: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Live · npm registry · through {dayLabel(through)}
    </span>
  )
}

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 px-4 py-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-xl font-medium text-foreground">
        <CountUp value={value} />
      </p>
      {note && <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{note}</p>}
    </div>
  )
}

function ChartTooltip({ active, payload, range }: { active?: boolean; payload?: { payload: Point }[]; range: Range }) {
  if (!active || !payload?.length) return null
  const { key, downloads } = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="text-muted-foreground">{range === 'daily' ? dayLabel(key, true) : monthLabel(key, true)}</p>
      <p className="mt-0.5 font-mono font-medium text-foreground">{downloads.toLocaleString()} downloads</p>
    </div>
  )
}

// Live npm stats: headline counters derived from npm's daily download
// series, plus a glowing area chart that switches between the last 30 days
// and the last 12 months.
export default function NpmDownloadsChart({ packages }: { packages: readonly string[] }) {
  const [months, setMonths] = useState<MonthlyDownloads[]>([])
  const [days, setDays] = useState<DailyDownloads[]>([])
  const [range, setRange] = useState<Range>('daily')
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    getNpmMonthlyDownloads([...packages]).then((res) => {
      if (!res.success) return
      setMonths(res.months)
      setDays(res.days)
    })
  }, [packages])

  if (days.length < 14) return null

  const latest = days[days.length - 1]
  const last7 = sum(days.slice(-7))
  const last30 = sum(days.slice(-30))
  const allYear = sum(days)

  // Skip the empty months before the first package was published, but keep
  // at least six months so the trend has some context.
  const firstActive = months.findIndex((m) => m.downloads > 0)
  const shownMonths = firstActive < 0 ? months : months.slice(Math.max(0, Math.min(firstActive, months.length - 6)))

  // Same idea for the daily view: start at the first day with downloads,
  // keeping at least two weeks.
  const recent = days.slice(-30)
  const firstDay = recent.findIndex((d) => d.downloads > 0)
  const shownDays = firstDay < 0 ? recent : recent.slice(Math.max(0, Math.min(firstDay, recent.length - 14)))

  const data: Point[] = range === 'daily'
    ? shownDays.map((d) => ({ key: d.day, downloads: d.downloads }))
    : shownMonths.map((m) => ({ key: m.month, downloads: m.downloads }))

  return (
    <div className="mb-14 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono text-primary">$ npm stats --live</p>
          <h3 className="mt-1 font-serif text-xl font-medium text-foreground">npm downloads</h3>
          <p className="mt-1 text-xs text-muted-foreground">All {packages.length} packages combined</p>
        </div>
        <LiveBadge through={latest.day} />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={`Latest day · ${dayLabel(latest.day)}`} value={latest.downloads} />
        <Stat label="Last 7 days" value={last7} note={`~${Math.round(last7 / 7).toLocaleString()}/day avg`} />
        <Stat label="Last 30 days" value={last30} />
        <Stat label="Last 12 months" value={allYear} />
      </div>

      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground">
          {range === 'daily' ? `Daily downloads, last ${shownDays.length} days` : `Monthly downloads, last ${shownMonths.length} months`}
        </p>
        <div className="inline-flex rounded-lg border border-border bg-background/60 p-0.5 font-mono text-[11px]" role="tablist" aria-label="Chart range">
          {(['daily', 'monthly'] as const).map((r) => (
            <button
              key={r}
              role="tab"
              aria-selected={range === r}
              onClick={() => setRange(r)}
              className={`rounded-md px-2.5 py-1 transition-colors ${range === r ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {r === 'daily' ? '30d' : '12m'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart key={range} data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
            <defs>
              <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.28} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 4" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="key"
              tickFormatter={(k) => (range === 'daily' ? dayLabel(k) : monthLabel(k))}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickMargin={8}
            />
            <YAxis
              tickFormatter={compact}
              tickLine={false}
              axisLine={false}
              width={48}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<ChartTooltip range={range} />} cursor={{ stroke: 'hsl(var(--primary))', strokeOpacity: 0.3, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="downloads"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill={`url(#fill-${id})`}
              filter={`url(#glow-${id})`}
              animationDuration={900}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: 'hsl(var(--background))', fill: 'hsl(var(--primary))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
