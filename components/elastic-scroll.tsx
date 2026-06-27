'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

interface Props {
  children: ReactNode
  /** Classes for the scroll container (height, padding, bg, etc.) */
  className?: string
  /** Classes for the inner, transformed content wrapper */
  innerClassName?: string
}

/**
 * A natively-scrolling container with a WhatsApp-style rubber-band overscroll:
 * pulling past the top or bottom stretches the content with diminishing
 * returns, and on release it springs back to where it was.
 *
 * The content is translated (not the scroller) so the scrollbar stays put and
 * normal scrolling is never touched — we only intercept the gesture once the
 * user is genuinely pulling past an edge.
 */
// Turn a raw pull distance (px) into a damped, rubbery offset.
const damp = (raw: number) => Math.sign(raw) * Math.pow(Math.abs(raw), 0.82) * 0.5

export default function ElasticScroll({ children, className = '', innerClassName = '' }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const startY = useRef(0)
  const pulling = useRef(false)
  const tracking = useRef(false)
  // Wheel/trackpad state.
  const wheelPull = useRef(0)
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    const atTop = () => el.scrollTop <= 0
    const atBottom = () => Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight

    const springBack = () => animate(y, 0, { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 })

    // ── Touch (mobile) ──
    const onStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY
      tracking.current = true
      pulling.current = false
    }

    const onMove = (e: TouchEvent) => {
      if (!tracking.current) return
      const delta = e.touches[0].clientY - startY.current

      if ((atTop() && delta > 0) || (atBottom() && delta < 0)) {
        pulling.current = true
        y.set(damp(delta))
        e.preventDefault()
      } else if (pulling.current) {
        // Crossed back over the edge mid-gesture — snap content home.
        pulling.current = false
        y.set(0)
      }
    }

    const onEnd = () => {
      tracking.current = false
      if (pulling.current) {
        pulling.current = false
        springBack()
      }
    }

    // ── Wheel / trackpad (desktop) ──
    const onWheel = (e: WheelEvent) => {
      const pastTop = atTop() && e.deltaY < 0
      const pastBottom = atBottom() && e.deltaY > 0
      if (!pastTop && !pastBottom) {
        // Genuine scroll inside the content — release any held stretch.
        if (wheelPull.current !== 0) {
          wheelPull.current = 0
          springBack()
        }
        return
      }
      e.preventDefault()
      // Accumulate the over-scroll, capped so it can't run away.
      wheelPull.current = Math.max(-160, Math.min(160, wheelPull.current - e.deltaY))
      y.set(damp(wheelPull.current))
      if (wheelTimer.current) clearTimeout(wheelTimer.current)
      wheelTimer.current = setTimeout(() => {
        wheelPull.current = 0
        springBack()
      }, 130)
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: true })
    el.addEventListener('touchcancel', onEnd, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
      el.removeEventListener('wheel', onWheel)
      if (wheelTimer.current) clearTimeout(wheelTimer.current)
    }
  }, [y])

  return (
    <div ref={scroller} className={`section-scroll ${className}`}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  )
}
