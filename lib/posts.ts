import { supabasePublic, supabaseAdmin } from '@/lib/supabase'

export type PostType = 'Post' | 'Thought'

export interface PostSummary {
  id: string
  slug: string
  title: string
  date: string
  tags: string[]
  type: PostType
  excerpt: string
  cover: string | null
}

export interface Post extends PostSummary {
  markdown: string
}

/** Full row as stored in Supabase (admin-facing). */
export interface PostRecord extends Post {
  published: boolean
  createdAt: string
  updatedAt: string
}

// Row shape returned by the `posts` table.
interface Row {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  type: PostType
  tags: string[] | null
  published: boolean
  date: string
  created_at: string
  updated_at: string
}

function toSummary(row: Row): PostSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    tags: row.tags ?? [],
    type: row.type,
    excerpt: row.excerpt ?? '',
    cover: null,
  }
}

function toPost(row: Row): Post {
  return { ...toSummary(row), markdown: row.content ?? '' }
}

function toRecord(row: Row): PostRecord {
  return {
    ...toPost(row),
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

const SELECT =
  'id, slug, title, excerpt, content, type, tags, published, date, created_at, updated_at'

// ─── Public reads (RLS-limited to published rows) ───────────────────────────

export async function getAllPosts(): Promise<PostSummary[]> {
  const { data, error } = await supabasePublic
    .from('posts')
    .select(SELECT)
    .eq('published', true)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAllPosts failed:', error.message)
    return []
  }
  return (data as Row[]).map(toSummary)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabasePublic
    .from('posts')
    .select(SELECT)
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('getPostBySlug failed:', error.message)
    return null
  }
  return data ? toPost(data as Row) : null
}

// ─── Admin reads/writes (service role, gated by admin session) ──────────────

export interface PostInput {
  slug: string
  title: string
  excerpt: string
  content: string
  type: PostType
  tags: string[]
  published: boolean
  date: string
}

export async function getAllPostsAdmin(): Promise<PostRecord[]> {
  const { data, error } = await supabaseAdmin()
    .from('posts')
    .select(SELECT)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data as Row[]).map(toRecord)
}

export async function getPostByIdAdmin(id: string): Promise<PostRecord | null> {
  const { data, error } = await supabaseAdmin()
    .from('posts')
    .select(SELECT)
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data ? toRecord(data as Row) : null
}

export async function createPost(input: PostInput): Promise<PostRecord> {
  const { data, error } = await supabaseAdmin()
    .from('posts')
    .insert(input)
    .select(SELECT)
    .single()

  if (error) throw new Error(error.message)
  return toRecord(data as Row)
}

export async function updatePost(
  id: string,
  input: PostInput
): Promise<PostRecord> {
  const { data, error } = await supabaseAdmin()
    .from('posts')
    .update(input)
    .eq('id', id)
    .select(SELECT)
    .single()

  if (error) throw new Error(error.message)
  return toRecord(data as Row)
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabaseAdmin().from('posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
