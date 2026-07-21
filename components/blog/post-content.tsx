import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Post } from '@/lib/posts'

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PostContent({ post }: { post: Post }) {
  return (
    <article className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        {/* Kicker — the ledger voice: when, how long, what kind */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-ink">{formatDate(post.date)}</span>
          <span aria-hidden className="text-border">/</span>
          <span>{post.minutes} min read</span>
          <span aria-hidden className="text-border">/</span>
          <span>{post.type}</span>
        </div>

        <h1 className="mt-5 font-display text-[2.75rem] font-normal leading-[1.02] tracking-tight text-foreground sm:text-[3.5rem]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-6 font-reading text-xl italic leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        className="
          post-prose mt-10 font-reading text-[1.125rem] leading-[1.8]
          prose prose-invert max-w-none
          prose-p:font-reading prose-p:text-foreground/90
          prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mt-10
          prose-strong:text-foreground prose-strong:font-semibold
          prose-a:font-medium prose-a:text-ink prose-a:underline prose-a:decoration-ink/40 prose-a:underline-offset-[3px] hover:prose-a:decoration-ink
          prose-code:font-mono prose-code:text-[0.85em] prose-code:text-ink prose-code:before:content-[''] prose-code:after:content-['']
          prose-blockquote:border-l-2 prose-blockquote:border-ink/50 prose-blockquote:pl-5 prose-blockquote:font-reading prose-blockquote:not-italic prose-blockquote:text-muted-foreground
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.markdown}</ReactMarkdown>
      </div>

      {/* Colophon */}
      <footer className="mt-16 flex items-center justify-between border-t border-border pt-6">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-ink transition-transform group-hover:-translate-x-0.5" />
          All notes
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60">
          Vijay Misal
        </span>
      </footer>
    </article>
  )
}
