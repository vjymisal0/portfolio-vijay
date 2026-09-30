'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Pause, Play, SkipBack, SkipForward } from 'lucide-react'

export type Step = { label: string; detail: string }

const STEP_MS = 2200

// Plays through a pipeline one stage at a time: the active node lights up, a
// progress bar fills, and the stage's explanation swaps in below.
export function StepPlayer({ steps, name }: { steps: Step[]; name: string }) {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      if (current >= steps.length - 1) setPlaying(false)
      else setCurrent((c) => c + 1)
    }, STEP_MS)
    return () => clearTimeout(t)
  }, [playing, current, steps.length])

  const toggle = () => {
    if (!playing && current >= steps.length - 1) setCurrent(0)
    setPlaying((p) => !p)
  }
  const jump = (i: number) => { setPlaying(false); setCurrent(Math.max(0, Math.min(steps.length - 1, i))) }

  return (
    <div>
      <ol className="flex flex-wrap items-center gap-1.5" aria-label={`${name} architecture`}>
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => jump(i)}
              aria-current={i === current ? 'step' : undefined}
              className={`rounded-md px-2 py-1 text-[10px] transition-all duration-300 ${
                i === current
                  ? 'bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.45)]'
                  : i < current
                    ? 'bg-primary/15 text-primary'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {step.label}
            </button>
            {i < steps.length - 1 && <ArrowRight className={`h-3 w-3 ${i < current ? 'text-primary' : 'text-muted-foreground/50'}`} aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-lg border border-border bg-background/60 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-muted-foreground">
            step {current + 1}/{steps.length}
          </span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => jump(current - 1)} disabled={current === 0} aria-label="Previous step" className="rounded p-1 text-muted-foreground hover:text-primary disabled:opacity-30">
              <SkipBack className="h-3 w-3" />
            </button>
            <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="rounded-full bg-primary/10 p-1.5 text-primary hover:bg-primary/20">
              {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>
            <button type="button" onClick={() => jump(current + 1)} disabled={current === steps.length - 1} aria-label="Next step" className="rounded p-1 text-muted-foreground hover:text-primary disabled:opacity-30">
              <SkipForward className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="mb-2 h-0.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
          />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs leading-relaxed text-muted-foreground"
            aria-live="polite"
          >
            <span className="font-medium text-foreground">{steps[current].label}:</span> {steps[current].detail}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
