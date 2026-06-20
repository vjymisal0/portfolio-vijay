'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from '@/components/introduction'
import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Achievements from '@/components/achievements'
import CoursesAndCertifications from '@/components/courses-certifications'
import Education from '@/components/education'
import Experience from '@/components/experience'
import Contact from '@/components/contact'
import StickyNavbar from '@/components/sticky-navbar'
import Footer from '@/components/footer'

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case 'home':         return <Introduction />
    case 'experience':   return <Experience />
    case 'skills':       return <Skills />
    case 'education':    return <Education />
    case 'projects':     return <Projects />
    case 'achievements': return <Achievements />
    case 'courses':      return <CoursesAndCertifications />
    case 'contact':
      return (
        <div className="h-full flex flex-col">
          <div className="flex-grow"><Contact /></div>
          <Footer />
        </div>
      )
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
