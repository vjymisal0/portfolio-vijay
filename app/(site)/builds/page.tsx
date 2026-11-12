import type { Metadata } from 'next'
import BuildSystems from '@/components/build-systems'
import { packages } from '@/lib/data'

const description =
  `Things Vijay Misal has built: a self-running AI publishing system, production apps, and ${packages.length} npm packages. Each one covers the problem, the key decision, and the result.`

export const metadata: Metadata = {
  title: 'Build Systems',
  description,
  alternates: { canonical: '/builds' },
  openGraph: { title: 'Build Systems | Vijay Misal', description, url: '/builds' },
}

export default function BuildsPage() {
  return <BuildSystems />
}
