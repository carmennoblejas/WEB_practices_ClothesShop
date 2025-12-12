'use client'

import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function RemoveAllButton({
  userId,
  productId,
}: {
  userId: string
  productId: string
}) {
  const router = useRouter()

  const handleRemoveAll = async () => {
    try {
      const res = await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        console.error('Failed to remove all items')
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  return (
    <button
      onClick={handleRemoveAll}
      className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-800 transition"
      aria-label="Remove all from cart"
    >
      <TrashIcon className="h-5 w-5 text-red-500" />
    </button>
  )
}
