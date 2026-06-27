'use client'

import { motion } from 'framer-motion'
import { Server, GitBranch, Bot, Zap } from 'lucide-react'
import {
  SiOpenjdk, SiPython, SiJavascript, SiTypescript,
  SiHtml5, SiCss3, SiTailwindcss, SiReact, SiNextdotjs,
  SiNestjs, SiNodedotjs, SiExpress, SiGraphql, SiFlask,
  SiMongodb, SiFirebase, SiMysql,
  SiAmazonwebservices, SiVercel, SiNetlify, SiDocker,
  SiGit, SiGithub,
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 14, stiffness: 100 } },
}

export default function Skills() {
  return (
    <section className="relative h-full bg-gradient-to-b from-background to-secondary/10">
      <div className="scroll-reliable h-full py-5 pb-28 lg:pb-6">
        <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-2xl font-bold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Skills
        </motion.h2>

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
                className="group relative rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.04)] transition-all duration-300 p-4 flex flex-col gap-3"
              >
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
        </div>
      </div>
      {/* "more content" fade hint at the bottom (mobile) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent lg:hidden" />
    </section>
  )
}
