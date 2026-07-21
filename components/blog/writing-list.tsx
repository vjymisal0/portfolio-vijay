'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { PostSummary } from '@/lib/posts'

function railDate(date: string) {
  if (!date) return { mon: '', year: '' }
  const d = new Date(date)
  return {
    mon: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    year: String(d.getFullYear()),
  }
}

export default function WritingList({ posts }: { posts: PostSummary[] }) {
  return (
    <ol className="mt-14">
      {posts.map((post, i) => {
        const { mon, year } = railDate(post.date)
        // Dim the rail when this entry shares a month with the one above it,
        // so the date column reads like a grouped ledger rather than a repeat.
        const prev = posts[i - 1]
        const sameGroup =
          prev && railDate(prev.date).mon === mon && railDate(prev.date).year === year

        return (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4), ease: 'easeOut' }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[3.25rem_1fr] gap-4 border-t border-border py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-7"
            >
              {/* Date rail — content-true: when it was written */}
              <div
                className={`pt-1 font-sans text-[10px] font-medium leading-tight tracking-[0.18em] transition-opacity ${
                  sameGroup ? 'opacity-25' : 'text-muted-foreground'
                }`}
              >
                <div>{mon}</div>
                <div>{year}</div>
              </div>

              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  {post.type === 'Thought' && (
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Thought ·
                    </span>
                  )}
                  <h2 className="font-display text-xl font-normal leading-snug tracking-tight text-foreground transition-colors sm:text-2xl">
                    <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
                      {post.title}
                    </span>
                    <ArrowUpRight className="ml-1 inline-block h-4 w-4 -translate-y-0.5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </h2>
                </div>

                {post.excerpt && (
                  <p className="mt-2 max-w-xl font-reading text-[15px] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}

                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.li>
        )
      })}
      <li className="border-t border-border" />
    </ol>
  )
}
