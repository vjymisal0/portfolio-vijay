'use client'

'use client'

import Skills from '@/components/skills'
import Projects from '@/components/projects'
import Education from '@/components/education'
import { useSmoothScroll } from '@/lib/use-smooth-scroll'

export default function Work() {
  const { wrapperRef, contentRef } = useSmoothScroll()

  return (
    <section className="relative h-full bg-gradient-to-b from-background to-secondary/10">
      <div ref={wrapperRef} className="scroll-reliable h-full py-8 pb-28 lg:pb-10">
        <div ref={contentRef} className="container mx-auto px-4 sm:px-6 space-y-16">
          <Skills />
          <Projects />
          <Education />
        </div>
      </div>
      {/* "more content" fade hint at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
