import { Instrument_Serif, Newsreader, IBM_Plex_Mono } from 'next/font/google'

// Field Notes speaks in a different voice than the portfolio chrome. Three
// roles, scoped to /blog only:
//   · Instrument Serif — elegant high-contrast display (masthead, titles)
//   · Newsreader       — comfortable long-form reading (prose, deks)
//   · IBM Plex Mono    — the ledger: entry numbers, dates, meta — reads like
//                        the ruled margin of an engineer's notebook.
const displaySerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
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

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-notes',
  display: 'swap',
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`field-notes ${displaySerif.variable} ${newsreader.variable} ${mono.variable} h-full`}
    >
      {children}
    </div>
  )
}
