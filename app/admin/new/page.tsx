import PostEditor from '@/components/admin/post-editor'

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">New post</h1>
      <PostEditor />
    </div>
  )
}
