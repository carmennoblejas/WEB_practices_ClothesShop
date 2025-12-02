'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItemCounterProps {
  userId: string;
  productId: string;
  value: number;
}

export default function CartItemCounter({ userId, productId, value }: CartItemCounterProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCart = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: newQuantity }),
      });
      setQuantity(newQuantity);
      router.refresh();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncrement = () => {
    updateCart(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateCart(quantity - 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Math.min(50, Number(event.target.value)));
    setQuantity(newQuantity);
  };

  const handleBlur = () => {
    updateCart(quantity);
  };

  return (
    <div className="w-full h-11 flex items-center justify-between rounded-lg bg-background-secondary dark:bg-background-dark-secondary border border-border-light dark:border-border-dark">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isUpdating || quantity <= 1}
        className="h-11 w-11 rounded-l-lg border border-border-light dark:border-border-dark bg-background-secondary dark:bg-background-dark-secondary p-2 hover:bg-background dark:hover:bg-background-dark focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition disabled:opacity-50"
      >
        <svg
          className="h-4 w-4 text-text-main dark:text-text-dark-main"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>

      <input
        type="number"
        id="quantity-input"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min="1"
        max="50"
        disabled={isUpdating}
        className="h-11 w-16 text-center border-t border-b border-border-light dark:border-border-dark bg-background dark:bg-background-dark text-sm text-text-main dark:text-text-dark-main focus:border-secondary dark:focus:border-accent focus:ring-secondary dark:focus:ring-accent focus:outline-none"
        style={{ appearance: 'textfield' }}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={isUpdating}
        className="h-11 w-11 rounded-r-lg border border-border-light dark:border-border-dark bg-background-secondary dark:bg-background-dark-secondary p-2 hover:bg-background dark:hover:bg-background-dark focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition disabled:opacity-50"
      >
        <svg
          className="h-4 w-4 text-text-main dark:text-text-dark-main"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
}
