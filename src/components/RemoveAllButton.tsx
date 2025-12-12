'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface RemoveAllButton {
  userId: string;
  productId: string;
  onDeleteSuccess?: () => void;
}

export default function RemoveAllButton({ userId, productId, onDeleteSuccess }: RemoveAllButton) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product removed from cart successfully!');
        onDeleteSuccess?.();
        router.refresh();
      } else {
        const data = await response.json();
        alert(`Failed to remove product: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      title="Remove from cart"
      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
    >
      <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
    </button>
  );
}
