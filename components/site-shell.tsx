'use client'

import type { ReactNode } from 'react'
import StickyNavbar from '@/components/sticky-navbar'
import ScrollToTop from '@/components/scroll-to-top'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <StickyNavbar />
      <main className="flex-1 relative pb-16 lg:pb-0">
        {children}
        <ScrollToTop />
      </main>
    </div>
  )
}
