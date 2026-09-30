'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

const VISITED_KEY = 'vm-visited'

// Unique-visitor counter: each browser registers once (remembered in
// localStorage), later visits only read the total.
export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let firstVisit = false
    try {
      firstVisit = !localStorage.getItem(VISITED_KEY)
    } catch {}

    fetch('/api/visitors', { method: firstVisit ? 'POST' : 'GET' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (typeof data?.count !== 'number') return
        setCount(data.count)
        if (firstVisit && data.counted) {
          try { localStorage.setItem(VISITED_KEY, '1') } catch {}
        }
      })
      .catch(() => {})
  }, [])

  if (count === null) return null

  return (
    <p className="pointer-events-none fixed bottom-2 left-1/2 z-40 -translate-x-1/2 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/70">
      <Eye className="h-3 w-3" aria-hidden="true" />
      <span>{count.toLocaleString()} unique visitors</span>
    </p>
  )
}
