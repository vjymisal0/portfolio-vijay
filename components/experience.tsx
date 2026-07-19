'use client'

import { motion } from 'framer-motion'
import ElasticScroll from '@/components/elastic-scroll'
import SectionTitle from '@/components/section-title'
import { Briefcase, MapPin, CalendarDays, ShieldCheck, Bot, Activity } from 'lucide-react'
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
    statusColor: 'bg-emerald-500/15 text-emerald-400',
    dotColor: 'border-emerald-400 bg-emerald-400/20',
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
    statusColor: 'bg-sky-500/15 text-sky-400',
    dotColor: 'border-sky-400 bg-sky-400/20',
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

// Group consecutive roles at the same company — LinkedIn-style "grouped
// positions": one company header, multiple role entries beneath it
// connected by a timeline of dots (a promotion/role-change within the
// same tenure), instead of duplicating the company card per role.
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } },
}

export default function Experience() {
  return (
    <section className="h-full">
      <ElasticScroll
        className="h-full"
        innerClassName="min-h-full flex flex-col py-6 px-4 pb-24 lg:pb-6"
      >
      <div className="container mx-auto max-w-2xl my-auto">
        <SectionTitle className="mb-6">Experience</SectionTitle>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {groups.map((group) => (
            <motion.div
              key={group.company}
              variants={itemVariants}
              className="rounded-xl border border-border bg-card/40 p-4 sm:p-6"
            >
              {/* Company header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground leading-snug">{group.company}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {group.location}
                  </p>
                </div>
              </div>

              {/* Roles — connected by a timeline when there's more than one */}
              <div className="relative">
                {group.roles.length > 1 && (
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                )}
                <div className="space-y-6">
                  {group.roles.map((exp) => (
                    <div key={exp.index} className="relative pl-6">
                      <span
                        className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 z-10 ${exp.dotColor}`}
                      />

                      {/* Role header */}
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold leading-snug text-foreground">
                            {exp.role}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-0.5">
                            <p className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider">
                              {exp.type}
                            </p>
                            {exp.award && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-medium">
                                🏆 {exp.award}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground/50 mt-0.5 italic">
                            {exp.product}
                          </p>
                        </div>
                        <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${exp.statusColor}`}>
                          {exp.status}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 my-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-3 h-3" /> {exp.period}
                        </span>
                        <span className="ml-auto font-mono text-muted-foreground/40">{exp.index}</span>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-1.5 mb-4">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400/60 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Tech chips */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                        {exp.tech.map(({ icon: Icon, label }) => (
                          <span
                            key={label}
                            className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
      </ElasticScroll>
    </section>
  )
}
