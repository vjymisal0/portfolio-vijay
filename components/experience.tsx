'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, CalendarDays } from 'lucide-react'
import { SiReact, SiNodedotjs, SiNestjs, SiTypescript, SiDocker } from 'react-icons/si'
import type { IconType } from 'react-icons'

const experiences = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Loopr AI',
    location: 'Remote, India',
    period: 'Jun 2025 – Present',
    duration: '1 Year',
    type: 'Internship',
    status: 'Current',
    statusColor: 'bg-emerald-500/15 text-emerald-400',
    accent: 'hover:border-emerald-500/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.05)]',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
    bullets: [
      'Built and maintained full-stack web features using React, NestJS, and Node.js in a production environment.',
      'Collaborated with the product team to ship new modules, improving performance and user experience.',
      'Integrated REST APIs and worked with cloud infrastructure for scalable deployments.',
      'Participated in code reviews, sprint planning, and agile development cycles.',
    ],
    tech: [
      { icon: SiReact, label: 'React' },
      { icon: SiNodedotjs, label: 'Node.js' },
      { icon: SiNestjs, label: 'NestJS' },
      { icon: SiTypescript, label: 'TypeScript' },
      { icon: SiDocker, label: 'Docker' },
    ],
    index: '01',
  },
]

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
    <section className="h-full flex flex-col justify-center py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.h2
          className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-border" />

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((exp) => (
              <motion.div key={exp.index} variants={itemVariants} className="flex gap-5">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 flex flex-col items-center pt-4">
                  <div className={`w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center z-10 ${exp.iconBg}`}>
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl border border-border bg-card/40 hover:bg-card/70 transition-all duration-300 p-5 group ${exp.accent}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                        {exp.type}
                      </p>
                      <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${exp.statusColor}`}>
                      {exp.status}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3 h-3" /> {exp.period}
                    </span>
                    <span className="ml-auto font-mono text-muted-foreground/50">{exp.index}</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
