'use client'

import type { ReactNode, RefObject } from 'react'
import { useSmoothScroll } from '@/lib/use-smooth-scroll'

interface Props {
  as?: 'div' | 'section'
  className?: string
  contentClassName?: string
  children: ReactNode
}

// Wraps a server-rendered page (blog list, blog post) in a scoped Lenis
// instance — same treatment as the client sections, packaged as a client
// boundary so the pages above it can stay server components.
export default function SmoothScrollSection({ as = 'div', className = '', contentClassName = '', children }: Props) {
  const { wrapperRef, contentRef } = useSmoothScroll<HTMLElement>()
  const inner = (
    <div ref={contentRef} className={contentClassName}>
      {children}
    </div>
  )

  if (as === 'section') {
    return (
      <section ref={wrapperRef} className={className}>
        {inner}
      </section>
    )
  }

  return (
    <div ref={wrapperRef as RefObject<HTMLDivElement | null>} className={className}>
      {inner}
    </div>
  )
}
