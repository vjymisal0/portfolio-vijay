'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Introduction from '@/components/introduction'
import Work from '@/components/work'
import Experience from '@/components/experience'

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

    // Arriving from /blog, the navbar hands off the target section explicitly
    // (a client navigation doesn't reliably apply the hash before mount).
    const handoff = sessionStorage.getItem('goto-section')
    if (handoff && isSection(handoff)) {
      sessionStorage.removeItem('goto-section')
      setActiveSection(handoff)
      if (window.location.hash !== `#${handoff}`) {
        history.replaceState(null, '', `/#${handoff}`)
      }
      // Nudge the persistent navbar (it only re-reads on 'hashchange') so its
      // highlight matches the section we just selected.
      window.dispatchEvent(new Event('hashchange'))
    } else {
      applyHash()
    }

    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  // Dev-only: Next disables link prefetch in development, so the first click on
  // Field Notes pays for compiling the /blog route on demand (that first-nav
  // lag). Warm it in the background once the page is idle so the click is
  // instant. No-op in production, where /blog is static and already prefetched.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    const warm = () => { void fetch('/blog').catch(() => {}) }
    const hasRic = typeof window.requestIdleCallback === 'function'
    const id = hasRic ? window.requestIdleCallback(warm) : window.setTimeout(warm, 1500)
    return () => {
      if (hasRic) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [])

  return (
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
  )
}
