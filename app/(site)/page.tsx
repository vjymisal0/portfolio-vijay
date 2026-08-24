'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Introduction from '@/components/introduction'
import ProjectsSection from '@/components/work'
import Experience from '@/components/experience'
import OpenSource from '@/components/open-source'

const SECTIONS = ['home', 'oss', 'experience', 'projects'] as const
type SectionId = (typeof SECTIONS)[number]

function isSection(id: string): id is SectionId {
  return (SECTIONS as readonly string[]).includes(id)
}

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case 'home':         return <Introduction />
    case 'experience':   return <Experience />
    case 'projects':     return <ProjectsSection />
    case 'oss':          return <OpenSource />
    default: return null
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = scrollRef.current
    if (!wrapper) return
    const content = wrapper.firstElementChild as HTMLElement | null
    if (!content) return

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [activeSection])

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (isSection(hash)) {
        setActiveSection(hash)
        sessionStorage.setItem('current-section', hash)
      } else {
        const saved = sessionStorage.getItem('current-section')
        if (saved && isSection(saved)) {
          setActiveSection(saved)
          history.replaceState(null, '', `/#${saved}`)
        } else {
          setActiveSection('home')
        }
      }
    }

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  useEffect(() => {
    sessionStorage.setItem('current-section', activeSection)
  }, [activeSection])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        ref={scrollRef}
        className="absolute inset-0 h-full overflow-y-auto pb-32"
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
