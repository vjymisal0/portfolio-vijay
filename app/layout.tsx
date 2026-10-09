import './globals.css'
import { Geist, Geist_Mono, Outfit, Inter, Space_Grotesk } from 'next/font/google'
import { Metadata } from 'next'
import { contributions, packages } from '@/lib/data'

// Rounded down to the nearest 10 so the description doesn't churn daily (87 → "80+").
const prCount = `${Math.floor(contributions.length / 10) * 10}+`
const packageCount = packages.length

// Commit this build came from (Netlify sets COMMIT_REF), exposed as
// <meta name="build"> so you can check what prod is running with curl.
const buildRef = (process.env.COMMIT_REF ?? process.env.VERCEL_GIT_COMMIT_SHA ?? 'local').slice(0, 7)

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

const mono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vijaymisal.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Vijay Misal — Software Engineer',
    template: '%s | Vijay Misal',
  },
  description:
    `Vijay Misal is a software engineer (SDE 1 at Loopr AI) building full-stack TypeScript, React, and NestJS systems, with ${prCount} merged open-source pull requests to projects like Vite, axios, and Apache Superset and ${packageCount} published npm packages.`,
  keywords: [
    'Vijay Misal',
    'Software Engineer',
    'Full-Stack Developer',
    'React',
    'Node.js',
    'NestJS',
    'TypeScript',
    'Open Source Contributor',
    'npm packages',
    'Python',
    'Go',
    'Rust',
    'n8n',
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
      `Software engineer at Loopr AI. ${prCount} merged open-source PRs (Vite, axios, Apache Superset) and ${packageCount} npm packages.`,
    siteName: 'Vijay Misal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vijay Misal — Software Engineer',
    description:
      `Software engineer at Loopr AI. ${prCount} merged open-source PRs and ${packageCount} npm packages.`,
  },
  other: {
    'theme-color': '#faf8f5',
    build: buildRef,
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
    "worksFor": { "@type": "Organization", "name": "Loopr AI" },
    "address": { "@type": "PostalAddress", "addressLocality": "Pune", "addressCountry": "IN" },
    "alumniOf": [
      { "@type": "CollegeOrUniversity", "name": "Vishwakarma Institute of Information Technology" },
      { "@type": "CollegeOrUniversity", "name": "Government Polytechnic, Solapur" }
    ],
    "description": "Software engineer building full-stack TypeScript systems and automated workflows, and an active open-source contributor.",
    "sameAs": [
      "https://github.com/vjymisal0",
      "https://www.linkedin.com/in/vijaymisal",
      "https://www.npmjs.com/~vjymisal0"
    ],
    "knowsAbout": [
      "React",
      "Node.js",
      "NestJS",
      "TypeScript",
      "Python",
      "Go",
      "Rust",
      "Full-Stack Development",
      "Open Source Software",
      "Workflow Automation"
    ]
  }

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${geist.variable} ${grotesk.variable} ${mono.variable}`}>
      <head>
      </head>
      <body className={`${mono.className} bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
      </body>
    </html>
  )
}
