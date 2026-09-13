'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

const navItems = [
  { id: 'home', label: 'Home', short: 'Home' },
  { id: 'experience', label: 'Experience', short: 'Exp' },
  { id: 'builds', label: 'Build Systems', short: 'Builds' },
  { id: 'oss', label: 'Open Source', short: 'OSS' },
]

export default function StickyNavbar() {
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const applyHash = () => setHash(window.location.hash.replace('#', '') || 'home')
    const setHash = (hash: string) => setActiveId(hash)

    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  return (
    <header className="fixed top-3 sm:top-6 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav aria-label="Main navigation" className="flex items-center gap-0.5 sm:gap-1 px-2 py-2 max-w-full overflow-x-auto hide-scrollbar bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-[0_12px_30px_rgba(15,23,42,0.08)] pointer-events-auto">
        <Link href="/#home" className="hidden sm:flex items-center gap-2 px-3 mr-1 text-xs font-bold tracking-tight text-foreground" aria-label="Vijay Misal home">
          <span className="text-primary">&gt;_</span> VM
        </Link>
        {navItems.map((item) => {
          const isActive = activeId === item.id

          return (
            <a
              key={item.id}
              href={`/#${item.id}`}
              aria-current={isActive ? 'page' : undefined}
              className="relative shrink-0 px-2.5 sm:px-4 py-2 sm:py-1.5 text-[12px] sm:text-[13px] font-medium transition-colors hover:text-primary text-muted-foreground z-10"
            >
              <span className="relative z-10 sm:hidden">{item.short}</span>
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-xl bg-primary/15"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
            </a>
          )
        })}

        <div className="ml-1 sm:ml-4 pl-2 sm:pl-4 border-l border-border flex items-center shrink-0">
          <a
            href="https://github.com/vjymisal0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2 sm:p-1.5"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}
