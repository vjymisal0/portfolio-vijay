import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import WritingList from '@/components/blog/writing-list'

export const metadata: Metadata = {
  title: 'Writings & Learnings',
  description: 'Posts and short notes on what I’m building and learning.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="section-scroll relative h-full">
      <div className="mx-auto max-w-2xl px-5 py-16 pb-28 sm:px-6 sm:py-20 lg:pb-20">
        {/* Masthead */}
        <header>
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Vijay Misal
          </p>
          <h1 className="mt-4 font-display text-5xl font-normal leading-[0.95] tracking-tight text-foreground sm:text-6xl">
            Writings
            <span className="block italic text-muted-foreground">&amp; learnings</span>
          </h1>
          <p className="mt-5 max-w-md font-reading text-lg leading-relaxed text-muted-foreground">
            A working notebook — longer posts on what I build, and shorter notes
            on what I&apos;m still figuring out.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-16 border-t border-border pt-16 text-center font-reading text-muted-foreground">
            Nothing published yet — check back soon.
          </p>
        ) : (
          <WritingList posts={posts} />
        )}
      </div>
    </section>
  )
}
