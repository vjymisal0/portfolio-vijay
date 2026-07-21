import { Fraunces, Newsreader } from 'next/font/google'

// The writings section speaks in a different voice than the portfolio chrome:
// prose, not résumé. These serif faces are scoped to /blog only — the rest of
// the site stays in Poppins.
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${fraunces.variable} ${newsreader.variable} h-full`}>
      {children}
    </div>
  )
}
