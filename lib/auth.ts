// Lightweight static-credential auth for the hidden /admin panel.
//
// This is intentionally simple (single hard-coded user, HMAC-signed cookie) —
// it is NOT a multi-user auth system. It exists so only the owner can reach the
// post editor. All it guarantees: the cookie was minted by this server with the
// current secret and hasn't expired. Uses Web Crypto so the same verification
// runs in both the Edge middleware and Node server actions.

export const ADMIN_COOKIE = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

function secretKeyMaterial(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('Missing ADMIN_SESSION_SECRET env var.')
  return new TextEncoder().encode(secret)
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let bin = ''
  for (const b of arr) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    secretKeyMaterial(),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return b64url(sig)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Verify a username/password pair against the configured static credentials. */
export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME ?? ''
  const p = process.env.ADMIN_PASSWORD ?? ''
  // Both comparisons run regardless, to avoid leaking which field was wrong.
  const okUser = timingSafeEqual(username, u)
  const okPass = timingSafeEqual(password, p)
  return okUser && okPass && u.length > 0 && p.length > 0
}

/** Mint a signed session token: `<payloadB64>.<sig>`. */
export async function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const payload = b64url(new TextEncoder().encode(JSON.stringify({ exp })))
  const sig = await hmac(payload)
  return `${payload}.${sig}`
}

/** Validate a session token's signature and expiry. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false

  const expected = await hmac(payload)
  if (!timingSafeEqual(sig, expected)) return false

  try {
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    ) as { exp?: number }
    return typeof decoded.exp === 'number' && decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS
