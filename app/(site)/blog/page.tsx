import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import WritingList from '@/components/blog/writing-list'

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Posts and short notes on what I’m building and learning.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  const count = posts.length

  return (
    <section className="section-scroll relative h-full">
      <div className="mx-auto max-w-2xl px-5 py-14 pb-28 sm:px-6 sm:py-20 lg:pb-20">
        {/* Folio line — the running header of the notebook */}
        <div className="flex items-center justify-between border-b border-border pb-3 font-sans text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>Vijay Misal</span>
          <span>
            {count} {count === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {/* Masthead */}
        <header className="pt-10">
          <h1 className="font-display text-6xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-8xl">
            Field
            <span className="block italic text-muted-foreground">Notes</span>
          </h1>
          <p className="mt-6 max-w-md font-reading text-lg leading-relaxed text-muted-foreground">
            A working notebook — longer posts on what I build, and shorter notes
            on what I&apos;m still figuring out.
          </p>
        </header>

        {count === 0 ? (
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
