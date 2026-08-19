'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'oss', label: 'Open Source' },
  { id: 'blog', label: 'Thoughts' },
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
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-background/80 backdrop-blur-xl border border-border rounded-full shadow-sm pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activeId === item.id

          return (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="relative px-3 sm:px-4 py-1.5 text-[13px] font-medium transition-colors hover:text-foreground outline-none text-muted-foreground z-10"
            >
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-foreground/10"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                />
              )}
            </a>
          )
        })}

        <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l border-border flex items-center">
          <a
            href="https://github.com/vjymisal0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
            aria-label="GitHub"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}
