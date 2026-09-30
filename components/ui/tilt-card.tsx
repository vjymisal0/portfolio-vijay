'use client'

import type { ComponentPropsWithoutRef, MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// Card that leans toward the cursor. The tilt is a spring on normalized
// pointer position, so it eases back to flat when the pointer leaves.
export function TiltCard({
  max = 6,
  className = '',
  children,
  ...rest
}: { max?: number } & Omit<ComponentPropsWithoutRef<typeof motion.div>, 'onMouseMove' | 'onMouseLeave'>) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      {...rest}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
