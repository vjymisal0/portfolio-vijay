'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  // Spell-themed labels: casting Lumos brings light, Nox brings back the dark.
  // The label names the spell you're about to cast, not the current state.
  const label = isDark ? 'Lumos' : 'Nox'

  if (!mounted) {
    // Reserve space and avoid a hydration flash before the theme is known.
    return <div className={`h-9 w-[92px] ${className}`} aria-hidden />
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Cast Lumos — turn the lights on' : 'Cast Nox — back into the dark'}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`group flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-md transition-colors duration-200 hover:text-foreground hover:border-primary/40 cursor-pointer ${className}`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            initial={{ y: 10, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="tracking-wide">{label}</span>
    </button>
  )
}
