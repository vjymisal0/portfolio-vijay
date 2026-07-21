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

function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export default function PostContent({ post }: { post: Post }) {
  const mins = readingTime(post.markdown)

  return (
    <article className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        {/* Kicker — utility voice: when, how long, what kind */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden className="text-border">/</span>
          <span>{mins} min read</span>
          {post.type === 'Thought' && (
            <>
              <span aria-hidden className="text-border">/</span>
              <span>Thought</span>
            </>
          )}
        </div>

        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-5 font-reading text-xl italic leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <hr className="mt-8 border-t border-border" />

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="
          mt-10 font-reading text-[1.075rem] leading-[1.8]
          prose prose-invert max-w-none
          prose-p:font-reading prose-p:text-foreground/90
          prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground
          prose-strong:text-foreground prose-strong:font-semibold
          prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:decoration-muted-foreground/40 prose-a:underline-offset-2 hover:prose-a:decoration-foreground
          prose-code:font-sans prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
          prose-blockquote:border-l-2 prose-blockquote:border-foreground/30 prose-blockquote:font-reading prose-blockquote:italic prose-blockquote:text-muted-foreground
        "
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.markdown}</ReactMarkdown>
      </div>
    </article>
  )
}
