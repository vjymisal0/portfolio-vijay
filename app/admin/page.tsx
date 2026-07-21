import Link from 'next/link'
import { getAllPostsAdmin } from '@/lib/posts'
import { logout } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DeletePostButton from '@/components/admin/delete-post-button'
import { PlusCircle, Pencil, ExternalLink, LogOut } from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function AdminDashboard() {
  const posts = await getAllPostsAdmin()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Writings</h1>
          <p className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/admin/new">
              <PlusCircle className="mr-1.5 h-4 w-4" />
              New
            </Link>
          </Button>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="mr-1.5 h-4 w-4" />
              Sign out
            </Button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No posts yet. Create your first one.
        </p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center gap-3 rounded-lg border border-border/80 bg-card px-4 py-3 transition-colors hover:border-border"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{post.title}</span>
                  {post.type === 'Thought' && (
                    <Badge variant="secondary" className="text-[10px]">
                      Thought
                    </Badge>
                  )}
                  {post.published ? (
                    <Badge className="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/15 text-[10px]">
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  /{post.slug} · {formatDate(post.date)}
                </p>
              </div>

              {post.published && (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  title="View live"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              <Link
                href={`/admin/edit/${post.id}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeletePostButton id={post.id} title={post.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
