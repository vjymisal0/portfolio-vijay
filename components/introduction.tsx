'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import GitHubCharts from './github-charts'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

export default function Introduction() {
  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl pb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-start gap-6 min-w-0">
          <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
            Software engineer · Pune, India
          </motion.div>

          <motion.h1
            className="max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-mono font-medium tracking-[-0.04em] leading-[0.98] text-foreground"
            variants={itemVariants}
          >
            Software engineer, building with AI.
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mt-4 leading-relaxed font-mono"
            variants={itemVariants}
          >
            I&apos;m Vijay, an SDE 1 at Loopr AI. I build full-stack software and automated workflows, combining AI tools such as Hermes Agent, Pi Agent, Claude, and ChatGPT with reliable engineering practices.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:misalvijay153@gmail.com"
              className="group inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-[0_8px_24px_hsl(var(--primary)/0.2)]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Get in touch
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex max-w-3xl flex-wrap gap-2">
            {['Workflow automation', 'Scheduled jobs & cron', 'AI agent orchestration', 'API & webhook integrations', 'Monitoring & alerts'].map((skill) => (
              <span key={skill} className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground">
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.nav variants={itemVariants} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <a href="https://github.com/vjymisal0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              <FaGithub className="h-[18px] w-[18px]" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/vijaymisal/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              <FaLinkedin className="h-[18px] w-[18px]" /> LinkedIn
            </a>
            <a href="mailto:misalvijay153@gmail.com" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              <FaEnvelope className="h-[18px] w-[18px]" /> Email
            </a>
          </motion.nav>
        </div>

        {/* Portrait temporarily removed — re-add the framed <img src="/vijay-terminal.webp">
            block (with bottom gradient overlay) here when ready. */}

        <motion.div variants={itemVariants} className="mt-14 pt-8 border-t border-border">
          <GitHubCharts />
        </motion.div>
      </motion.div>
    </section>
  )
}
