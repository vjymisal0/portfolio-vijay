import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.'
  )
}

/**
 * Public client — uses the publishable/anon key and is bound by RLS, so it can
 * only ever read `published = true` rows. Safe for all public-facing reads.
 */
export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false },
})

/**
 * Admin client — uses the service-role key, bypasses RLS, and can read/write
 * every row. NEVER import this into a Client Component or expose its key to the
 * browser; it is only used inside server actions gated by the admin session.
 */
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY env var (server only).')
  }
  return createClient(url!, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
