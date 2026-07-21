import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Posts are plain Markdown files in content/writings/. Each file's name is its
// slug; frontmatter carries the metadata. To publish: add/commit a .md file.
const CONTENT_DIR = path.join(process.cwd(), 'content', 'writings')

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
  minutes: number
}

export interface Post extends PostSummary {
  markdown: string
}

function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

interface Frontmatter {
  title?: string
  date?: string
  tags?: string[]
  type?: string
  excerpt?: string
  cover?: string
  published?: boolean
}

function readPostFile(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as Frontmatter

  // A post is published unless it explicitly opts out with `published: false`.
  if (fm.published === false) return null

  const markdown = content.trim()

  return {
    id: slug,
    slug,
    title: fm.title ?? slug,
    date: fm.date ? String(fm.date).slice(0, 10) : '',
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    type: fm.type === 'Thought' ? 'Thought' : 'Post',
    excerpt: fm.excerpt ?? '',
    cover: fm.cover ?? null,
    minutes: readingMinutes(markdown),
    markdown,
  }
}

function allSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = allSlugs()
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    // Newest first; fall back to title for undated posts.
    .sort((a, b) =>
      b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
    )

  // Strip the body for list views.
  return posts.map(({ markdown: _markdown, ...summary }) => summary)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return readPostFile(slug)
}
