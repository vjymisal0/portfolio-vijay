'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
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
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId: number
    const raf = (time: number) => {
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
        return
      }

      const saved = sessionStorage.getItem('current-section')
      const next = saved && isSection(saved) ? saved : 'home'
      setActiveSection(next)
      if (!hash && next !== 'home') history.replaceState(null, '', `/#${next}`)
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
        initial={{ opacity: 0, y: 16, filter: 'blur(2px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -16, filter: 'blur(2px)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <div className="pt-24 lg:pt-32">
          <SectionContent id={activeSection} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
