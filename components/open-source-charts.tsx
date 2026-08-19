'use client'

import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts'
import { contributions, kindMeta, type Kind } from '@/lib/data'

const formatDay = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

function useActivityData() {
  return useMemo(() => {
    const counts = new Map<string, number>()
    for (const c of contributions) counts.set(c.date, (counts.get(c.date) || 0) + 1)
    return Array.from(counts.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, label: formatDay(date), count }))
  }, [])
}

function useKindData() {
  return useMemo(() => {
    const counts = new Map<Kind, number>()
    for (const c of contributions) counts.set(c.kind as Kind, (counts.get(c.kind as Kind) || 0) + 1)
    return Array.from(counts.entries())
      .map(([kind, count]) => ({ kind, count, ...kindMeta[kind] }))
      .sort((a, b) => b.count - a.count)
  }, [])
}

function ActivityTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg text-xs">
      <div className="font-medium text-foreground">{p.label}, 2026</div>
      <div className="text-muted-foreground mt-0.5">{p.count} PR{p.count === 1 ? '' : 's'} merged</div>
    </div>
  )
}

export default function OpenSourceCharts() {
  const activity = useActivityData()
  const kinds = useKindData()
  const [hoverKind, setHoverKind] = useState<string | null>(null)
  const total = contributions.length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-10 gap-y-10 mb-16 pb-12 border-b border-border">
      {/* Activity over time */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Merge activity</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Pull requests merged per day, most recent streak</p>
        </div>
        <div className="h-52 w-full -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap={4}>
              <XAxis
                dataKey="label"
                stroke="hsl(var(--border))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                interval="preserveStartEnd"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={24}
              />
              <Tooltip content={<ActivityTooltip />} cursor={{ fill: 'hsl(var(--foreground) / 0.04)' }} />
              <Bar dataKey="count" fill="#2a78d6" radius={[4, 4, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kind breakdown */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Contribution type</h3>
          <p className="text-xs text-muted-foreground mt-0.5">What kind of change each merged PR made</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="h-36 w-36 shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={kinds}
                  dataKey="count"
                  nameKey="label"
                  innerRadius={42}
                  outerRadius={64}
                  paddingAngle={3}
                  stroke="none"
                >
                  {kinds.map((k) => (
                    <Cell
                      key={k.kind}
                      fill={k.hex}
                      opacity={hoverKind && hoverKind !== k.kind ? 0.3 : 1}
                      onMouseEnter={() => setHoverKind(k.kind)}
                      onMouseLeave={() => setHoverKind(null)}
                      style={{ cursor: 'pointer', transition: 'opacity 150ms' }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-serif text-2xl font-medium text-foreground">{total}</span>
              <span className="text-[10px] text-muted-foreground">PRs</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-0">
            {kinds.map((k) => (
              <div
                key={k.kind}
                className="flex items-center gap-2 text-xs cursor-pointer"
                onMouseEnter={() => setHoverKind(k.kind)}
                onMouseLeave={() => setHoverKind(null)}
                style={{ opacity: hoverKind && hoverKind !== k.kind ? 0.4 : 1 }}
              >
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: k.hex }} />
                <span className="text-foreground/90">{k.label}</span>
                <span className="text-muted-foreground ml-auto font-mono">{k.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
