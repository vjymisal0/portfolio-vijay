import { NextResponse } from 'next/server'

// Backed by Abacus (free, keyless counter service). /hit creates the key on
// first use and increments; /get only reads.
const COUNTER = 'https://abacus.jasoncameron.dev'
const NAMESPACE = 'vijaymisal-portfolio'
const KEY = 'unique-visitors'

export const dynamic = 'force-dynamic'

async function read() {
  const res = await fetch(`${COUNTER}/get/${NAMESPACE}/${KEY}`, { cache: 'no-store' })
  if (res.status === 404) return 0
  if (!res.ok) throw new Error(`counter responded ${res.status}`)
  return ((await res.json()) as { value: number }).value
}

export async function GET() {
  try {
    return NextResponse.json({ count: await read() })
  } catch {
    return NextResponse.json({ count: null }, { status: 502 })
  }
}

export async function POST() {
  // Local dev only reads, so testing doesn't inflate the real count.
  if (process.env.NODE_ENV !== 'production') return GET()
  try {
    const res = await fetch(`${COUNTER}/hit/${NAMESPACE}/${KEY}`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`counter responded ${res.status}`)
    const { value } = (await res.json()) as { value: number }
    return NextResponse.json({ count: value, counted: true })
  } catch {
    return NextResponse.json({ count: null }, { status: 502 })
  }
}
