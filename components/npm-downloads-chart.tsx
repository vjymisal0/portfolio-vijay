'use client'

import { useEffect, useId, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getNpmMonthlyDownloads, type MonthlyDownloads } from '@/app/actions/npm'

const monthLabel = (m: string, withYear = false) =>
  new Date(m + '-01T00:00:00').toLocaleDateString('en-US', withYear ? { month: 'long', year: 'numeric' } : { month: 'short' })

const compact = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`)

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: MonthlyDownloads }[] }) {
  if (!active || !payload?.length) return null
  const { month, downloads } = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="text-muted-foreground">{monthLabel(month, true)}</p>
      <p className="mt-0.5 font-mono font-medium text-foreground">{downloads.toLocaleString()} downloads</p>
    </div>
  )
}

// Line chart in the EvilCharts style: glowing stroke, soft gradient fill,
// dashed horizontal grid, and a minimal tooltip.
export default function NpmDownloadsChart({ packages }: { packages: readonly string[] }) {
  const [months, setMonths] = useState<MonthlyDownloads[]>([])
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    getNpmMonthlyDownloads([...packages]).then((res) => res.success && setMonths(res.months))
  }, [packages])

  // Skip the empty months before the first package was published, but keep
  // at least six months so the trend has some context.
  const firstActive = months.findIndex((m) => m.downloads > 0)
  const shown = firstActive < 0 ? months : months.slice(Math.max(0, Math.min(firstActive, months.length - 6)))

  if (shown.length === 0) return null

  const total = shown.reduce((sum, m) => sum + m.downloads, 0)
  const current = shown[shown.length - 1]

  return (
    <div className="mb-14 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono text-primary">$ npm stats --monthly</p>
          <h3 className="mt-1 font-serif text-xl font-medium text-foreground">Monthly npm downloads</h3>
          <p className="mt-1 text-xs text-muted-foreground">All {packages.length} packages combined, last {shown.length} months</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl font-medium text-foreground">{total.toLocaleString()}</p>
          <p className="text-[11px] text-muted-foreground">
            downloads · {current.downloads.toLocaleString()} in {monthLabel(current.month)} so far
          </p>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={shown} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
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
              dataKey="month"
              tickFormatter={(m) => monthLabel(m)}
              tickLine={false}
              axisLine={false}
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
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeOpacity: 0.3, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="downloads"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fill={`url(#fill-${id})`}
              filter={`url(#glow-${id})`}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: 'hsl(var(--background))', fill: 'hsl(var(--primary))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
