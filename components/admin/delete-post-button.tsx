'use client'

import { removePost } from '@/app/admin/actions'
import { Trash2 } from 'lucide-react'

export default function DeletePostButton({
  id,
  title,
}: {
  id: string
  title: string
}) {
  return (
    <form
      action={removePost}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-muted-foreground transition-colors hover:text-destructive"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  )
}
