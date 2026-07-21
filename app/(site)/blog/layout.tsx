import { Instrument_Serif, Newsreader } from 'next/font/google'

// Field Notes speaks in a different voice than the portfolio chrome: prose,
// not résumé. These serif faces are scoped to /blog only — the rest of the
// site stays in Poppins. Instrument Serif (elegant, high-contrast) carries the
// display; Newsreader is tuned for comfortable long-form reading.
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${displaySerif.variable} ${newsreader.variable} h-full`}>
      {children}
    </div>
  )
}
