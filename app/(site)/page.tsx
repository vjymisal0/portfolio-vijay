'use client'

import { motion } from 'framer-motion'
import Introduction from '@/components/introduction'
import ProjectsSection from '@/components/work'
import Experience from '@/components/experience'
import OpenSource from '@/components/open-source'
import GitHubStats from '@/components/github-stats'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col pb-32">
      <FadeIn>
        <div id="home">
          <Introduction />
        </div>
      </FadeIn>
      
      <FadeIn delay={0.1}>
        <div id="experience" className="pt-24">
          <Experience />
        </div>
      </FadeIn>
      
      <FadeIn delay={0.1}>
        <div id="projects" className="pt-24">
          <ProjectsSection />
        </div>
      </FadeIn>
      
      <FadeIn delay={0.1}>
        <div id="oss" className="pt-24">
          <OpenSource />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div id="stats">
          <GitHubStats />
        </div>
      </FadeIn>
    </div>
  )
}
