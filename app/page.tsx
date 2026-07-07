'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from '@/components/introduction'
import Work from '@/components/work'
import Experience from '@/components/experience'
import StickyNavbar from '@/components/sticky-navbar'
import ThemeToggle from '@/components/theme-toggle'

const SECTIONS = ['home', 'experience', 'work'] as const
type SectionId = (typeof SECTIONS)[number]

function isSection(id: string): id is SectionId {
  return (SECTIONS as readonly string[]).includes(id)
}

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case 'home':         return <Introduction />
    case 'experience':   return <Experience />
    case 'work':         return <Work />
    default: return null
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  // Sync the active section with the URL hash so sections are deep-linkable
  // and the browser back/forward buttons work.
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace('#', '')
      if (isSection(id)) setActiveSection(id)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const handleNavigate = (id: string) => {
    if (isSection(id)) setActiveSection(id)
    if (window.location.hash.replace('#', '') !== id) {
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-background text-foreground">
      <StickyNavbar activeSection={activeSection} onNavigate={handleNavigate} />
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <main className="flex-1 overflow-hidden relative pb-16 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <SectionContent id={activeSection} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
