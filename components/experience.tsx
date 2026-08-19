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
      <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground mb-8">Experience</h2>

      <div className="flex flex-col gap-3">
        {groups.map((group, groupIdx) => (
          <details key={group.company} open={groupIdx === 0} className="group rounded-xl border border-border bg-card/10 transition-colors hover:border-foreground/30">
            <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:gap-6 sm:p-5 [&::-webkit-details-marker]:hidden">
              <div className="w-10 h-10 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-foreground/70" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg text-foreground">{group.company}</span>
                <span className="font-mono text-xs text-muted-foreground">{group.roles[0].role}</span>
              </div>
              <span className="ml-auto whitespace-nowrap font-mono text-[0.7rem] text-muted-foreground sm:text-xs">
                {group.roles[group.roles.length - 1].period.split(' – ')[0]} – {group.roles[0].period.split(' – ')[1]}
              </span>
              <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pl-14 sm:pl-16">
              <div className="relative">
                {group.roles.length > 1 && (
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                )}
                <div className="space-y-8">
                  {group.roles.map((exp) => (
                    <div key={exp.index} className="relative pl-6">
                      <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-foreground/30 bg-background z-10" />

                      <div className="flex flex-col mb-4">
                        <h4 className="text-sm font-semibold leading-snug text-foreground">
                          {exp.role}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {exp.product}
                        </p>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {exp.tech.map(({ icon: Icon, label }) => (
                          <span
                            key={label}
                            className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-mono text-muted-foreground bg-foreground/5 border border-transparent"
                          >
                            <Icon className="w-3 h-3" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
