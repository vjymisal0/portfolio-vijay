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
  const total = posts.length

  return (
    <ol className="mt-12 border-t border-border">
      {posts.map((post, i) => {
        const { mon, year } = railDate(post.date)
        // Content-true entry number: the Nth thing written, newest highest.
        const no = String(total - i).padStart(2, '0')

        return (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.35), ease: 'easeOut' }}
            className="border-b border-border"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[3.5rem_1fr] gap-4 py-7 sm:grid-cols-[5rem_1fr] sm:gap-8"
            >
              {/* Ledger rail: entry number + when it was written */}
              <div className="flex flex-col gap-2 pt-1.5">
                <span className="font-sans text-[11px] font-medium tabular-nums tracking-[0.1em] text-foreground/80">
                  №{no}
                </span>
                <span className="font-sans text-[10px] leading-tight tracking-[0.18em] text-muted-foreground">
                  {mon}
                  <br />
                  {year}
                </span>
              </div>

              <div className="min-w-0">
                {post.type === 'Thought' && (
                  <span className="mb-1.5 inline-block font-sans text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Thought
                  </span>
                )}

                <h2 className="font-display text-2xl font-normal leading-snug tracking-tight text-foreground sm:text-[1.7rem]">
                  <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_1px]">
                    {post.title}
                  </span>
                  <ArrowUpRight className="ml-1 inline-block h-4 w-4 -translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h2>

                {post.excerpt && (
                  <p className="mt-2.5 max-w-xl font-reading text-[15px] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                  <span>{post.minutes} min read</span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="before:mr-3 before:text-border before:content-['/']">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.li>
        )
      })}
    </ol>
  )
}
