'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target &&
        target.classList &&
        (target.classList.contains('section-scroll') || target.classList.contains('scroll-reliable') || target.tagName === 'MAIN')
      ) {
        setIsVisible(target.scrollTop > 300)
        setScrollContainer(target)
      }
    }

    // Use capture phase to catch scroll events from any nested container
    window.addEventListener('scroll', handleScroll, true)
    
    // Also reset visibility on hash change (when switching sections)
    const handleHashChange = () => setIsVisible(false)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const scrollToTop = () => {
    if (scrollContainer) {
      // Smooth scroll using native API
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-[100] p-3 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-primary hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-1 border border-primary-foreground/10 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
