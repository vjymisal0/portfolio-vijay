import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
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
    <section className="section-scroll relative h-full bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-28 lg:pb-16 space-y-3">
        <SectionTitle>Writings &amp; Learnings</SectionTitle>
        <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
          Posts and short notes on what I&apos;m building and learning.
        </p>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground pt-10">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 pt-8 max-w-3xl mx-auto">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
