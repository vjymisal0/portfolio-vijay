'use client'

import type { ReactNode } from 'react'
import StickyNavbar from '@/components/sticky-navbar'
import ThemeToggle from '@/components/theme-toggle'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-background text-foreground">
      <StickyNavbar />
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <main className="flex-1 overflow-hidden relative pb-16 lg:pb-0">
        {children}
      </main>
    </div>
  )
}
