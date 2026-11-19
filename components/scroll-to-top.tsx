'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null)
  const pathname = usePathname()

  // Each page has its own scroll container, so a navigation starts back at the top.
  useEffect(() => {
    setIsVisible(false)
    setScrollContainer(null)
  }, [pathname])

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target
      if (
        target instanceof HTMLElement &&
        target.scrollHeight > target.clientHeight
      ) {
        setIsVisible(target.scrollTop > 300)
        setScrollContainer(target)
      }
    }

    // Use capture phase to catch scroll events from any nested container
    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
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
