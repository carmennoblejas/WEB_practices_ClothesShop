'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItemCounterProps {
  userId: string
  productId: string
  value: number
}

export default function CartItemCounter({
  userId,
  productId,
  value,
}: CartItemCounterProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(value)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateCart = async (newQuantity: number) => {
    setIsUpdating(true)
    try {
      await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: newQuantity }),
      })
      setQuantity(newQuantity) // actualiza localmente
      router.refresh()
    } finally {
      setIsUpdating(false)
    }
  }

  const handleIncrement = () => updateCart(quantity + 1)
  const handleDecrement = () => {
    if (quantity > 1) updateCart(quantity - 1)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Math.min(50, Number(event.target.value)))
    setQuantity(newQuantity)
  }

  const handleBlur = () => updateCart(quantity)

  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent text-black dark:text-white transition">
  {/* Botón "-" */}
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

  {/* Input sin flechas ni bordes */}
  <input
    type="number"
    value={quantity}
    onChange={handleInputChange}
    onBlur={handleBlur}
    min="1"
    max="50"
    disabled={isUpdating}
    className="w-10 text-center text-xl font-bold bg-transparent text-black dark:text-white focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
  />

  {/* Botón "+" */}
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
