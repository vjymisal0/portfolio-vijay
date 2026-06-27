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

// Turn a raw pull distance (px) into a damped, rubbery offset.
const damp = (raw: number) => Math.sign(raw) * Math.pow(Math.abs(raw), 0.82) * 0.5

/**
 * A natively-scrolling container with a WhatsApp-style rubber-band overscroll:
 * pulling past the top or bottom stretches the content with diminishing
 * returns, and on release it springs back to where it was.
 *
 * The content is translated (not the scroller) so the scrollbar stays put and
 * normal scrolling is never touched — we only intercept once the user is
 * genuinely past an edge. Crucially the stretch is measured *incrementally from
 * the edge*, so a tall, scrollable section feels exactly like a short one: you
 * scroll to the end and the rubber-band starts from zero, instead of inheriting
 * all the distance you already scrolled.
 */
export default function ElasticScroll({ children, className = '', innerClassName = '' }: Props) {
  const scroller = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  // Touch state.
  const lastY = useRef(0)
  const pull = useRef(0) // signed overscroll accumulated since the edge
  const pulling = useRef(false)
  const tracking = useRef(false)
  // Wheel/trackpad state.
  const wheelPull = useRef(0)
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    // A small tolerance is essential on the bottom edge: sub-pixel/fractional
    // heights (from the gradient bg, padding, zoom) mean scrollTop+clientHeight
    // can settle ~1px short of scrollHeight, so an exact compare would make the
    // bottom rubber-band never trigger even though the top one does.
    const atTop = () => el.scrollTop <= 0
    const atBottom = () => el.scrollHeight - (el.scrollTop + el.clientHeight) <= 2
    const springBack = () => animate(y, 0, { type: 'spring', stiffness: 380, damping: 30, mass: 0.6 })

    // ── Touch (mobile) ──
    const onStart = (e: TouchEvent) => {
      lastY.current = e.touches[0].clientY
      pull.current = 0
      pulling.current = false
      tracking.current = true
    }

    const onMove = (e: TouchEvent) => {
      if (!tracking.current) return
      const cy = e.touches[0].clientY
      const dy = cy - lastY.current // incremental movement this frame
      lastY.current = cy

      if (pulling.current) {
        const next = pull.current + dy
        // Returned past the edge — hand control back to native scrolling.
        if ((pull.current > 0 && next <= 0) || (pull.current < 0 && next >= 0)) {
          pull.current = 0
          pulling.current = false
          y.set(0)
          return
        }
        pull.current = next
        y.set(damp(pull.current))
        e.preventDefault()
        return
      }

      // Not stretching yet — only begin when sitting at an edge and pulling out.
      if (atTop() && dy > 0) {
        pulling.current = true
        pull.current = dy
        y.set(damp(pull.current))
        e.preventDefault()
      } else if (atBottom() && dy < 0) {
        pulling.current = true
        pull.current = dy
        y.set(damp(pull.current))
        e.preventDefault()
      }
    }

    const onEnd = () => {
      tracking.current = false
      if (pulling.current) {
        pulling.current = false
        pull.current = 0
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
