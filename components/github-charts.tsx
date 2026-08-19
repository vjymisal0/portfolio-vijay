'use client'

import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts'
import { getLiveGitHubStats } from '@/app/actions/github'

const velocityData = [
  { month: 'Jan', commits: 25 },
  { month: 'Feb', commits: 42 },
  { month: 'Mar', commits: 38 },
  { month: 'Apr', commits: 85 },
  { month: 'May', commits: 68 },
  { month: 'Jun', commits: 110 },
  { month: 'Jul', commits: 90 },
]

const fallbackLanguageData = [
  { name: 'TypeScript', value: 65 },
  { name: 'JavaScript', value: 20 },
  { name: 'Python', value: 10 },
  { name: 'Go', value: 5 },
]

const skillData = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Database', A: 75, fullMark: 100 },
  { subject: 'DevOps', A: 60, fullMark: 100 },
  { subject: 'Testing', A: 70, fullMark: 100 },
  { subject: 'Architecture', A: 80, fullMark: 100 },
]

// Map to our stark CSS variables
const COLORS = [
  'hsl(var(--foreground))',
  'hsl(var(--muted-foreground))',
  'hsl(var(--border))',
  'hsl(var(--secondary))'
]

export default function GitHubCharts() {
  const [languageData, setLanguageData] = useState(fallbackLanguageData)

  useEffect(() => {
    async function loadStats() {
      const { success, languageData } = await getLiveGitHubStats()
      if (success && languageData) {
        setLanguageData(languageData)
      }
    }
    loadStats()
  }, [])
  return (
    <div className="pt-12 pb-8">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Developer Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        
        {/* Velocity Area Chart */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Contribution Velocity</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">Code frequency over the last 7 months</p>
          </div>
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={velocityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="currentColor" 
                  fontSize={12} 
                  className="text-muted-foreground" 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="currentColor" 
                  fontSize={12} 
                  className="text-muted-foreground" 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="hsl(var(--foreground))" 
                  fillOpacity={1} 
                  fill="url(#colorCommits)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Radar Chart */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Engineering Profile</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">Domain expertise distribution</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="hsl(var(--foreground))"
                  fill="hsl(var(--foreground))"
                  fillOpacity={0.1}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Languages Pie Chart */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">Languages</h3>
            <p className="text-sm font-body text-muted-foreground mt-1">Primary tech stack</p>
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
                <span className="font-body text-xs">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
