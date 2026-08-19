'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// You can swap these with your actual blog data later
const recentPosts = [
  {
    title: 'SOLID Principles in TypeScript: A Practical Guide',
    date: 'Dec 12, 2025',
    slug: 'solid-principles',
    excerpt: 'How to apply SOLID principles to build robust and scalable backend services with TypeScript and NestJS.'
  },
  {
    title: 'Migrating from Express to NestJS',
    date: 'Nov 28, 2025',
    slug: 'migrating-express-nestjs',
    excerpt: 'Lessons learned, architectural shifts, and why decorators make dependency injection a breeze.'
  }
]

export default function RecentThoughts() {
  return (
    <section className="container mx-auto px-6 lg:px-12 max-w-4xl pt-8">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-serif text-[0.8125rem] font-medium uppercase tracking-[0.18em] text-foreground">Recent Thoughts</h2>
        <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex flex-col border-t border-border">
        {recentPosts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group flex flex-col md:flex-row gap-6 py-8 border-b border-border transition-colors hover:bg-foreground/5"
          >
            <div className="w-full md:w-1/3">
              <span className="text-xs font-mono text-muted-foreground">{post.date}</span>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:underline underline-offset-4 decoration-muted-foreground/30">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
