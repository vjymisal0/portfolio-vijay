'use client'

import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// A section whose header toggles its body open and closed, collapsed by default.
export default function CollapsibleSection({
  header,
  summary,
  children,
  defaultOpen = false,
}: {
  header: ReactNode
  summary?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const reduceMotion = useReducedMotion()
  const bodyId = useId()

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="group flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/60"
      >
        <div className="min-w-0">
          {header}
          {summary && <div className="mt-1 text-sm font-body text-muted-foreground">{summary}</div>}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {open ? 'Hide' : 'Show'}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={bodyId}
            key="body"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
