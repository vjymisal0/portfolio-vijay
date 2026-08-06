'use client'

import { createContext, useContext, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'

// macOS-dock magnification: icons read the shared cursor-x motion value and
// resize based on distance from it. Only reacts to mouse hover (mouseX stays
// at Infinity, i.e. base size, on touch) — that matches real dock behavior,
// where touch just taps.
const DockContext = createContext<MotionValue<number> | null>(null)

export function Dock({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  const mouseX = useMotionValue(Infinity)
  return (
    <DockContext.Provider value={mouseX}>
      <motion.div
        onMouseMove={(e: MouseEvent) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={style}
        className={`flex items-center ${className}`}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  )
}

export function DockIcon({ children, className = '' }: { children: ReactNode; className?: string }) {
  const mouseX = useContext(DockContext)
  if (!mouseX) throw new Error('DockIcon must be used within a Dock')
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeSync = useTransform(distance, [-100, 0, 100], [38, 54, 38])
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 })

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={`relative flex flex-shrink-0 items-center justify-center rounded-full ${className}`}
    >
      {children}
    </motion.div>
  )
}
