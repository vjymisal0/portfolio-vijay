'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Bot, Activity, ScanSearch } from 'lucide-react'
import { SiReact, SiNestjs, SiTypescript, SiNodedotjs, SiPython } from 'react-icons/si'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'
import { AnnotatedText } from '@/components/ui/annotated-text'
import { techColorHex } from '@/lib/tech-colors'
import Education from '@/components/education'

type AnyIcon = IconType | LucideIcon

const experiences = [
  {
    role: 'AI Engineer',
    product: 'LooprIQ Inspect — AI-powered visual inspection for industrial quality control',
    company: 'Loopr AI',
    location: 'Pune, India',
    period: 'July 2026 – Present',
    type: 'Full-time',
    status: 'Current',
    bullets: [
      'Trained a YOLO11s defect detector (6 classes, Encord data) with leak-free splits, augmentation, and per-class thresholds, reaching ~89% inspection-level accuracy.',
      'Extended the ML inference pipeline to handle two-image requests, and built n8n webhook integrations and performance monitoring.',
      'Added blur-frame filtering and review-mode navigation; merged 20 PRs across two release lines.',
    ],
    tech: [
      { icon: SiPython as AnyIcon,     label: 'Python' },
      { icon: ScanSearch,              label: 'YOLO11' },
      { icon: SiReact as AnyIcon,      label: 'React' },
      { icon: SiNestjs as AnyIcon,     label: 'NestJS' },
      { icon: SiTypescript as AnyIcon, label: 'TypeScript' },
      { icon: Bot,                     label: 'n8n' },
    ],
    index: '01',
  },
  {
    role: 'SDE Intern',
    product: 'LooprIQ Inspect — AI-powered visual inspection for industrial quality control',
    company: 'Loopr AI',
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
      <div className="mb-10"><p className="mb-2 text-[11px] font-mono text-primary">$ cat experience.log</p><h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">Experience</h2><p className="mt-3 max-w-xl text-sm text-muted-foreground">A timeline of shipping, learning, and making systems <AnnotatedText variant="underline" color="text-primary">more dependable</AnnotatedText>.</p></div>

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
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono ${
                        exp.status === 'Current'
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-muted-foreground bg-foreground/5 border-border'
                      }`}
                    >
                      {exp.status === 'Current' && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                      {exp.period}
                    </span>
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
                    {exp.tech.map(({ icon: Icon, label }) => (
                      <span key={label} className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border border-border bg-foreground/[0.03] text-foreground/75">
                        <Icon className="w-3 h-3 shrink-0" style={{ color: techColorHex(label) }} />
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

      <div className="mt-16">
        <Education />
      </div>
    </section>
  )
}
