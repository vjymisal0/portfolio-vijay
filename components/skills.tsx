'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, GitBranch, Bot, Zap, ChevronDown } from 'lucide-react'
import Marquee from '@/components/ui/marquee'
import { onSpotlightMove, SpotlightOverlay } from '@/components/ui/spotlight'
import {
  SiOpenjdk, SiPython, SiJavascript, SiTypescript,
  SiHtml5, SiCss3, SiTailwindcss, SiReact, SiNextdotjs,
  SiNestjs, SiNodedotjs, SiExpress, SiGraphql, SiFlask,
  SiMongodb, SiFirebase, SiMysql,
  SiAmazonwebservices, SiVercel, SiNetlify, SiDocker,
  SiGit, SiGithub, SiRender,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'

type AnyIcon = IconType | LucideIcon

const skillIcons: Record<string, AnyIcon> = {
  'Java':          SiOpenjdk,
  'Python':        SiPython,
  'JavaScript':    SiJavascript,
  'TypeScript':    SiTypescript,
  'HTML':          SiHtml5,
  'CSS':           SiCss3,
  'Tailwind CSS':  SiTailwindcss,
  'React.js':      SiReact,
  'Next.js':       SiNextdotjs,
  'NestJS':        SiNestjs,
  'Node.js':       SiNodedotjs,
  'Express':       SiExpress,
  'GraphQL':       SiGraphql,
  'Flask':         SiFlask,
  'REST APIs':     Server,
  'MongoDB':       SiMongodb,
  'Firebase':      SiFirebase,
  'MySQL':         SiMysql,
  'AWS':           SiAmazonwebservices,
  'Render':        SiRender,
  'Vercel':        SiVercel,
  'Netlify':       SiNetlify,
  'Docker':        SiDocker,
  'CI/CD':         GitBranch,
  'Git':           SiGit,
  'GitHub':        SiGithub,
  'N8N Automation': Bot,
}

const skillsData = [
  {
    category: 'Languages',
    index: '01',
    accent: 'bg-amber-500/15 text-amber-400',
    icon: SiJavascript,
    items: ['Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Frontend',
    index: '02',
    accent: 'bg-cyan-500/15 text-cyan-400',
    icon: SiReact,
    items: ['HTML', 'CSS', 'Tailwind CSS', 'React.js', 'Next.js'],
  },
  {
    category: 'Backend',
    index: '03',
    accent: 'bg-emerald-500/15 text-emerald-400',
    icon: SiNodedotjs,
    items: ['NestJS', 'Node.js', 'Express', 'GraphQL', 'Flask', 'REST APIs'],
  },
  {
    category: 'Databases',
    index: '04',
    accent: 'bg-orange-500/15 text-orange-400',
    icon: SiMongodb,
    items: ['MongoDB', 'Firebase', 'MySQL'],
  },
  {
    category: 'Cloud & DevOps',
    index: '05',
    accent: 'bg-violet-500/15 text-violet-400',
    icon: SiAmazonwebservices,
    items: ['AWS', 'Render', 'Vercel', 'Netlify', 'Docker', 'CI/CD'],
  },
  {
    category: 'Version Control',
    index: '06',
    accent: 'bg-rose-500/15 text-rose-400',
    icon: SiGithub,
    items: ['Git', 'GitHub'],
  },
  {
    category: 'Automation',
    index: '07',
    accent: 'bg-teal-500/15 text-teal-400',
    icon: Zap,
    items: ['N8N Automation'],
  },
]

// Flattened for the marquee rows — every skill paired with its category's
// accent color so the scrolling strip still reads as color-coded.
const allSkills = skillsData.flatMap((cat) => cat.items.map((item) => ({ skill: item, accent: cat.accent })))
const marqueeMid = Math.ceil(allSkills.length / 2)
const marqueeRowA = allSkills.slice(0, marqueeMid)
const marqueeRowB = allSkills.slice(marqueeMid)

function SkillChip({ skill, accent }: { skill: string; accent: string }) {
  const Icon = skillIcons[skill] as AnyIcon | undefined
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs font-medium text-muted-foreground whitespace-nowrap">
      {Icon && (
        <span className={`flex h-5 w-5 items-center justify-center rounded-md ${accent}`}>
          <Icon className="w-3 h-3" />
        </span>
      )}
      {skill}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } },
}

export default function Skills() {
  const [open, setOpen] = useState(false)

  return (
    <div>
        <motion.div
          className="flex flex-col items-center mb-5"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground cursor-pointer"
          >
            Skills
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </button>
          <span className="mt-2 h-[3px] w-10 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
        </motion.div>

        {/* Always-visible showcase strip — the categorized breakdown below
            is opt-in via the toggle above. */}
        <motion.div
          className="mb-5 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Marquee durationSeconds={34}>
            {marqueeRowA.map(({ skill, accent }) => (
              <SkillChip key={skill} skill={skill} accent={accent} />
            ))}
          </Marquee>
          <Marquee durationSeconds={38} reverse>
            {marqueeRowB.map(({ skill, accent }) => (
              <SkillChip key={skill} skill={skill} accent={accent} />
            ))}
          </Marquee>
        </motion.div>

        <AnimatePresence initial={false}>
        {open && (
        <motion.div
          key="skills-grid"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
        <motion.div
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillsData.map((cat) => {
            const CatIcon = cat.icon as AnyIcon
            return (
              <motion.div
                key={cat.category}
                variants={cardVariants}
                onMouseMove={onSpotlightMove}
                className="group group/spotlight relative rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all duration-300 p-4 flex flex-col gap-3"
              >
                <SpotlightOverlay />
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cat.accent}`}>
                      <CatIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {cat.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/40">{cat.index}</span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill) => {
                    const Icon = skillIcons[skill] as AnyIcon | undefined
                    return (
                      <span
                        key={skill}
                        className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-default"
                      >
                        {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
                        {skill}
                      </span>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        </motion.div>
        )}
        </AnimatePresence>
    </div>
  )
}
