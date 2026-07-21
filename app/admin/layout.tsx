import type { Metadata } from 'next'
import { Fraunces, Newsreader } from 'next/font/google'

// Same faces as /blog, so the editor's live preview matches the published post.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-reading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // The global `body { overflow: hidden }` (needed for the portfolio's fixed
    // shell) means admin pages must own their own scroll viewport.
    <div
      className={`${fraunces.variable} ${newsreader.variable} h-screen overflow-y-auto bg-background text-foreground`}
    >
      {children}
    </div>
  )
}
