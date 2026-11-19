import type { MetadataRoute } from 'next'
import { packagesSnapshotDate } from '@/lib/data'
import { sections } from '@/lib/sections'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vijaymisal.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  // The stats snapshot is refreshed daily, so its date is the last real content change.
  const lastModified = new Date(packagesSnapshotDate)
  return sections.map((s) => ({
    url: s.href === '/' ? siteUrl : `${siteUrl}${s.href}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: s.href === '/' ? 1 : 0.8,
  }))
}
