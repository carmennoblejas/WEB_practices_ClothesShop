'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CartItemCounterProps {
  userId: string
  productId: string
  value: number
  onChange?: (value: number) => void
}

export default function CartItemCounter({
  userId,
  productId,
  value,
  onChange,
}: CartItemCounterProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const updateCart = async (newQuantity: number) => {
    setIsUpdating(true)
    try {
      await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: newQuantity }),
      })
      router.refresh()
    } finally {
      setIsUpdating(false)
    }
  }

  const handleIncrement = () => {
    const newValue = value + 1
    onChange?.(newValue)
    //updateCart(newValue)
  }

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1
      onChange?.(newValue)
      //updateCart(newValue)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(1, Math.min(50, Number(event.target.value)))
    onChange?.(newValue) // sincroniza con el padre
  }

  const handleBlur = () => {
    updateCart(value)
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent text-black dark:text-white transition">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isUpdating}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <svg className="h-4 w-4" viewBox="0 0 18 2">
          <path d="M1 1h16" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min="1"
        max="50"
        disabled={isUpdating}
        className="w-10 text-center text-xl font-bold bg-transparent text-black dark:text-white focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={isUpdating}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <svg className="h-4 w-4" viewBox="0 0 18 18">
          <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  )
}
