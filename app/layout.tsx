import './globals.css'
import { Geist, Outfit, Inter, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grotesk',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vijaymisal.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Vijay Misal — Software Engineer',
    template: '%s | Vijay Misal',
  },
  description:
    'Vijay Misal is a software engineer (SDE 1 at Loopr AI) building scalable web apps with React, Node.js, NestJS, and cloud technologies. Explore his experience, skills, and projects.',
  keywords: [
    'Vijay Misal',
    'Software Engineer',
    'Full-Stack Developer',
    'React',
    'Node.js',
    'NestJS',
    'TypeScript',
    'Portfolio',
    'Loopr AI',
  ],
  authors: [{ name: 'Vijay Misal', url: siteUrl }],
  creator: 'Vijay Misal',
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Vijay Misal — Software Engineer',
    description:
      'Software engineer building scalable web apps with React, Node.js, and cloud technologies. Explore my experience, skills, and projects.',
    siteName: 'Vijay Misal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vijay Misal — Software Engineer',
    description:
      'Software engineer building scalable web apps with React, Node.js, and cloud technologies.',
  },
  other: {
    'theme-color': '#000000',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vijay Misal",
    "url": siteUrl,
    "jobTitle": "Software Engineer",
    "description": "I move quickly from rough ideas to working systems, then do the engineering needed to make them reliable.",
    "sameAs": [
      "https://github.com/vjymisal0",
      "https://www.linkedin.com/in/vijaymisal"
    ],
    "knowsAbout": [
      "React",
      "Node.js",
      "NestJS",
      "TypeScript",
      "Full-Stack Development"
    ]
  }

  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} ${geist.variable} ${grotesk.variable}`}>
      <body className={`${geist.className} bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
      </body>
    </html>
  )
}
