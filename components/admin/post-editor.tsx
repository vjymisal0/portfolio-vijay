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
  const [preview, setPreview] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <form action={formAction} className="space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? false}
              className="h-4 w-4 accent-primary"
            />
            Published
          </label>
          <Button type="submit" disabled={pending}>
            {pending ? 'Saving…' : post ? 'Save changes' : 'Create post'}
          </Button>
        </div>
      </div>

      {state.error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={post?.title ?? ''} required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={post?.slug ?? ''}
            placeholder="auto-generated from title if blank"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            defaultValue={post?.type ?? 'Post'}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="Post">Post</option>
            <option value="Thought">Thought</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            defaultValue={post?.date ?? today}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            name="tags"
            defaultValue={post?.tags.join(', ') ?? ''}
            placeholder="learning, software-design"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={post?.excerpt ?? ''}
            rows={2}
            placeholder="Short summary shown on the writings cards."
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Content (Markdown)</Label>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {preview ? (
              <>
                <Pencil className="h-3 w-3" /> Write
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" /> Preview
              </>
            )}
          </button>
        </div>

        {/* content is always submitted via the hidden-synced textarea */}
        {preview ? (
          <div className="min-h-[24rem] rounded-md border border-border bg-background px-4 py-3 prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || '_Nothing to preview yet._'}
            </ReactMarkdown>
          </div>
        ) : (
          <Textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={18}
            className="font-mono text-sm"
            placeholder="Write your post in Markdown…"
          />
        )}
        {/* When previewing, the textarea above is unmounted — keep the value in the form. */}
        {preview && <input type="hidden" name="content" value={content} />}
      </div>
    </form>
  )
}
