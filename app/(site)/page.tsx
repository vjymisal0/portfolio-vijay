'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from '@/components/introduction'
import ProjectsSection from '@/components/work'
import Experience from '@/components/experience'
import OpenSource from '@/components/open-source'
import ToolsAndTech from '@/components/tools-tech'
import RecentThoughts from '@/components/recent-thoughts'

const SECTIONS = ['home', 'experience', 'projects', 'tools', 'oss', 'blog'] as const
type SectionId = (typeof SECTIONS)[number]

function isSection(id: string): id is SectionId {
  return (SECTIONS as readonly string[]).includes(id)
}

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case 'home':         return <Introduction />
    case 'experience':   return <Experience />
    case 'projects':     return <ProjectsSection />
    case 'tools':        return <ToolsAndTech />
    case 'oss':          return <OpenSource />
    case 'blog':         return <RecentThoughts />
    default: return null
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace('#', '')
      if (isSection(id)) setActiveSection(id)
    }

    const handoff = sessionStorage.getItem('goto-section')
    if (handoff && isSection(handoff)) {
      sessionStorage.removeItem('goto-section')
      setActiveSection(handoff)
      if (window.location.hash !== `#${handoff}`) {
        history.replaceState(null, '', `/#${handoff}`)
      }
      window.dispatchEvent(new Event('hashchange'))
    } else {
      applyHash()
    }

    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    const warm = () => { void fetch('/blog').catch(() => {}) }
    const hasRic = typeof window.requestIdleCallback === 'function'
    const id = hasRic ? window.requestIdleCallback(warm) : window.setTimeout(warm, 1500)
    return () => {
      if (hasRic) window.cancelIdleCallback(id as number)
      else window.clearTimeout(id as number)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        className="absolute inset-0 h-full overflow-y-auto pb-32 hide-scrollbar"
        initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(2px)" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="pt-24 lg:pt-32">
          <SectionContent id={activeSection} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
