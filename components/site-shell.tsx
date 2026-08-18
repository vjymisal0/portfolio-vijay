'use client'

import type { ReactNode } from 'react'
import StickyNavbar from '@/components/sticky-navbar'
import ScrollToTop from '@/components/scroll-to-top'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-background text-foreground">
      <StickyNavbar />
      <main className="flex-1 overflow-hidden relative pb-16 lg:pb-0">
        {children}
        <ScrollToTop />
      </main>
    </div>
  )
}
