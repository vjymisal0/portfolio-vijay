'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Introduction from '@/components/introduction'
import BuildSystems from '@/components/build-systems'
import Experience from '@/components/experience'
import OpenSource from '@/components/open-source'

const SECTIONS = ['home', 'experience', 'builds', 'oss'] as const
type SectionId = (typeof SECTIONS)[number]

function isSection(id: string): id is SectionId {
  return (SECTIONS as readonly string[]).includes(id)
}

function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case 'home': return <Introduction />
    case 'experience': return <Experience />
    case 'builds': return <BuildSystems />
    case 'oss': return <OpenSource />
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '')
      setActiveSection(isSection(hash) ? hash : 'home')
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        role="region"
        aria-label={`${activeSection} content`}
        tabIndex={0}
        className="absolute inset-0 h-full overflow-y-auto pb-32"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      >
        <div className="pt-24 lg:pt-32">
          <SectionContent id={activeSection} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
