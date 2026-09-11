'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Introduction from '@/components/introduction'
import ProjectsSection from '@/components/work'
import Experience from '@/components/experience'
import OpenSource from '@/components/open-source'
import Automation from '@/components/automation'

export default function Home() {
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
  }, [])

  return (
    <motion.div
      ref={scrollRef}
      className="absolute inset-0 h-full overflow-y-auto pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-28 pt-24 lg:pt-32">
        <section id="home"><Introduction /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="oss"><OpenSource /></section>
        <section id="automation"><Automation /></section>
      </div>
    </motion.div>
  )
}
