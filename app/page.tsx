'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from '@/components/introduction'
import Work from '@/components/work'
import Experience from '@/components/experience'
import StickyNavbar from '@/components/sticky-navbar'

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case 'home':         return <Introduction />
    case 'experience':   return <Experience />
    case 'work':         return <Work />
    default: return null
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    document.body.classList.add('dark')
  }, [])

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-background text-foreground">
      <StickyNavbar activeSection={activeSection} onNavigate={setActiveSection} />
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
