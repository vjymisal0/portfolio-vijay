'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'courses', label: 'Courses' },
  { id: 'contact', label: 'Contact' },
]

interface Props {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function StickyNavbar({ activeSection, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (id: string) => {
    onNavigate(id)
    setMobileOpen(false)
  }

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
              onClick={() => handleNav(item.id)}
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
        </nav>
      </motion.aside>

      {/* ── Mobile hamburger button ── */}
      <motion.button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-50 lg:hidden w-10 h-10 rounded-xl border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground"
        aria-label="Open menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden bg-background/98 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
              Portfolio
            </p>

            <nav className="flex flex-col items-center gap-1 w-full px-8">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full max-w-xs text-center py-3 rounded-xl text-lg font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.18 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
