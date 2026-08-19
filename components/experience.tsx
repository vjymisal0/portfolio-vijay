'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, CalendarDays, ShieldCheck, Bot, Activity, ChevronDown } from 'lucide-react'
import { SiReact, SiNestjs, SiTypescript, SiNodedotjs } from 'react-icons/si'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'

type AnyIcon = IconType | LucideIcon

const experiences = [
  {
    role: 'SDE 1',
    product: 'LooprIQ Inspect — AI-powered visual inspection for industrial quality control',
    company: 'Loopr AI',
    award: 'GeekWire Startup of the Year 2026',
    location: 'Pune, India',
    period: 'July 2026 – Present',
    type: 'Full-time',
    status: 'Current',
    bullets: [
      'Converted from intern to full-time SDE 1 — continuing to own and ship platform features across the LooprIQ Inspect stack.',
      'Built an n8n workflow to automate performance monitoring of the platform — surfacing key metrics without manual checks.',
    ],
    tech: [
      { icon: SiReact as AnyIcon,      label: 'React' },
      { icon: SiNestjs as AnyIcon,     label: 'NestJS' },
      { icon: SiTypescript as AnyIcon, label: 'TypeScript' },
      { icon: SiNodedotjs as AnyIcon,  label: 'Node.js' },
      { icon: Bot,                     label: 'n8n' },
    ],
    index: '01',
  },
  {
    role: 'SDE Intern',
    product: 'LooprIQ Inspect — AI-powered visual inspection for industrial quality control',
    company: 'Loopr AI',
    award: '',
    location: 'Pune, India',
    period: 'July 2025 – June 2026',
    type: 'Internship',
    status: 'Completed',
    bullets: [
      'Secured Engine APIs with JWT authentication and dynamic API key protection to prevent unauthorized external access.',
      'Migrated runtime feature flags to a database-backed PostHog system — enabling live feature toggles without redeployments.',
      'Built end-to-end platform features: logo management, workspace auto-selection, annotation configuration, and inspection type badges.',
      'Diagnosed and fixed production bugs across login flows, workspace management, and inspection workflows.',
      'Instrumented key APIs with PostHog telemetry to surface AI prediction override rates to the product team.',
      'Built automated E2E test flows using n8n with scheduled weekly sanity runs per customer environment.',
    ],
    tech: [
      { icon: SiReact as AnyIcon,      label: 'React' },
      { icon: SiNestjs as AnyIcon,     label: 'NestJS' },
      { icon: SiTypescript as AnyIcon, label: 'TypeScript' },
      { icon: SiNodedotjs as AnyIcon,  label: 'Node.js' },
      { icon: ShieldCheck,             label: 'JWT' },
      { icon: Activity,                label: 'PostHog' },
      { icon: Bot,                     label: 'n8n' },
    ],
    index: '02',
  },
]

type Experience = (typeof experiences)[number]
const groups: { company: string; location: string; roles: Experience[] }[] = []
for (const exp of experiences) {
  const last = groups[groups.length - 1]
  if (last && last.company === exp.company) {
    last.roles.push(exp)
  } else {
    groups.push({ company: exp.company, location: exp.location, roles: [exp] })
  }
}

export default function Experience() {
  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl">
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-12">Experience</h2>

      <div className="flex flex-col border-t border-border">
        {groups.map((group) => (
          <div key={group.company} className="flex flex-col md:flex-row gap-6 py-8 border-b border-border">
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-xl font-medium text-foreground">{group.company}</h3>
              <p className="text-sm text-muted-foreground mt-1">{group.location}</p>
            </div>
            
            <div className="w-full md:w-2/3 space-y-10">
              {group.roles.map((exp) => (
                <div key={exp.index} className="flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                    <h4 className="text-base font-medium text-foreground">{exp.role}</h4>
                    <span className="text-sm font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  
                  <p className="text-sm font-body text-muted-foreground italic mb-4">{exp.product}</p>

                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm font-body text-muted-foreground leading-relaxed pl-4 relative">
                        <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-foreground/40" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-x-3 gap-y-2">
                    {exp.tech.map(({ label }) => (
                      <span key={label} className="text-xs font-mono text-muted-foreground">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
