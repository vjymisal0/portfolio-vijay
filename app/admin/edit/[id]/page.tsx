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
    <div className="px-5 pb-16 pt-4 sm:px-6">
      <PostEditor post={post} />
    </div>
  )
}
