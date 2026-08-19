'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const commitData = [
  { month: 'Jan', commits: 45 },
  { month: 'Feb', commits: 52 },
  { month: 'Mar', commits: 38 },
  { month: 'Apr', commits: 65 },
  { month: 'May', commits: 48 },
  { month: 'Jun', commits: 70 },
]

const languageData = [
  { name: 'TypeScript', value: 65 },
  { name: 'JavaScript', value: 20 },
  { name: 'Python', value: 10 },
  { name: 'Go', value: 5 },
]

// Map to our stark CSS variables for perfect theme compatibility
const COLORS = [
  'hsl(var(--foreground))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--border))',
  'hsl(var(--secondary))'
]

export default function GitHubCharts() {
  return (
    <div className="pt-8 pb-16">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Activity Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-12">
        {/* Commits Bar Chart */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Commits</h3>
            <p className="text-sm text-muted-foreground mt-1">Last 6 months</p>
          </div>
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commitData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="month" 
                  stroke="currentColor" 
                  fontSize={12} 
                  className="text-muted-foreground" 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="currentColor" 
                  fontSize={12} 
                  className="text-muted-foreground" 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar 
                  dataKey="commits" 
                  fill="hsl(var(--foreground))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Languages Pie Chart */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Languages</h3>
            <p className="text-sm text-muted-foreground mt-1">Most used</p>
          </div>
          <div className="h-52 w-full flex items-center justify-center mt-4">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-x-6 gap-y-3 flex-wrap mt-auto pt-4">
            {languageData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
