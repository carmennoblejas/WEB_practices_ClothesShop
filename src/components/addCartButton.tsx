'use client';

import { useRouter } from 'next/navigation'

interface AddToCartButtonProps {
  productId: string;
  userId: string;
  quantity: number; 
}

export default function AddToCartButton({ productId, userId, quantity }: AddToCartButtonProps) {
  const router = useRouter()
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          qty: quantity, 
        }),
      });

      if (response.ok) {
        router.refresh();
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <button
    onClick={handleAddToCart}
    className="mt-4 w-1/2 mx-auto bg-primary hover:bg-primary-hover text-white dark:text-text-dark-main font-bold py-3 rounded-lg dark:bg-primary-light dark:hover:bg-primary transition duration-300"
    >
    Add to Cart
    </button>
  );
}
