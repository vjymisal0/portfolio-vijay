import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/notion'
import SectionTitle from '@/components/section-title'
import BlogCard from '@/components/blog/blog-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Writings & Learnings',
  description: 'Posts and short notes on what I’m building and learning.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 py-16 space-y-10">
        <SectionTitle>Writings &amp; Learnings</SectionTitle>
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
