'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
]

interface Props {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function StickyNavbar({ activeSection, onNavigate }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current
      const btn = activeRef.current
      const scrollLeft = btn.offsetLeft - nav.offsetWidth / 2 + btn.offsetWidth / 2
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeSection])

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <motion.aside
        className="hidden lg:flex flex-shrink-0 w-40 h-screen border-r border-border bg-background/95 backdrop-blur-sm flex-col justify-center px-3 py-8"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="mb-6 px-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Portfolio
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
              whileHover={{ x: activeSection === item.id ? 0 : 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {item.label}
            </motion.button>
          ))}
          <Link
            href="/blog"
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            Writings
          </Link>
        </nav>
      </motion.aside>

      {/* ── Mobile liquid glass floating bottom nav ── */}
      <motion.div
        className="lg:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center px-4"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        <nav
          ref={navRef}
          className="nav-scroll flex items-center gap-0.5 overflow-x-auto max-w-full rounded-full px-2 py-1.5"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(16px) saturate(160%)',
            WebkitBackdropFilter: 'blur(16px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                ref={isActive ? activeRef : null}
                onClick={() => onNavigate(item.id)}
                className="relative flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium cursor-pointer whitespace-nowrap"
                style={{
                  color: isActive ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.42)',
                  transition: 'color 0.2s ease',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="liquid-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(140deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.13) 100%)',
                      border: '1px solid rgba(255,255,255,0.34)',
                      boxShadow:
                        '0 2px 12px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.40), inset 0 -1px 0 rgba(0,0,0,0.08)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
          <Link
            href="/blog"
            className="relative flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.42)', transition: 'color 0.2s ease' }}
          >
            Writings
          </Link>
        </nav>
      </motion.div>
    </>
  )
}
