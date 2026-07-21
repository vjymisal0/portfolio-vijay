'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { savePost, type ActionState } from '@/app/admin/actions'
import type { PostRecord } from '@/lib/posts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Eye, Pencil } from 'lucide-react'

export default function PostEditor({ post }: { post?: PostRecord }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    savePost,
    {}
  )
  const [content, setContent] = useState(post?.markdown ?? '')
  const [published, setPublished] = useState(post?.published ?? false)
  const [tab, setTab] = useState<'write' | 'preview'>('write')
  const today = new Date().toISOString().slice(0, 10)

  const words = content.trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 220))

  return (
    <form action={formAction}>
      {post && <input type="hidden" name="id" value={post.id} />}
      {/* Published state lives in React so the switch is controllable; mirror it
          into a hidden field the server action reads as `on`/absent. */}
      {published && <input type="hidden" name="published" value="on" />}

      {/* ── Sticky action bar ── */}
      <div className="sticky top-0 z-10 -mx-5 mb-8 border-b border-border bg-background/85 px-5 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to all posts</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={published}
              onClick={() => setPublished((p) => !p)}
              className="group inline-flex items-center gap-2 text-sm"
            >
              <span
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  published ? 'bg-emerald-500/80' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                    published ? 'left-4' : 'left-0.5'
                  }`}
                />
              </span>
              <span className={published ? 'text-foreground' : 'text-muted-foreground'}>
                {published ? 'Published' : 'Draft'}
              </span>
            </button>

            <Button type="submit" disabled={pending}>
              {pending ? 'Saving…' : post ? 'Save' : 'Create'}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        {state.error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}

        {/* ── Title ── */}
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={post?.title ?? ''}
            required
            placeholder="Untitled"
            className="h-auto border-0 border-b border-transparent bg-transparent px-0 font-display text-3xl font-normal tracking-tight shadow-none focus-visible:border-border focus-visible:ring-0"
          />
        </div>

        {/* ── Metadata panel ── */}
        <fieldset className="grid gap-x-5 gap-y-4 rounded-xl border border-border/80 bg-card p-5 sm:grid-cols-2">
          <legend className="px-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Details
          </legend>

          <div className="space-y-1.5">
            <Label htmlFor="slug" className="text-xs text-muted-foreground">
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={post?.slug ?? ''}
              placeholder="auto from title"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="type" className="text-xs text-muted-foreground">
              Type
            </Label>
            <select
              id="type"
              name="type"
              defaultValue={post?.type ?? 'Post'}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Post">Post — long-form</option>
              <option value="Thought">Thought — short note</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-xs text-muted-foreground">
              Date
            </Label>
            <Input id="date" name="date" type="date" defaultValue={post?.date ?? today} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tags" className="text-xs text-muted-foreground">
              Tags <span className="text-muted-foreground/60">(comma-separated)</span>
            </Label>
            <Input
              id="tags"
              name="tags"
              defaultValue={post?.tags.join(', ') ?? ''}
              placeholder="learning, software-design"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="excerpt" className="text-xs text-muted-foreground">
              Excerpt <span className="text-muted-foreground/60">— the dek shown on the writings index</span>
            </Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt ?? ''}
              rows={2}
              placeholder="One or two sentences summarising the piece."
            />
          </div>
        </fieldset>

        {/* ── Content editor ── */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-lg border border-border p-0.5">
              <button
                type="button"
                onClick={() => setTab('write')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === 'write'
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Pencil className="h-3 w-3" /> Write
              </button>
              <button
                type="button"
                onClick={() => setTab('preview')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === 'preview'
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Eye className="h-3 w-3" /> Preview
              </button>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              {words} words · {mins} min
            </span>
          </div>

          {/* The textarea stays mounted (hidden when previewing) so its `content`
              form value is always submitted without a duplicate field. */}
          <Textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={22}
            placeholder="Write your post in Markdown…"
            className={`font-mono text-sm leading-relaxed ${tab === 'preview' ? 'hidden' : ''}`}
          />

          {tab === 'preview' && (
            <div className="min-h-[30rem] rounded-lg border border-border bg-card px-6 py-5">
              <div className="prose prose-invert max-w-none font-reading prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-strong:text-foreground prose-a:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '_Nothing to preview yet._'}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
