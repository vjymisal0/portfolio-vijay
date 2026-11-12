'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { sections } from '@/lib/sections'

// Sections used to be hash tabs on the home page (`/#builds`). Links shared
// before they became real routes still land on the right page.
export default function LegacyHashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const redirect = () => {
      const id = window.location.hash.replace('#', '')
      const target = sections.find((s) => s.id === id && s.href !== '/')
      if (target) router.replace(target.href)
    }

    redirect()
    window.addEventListener('hashchange', redirect)
    return () => window.removeEventListener('hashchange', redirect)
  }, [router])

  return null
}
