import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/notion'

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
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="mb-10 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          {post.type === 'Thought' && (
            <Badge variant="secondary" className="text-[10px]">
              Thought
            </Badge>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <span className="block h-[3px] w-10 rounded-full bg-gradient-to-r from-primary via-primary/70 to-primary/20" />
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>
      <div className="prose dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-a:text-primary prose-p:leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
