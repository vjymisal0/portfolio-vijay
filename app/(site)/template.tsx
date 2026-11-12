'use client'

import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import SiteFooter from '@/components/site-footer'
import { sectionForPath } from '@/lib/sections'

// The first page of a visit renders visible straight from the server HTML;
// only later in-app navigations fade in. Animating the first paint would hide
// the content until hydration finishes.
let isFirstPage = true

export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const section = sectionForPath(usePathname())
  const reduceMotion = useReducedMotion()
  const animate = !isFirstPage && !reduceMotion

  useEffect(() => {
    isFirstPage = false
  }, [])

  return (
    <motion.div
      role="region"
      aria-label={`${section.id} content`}
      tabIndex={0}
      className="absolute inset-0 h-full overflow-y-auto"
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="pt-24 lg:pt-32">{children}</div>
      <SiteFooter />
    </motion.div>
  )
}
