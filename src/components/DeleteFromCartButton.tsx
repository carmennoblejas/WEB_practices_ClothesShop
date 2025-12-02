'use client';

import { useRouter } from 'next/navigation';

interface DeleteFromCartButtonProps {
  userId: string;
  productId: string;
  onDeleteSuccess?: () => void; 
}

export default function DeleteFromCartButton({ userId, productId, onDeleteSuccess }: DeleteFromCartButtonProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product removed from cart successfully!');
        onDeleteSuccess?.(); // llama al callback si se proporciona
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
      className="px-4 py-2 rounded-md border border-red-500 dark:border-red-500 text-red-600 dark:text-red-500 bg-transparent hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white font-medium transition-all duration-300 group-hover:scale-105"
    >
      Delete
    </button>
  );
}
