import './globals.css'
import { Poppins } from 'next/font/google'
import { Metadata } from 'next'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const siteUrl = 'https://vijaymisal.vercel.app'

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
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Vijay Misal — Software Engineer',
    description:
      'Software engineer building scalable web apps with React, Node.js, and cloud technologies. Explore my experience, skills, and projects.',
    siteName: 'Vijay Misal',
    images: [
      {
        url: '/vjy.png',
        width: 1200,
        height: 630,
        alt: 'Vijay Misal — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vijay Misal — Software Engineer',
    description:
      'Software engineer building scalable web apps with React, Node.js, and cloud technologies.',
    images: ['/vjy.png'],
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
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
