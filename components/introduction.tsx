'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
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
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-none text-foreground"
            variants={itemVariants}
          >
            Vijay Misal
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mt-4 leading-relaxed font-grotesk"
            variants={itemVariants}
          >
            SDE 1 at Loopr AI, where I build full-stack features for LooprIQ Inspect — an AI-powered visual inspection platform for industrial quality control. My work spans secure APIs, feature flags, telemetry, and workflow automation. I enjoy taking ambiguous problems and shaping them into reliable, well-crafted software.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              Download Resume
            </a>
            <a
              href="/#oss"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/40"
            >
              View work
            </a>
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
