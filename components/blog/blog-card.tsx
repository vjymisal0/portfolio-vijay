'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { PostSummary } from '@/lib/notion'

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogCard({ post }: { post: PostSummary }) {
  if (post.type === 'Thought') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 350, damping: 24 }} className="h-full">
          <Card className="h-full border-border/80 transition-colors group-hover:border-primary group-hover:bg-accent/40">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  Thought
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </span>
              </div>
              <h3 className="font-medium leading-snug transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} className="h-full">
        <Card className="h-full overflow-hidden border-border/80 shadow-sm transition-all group-hover:border-primary group-hover:shadow-md group-hover:bg-accent/30">
          {post.cover && (
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <CardHeader className="space-y-2">
            <span className="text-xs text-muted-foreground">
              {formatDate(post.date)}
            </span>
            <CardTitle className="text-lg transition-colors group-hover:text-primary">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {post.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            )}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
