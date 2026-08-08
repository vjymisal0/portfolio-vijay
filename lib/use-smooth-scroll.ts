'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Scopes a Lenis smooth-scroll instance to one scrollable panel instead of
 * the page body — each section here scrolls independently inside its own
 * fixed-height container, so a single global Lenis instance would fight the
 * hidden ones. `wrapperRef` goes on the existing overflow container,
 * `contentRef` on its direct child; touch input is left native (it already
 * feels smooth on mobile, and ElasticScroll's rubber-band edges rely on
 * untouched touch events elsewhere in the app).
 */
export function useSmoothScroll<T extends HTMLElement = HTMLDivElement>() {
  const wrapperRef = useRef<T>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      syncTouch: false,
      autoRaf: true,
    })

    return () => lenis.destroy()
  }, [])

  return { wrapperRef, contentRef }
}
