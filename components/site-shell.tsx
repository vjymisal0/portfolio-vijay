'use client'

import type { ReactNode } from 'react'
import StickyNavbar from '@/components/sticky-navbar'
import ScrollToTop from '@/components/scroll-to-top'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <StickyNavbar />
      <main className="relative pt-24 pb-16 lg:pb-12">
        {children}
        <ScrollToTop />
      </main>
    </div>
  )
}
