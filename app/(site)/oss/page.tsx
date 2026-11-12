import type { Metadata } from 'next'
import OpenSource from '@/components/open-source'
import { contributions } from '@/lib/data'

const repoCount = new Set(contributions.map((c) => c.repo)).size
const description =
  `${contributions.length} pull requests by Vijay Misal merged into ${repoCount} open-source repositories, including Vite, axios, and Apache Superset, with notes on what each featured change fixed.`

export const metadata: Metadata = {
  title: 'Open Source',
  description,
  alternates: { canonical: '/oss' },
  openGraph: { title: 'Open Source | Vijay Misal', description, url: '/oss' },
}

export default function OpenSourcePage() {
  return <OpenSource />
}
