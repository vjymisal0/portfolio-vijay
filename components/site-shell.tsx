'use client'

import type { ReactNode } from 'react'
import StickyNavbar from '@/components/sticky-navbar'
import ScrollToTop from '@/components/scroll-to-top'
import CommandBar from '@/components/command-bar'
import VisitorCount from '@/components/visitor-count'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <StickyNavbar />
      <main className="h-full relative pb-16 lg:pb-12">
        {children}
        <ScrollToTop />
      </main>
      <CommandBar />
      <VisitorCount />
    </div>
  )
}
