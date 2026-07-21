import { notFound } from 'next/navigation'
import { getPostByIdAdmin } from '@/lib/posts'
import PostEditor from '@/components/admin/post-editor'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostByIdAdmin(id)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Edit post</h1>
      <PostEditor post={post} />
    </div>
  )
}
