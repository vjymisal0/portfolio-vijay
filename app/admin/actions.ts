'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  createSessionToken,
  verifySessionToken,
} from '@/lib/auth'
import {
  createPost,
  updatePost,
  deletePost,
  type PostInput,
  type PostType,
} from '@/lib/posts'

async function requireAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!(await verifySessionToken(token))) {
    throw new Error('Not authorized')
  }
}

export interface ActionState {
  error?: string
}

export async function login(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = String(formData.get('username') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!checkCredentials(username, password)) {
    return { error: 'Invalid username or password.' }
  }

  const token = await createSessionToken()
  ;(await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })

  const from = String(formData.get('from') ?? '/admin')
  redirect(from.startsWith('/admin') ? from : '/admin')
}

export async function logout() {
  ;(await cookies()).delete(ADMIN_COOKIE)
  redirect('/admin/login')
}

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseForm(formData: FormData): PostInput {
  const title = String(formData.get('title') ?? '').trim()
  const rawSlug = String(formData.get('slug') ?? '').trim()
  const type = (String(formData.get('type') ?? 'Post') as PostType)
  const tags = String(formData.get('tags') ?? '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  const dateRaw = String(formData.get('date') ?? '').trim()

  return {
    title,
    slug: slugify(rawSlug || title),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    content: String(formData.get('content') ?? ''),
    type: type === 'Thought' ? 'Thought' : 'Post',
    tags,
    published: formData.get('published') === 'on',
    date: dateRaw || new Date().toISOString().slice(0, 10),
  }
}

export async function savePost(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin()

  const id = String(formData.get('id') ?? '').trim()
  const input = parseForm(formData)

  if (!input.title) return { error: 'Title is required.' }
  if (!input.slug) return { error: 'A valid slug is required.' }

  try {
    if (id) {
      await updatePost(id, input)
    } else {
      await createPost(input)
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Failed to save post.'
    // Surface the most common failure (duplicate slug) in plain language.
    if (msg.includes('duplicate') || msg.includes('unique')) {
      return { error: `A post with the slug "${input.slug}" already exists.` }
    }
    return { error: msg }
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${input.slug}`)
  revalidatePath('/admin')
  redirect('/admin')
}

export async function removePost(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id') ?? '').trim()
  if (id) {
    await deletePost(id)
    revalidatePath('/blog')
    revalidatePath('/admin')
  }
  redirect('/admin')
}
