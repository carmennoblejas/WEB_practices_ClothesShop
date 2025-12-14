'use client'

import { useState } from 'react'
import Link from 'next/link' 
import CartItemCounter from './CartItemCounter'
import AddToCartButton from './addCartButton'
import RemoveAllButton from './RemoveAllButton'

interface Props {
  userId?: string
  productId: string
}

export default function AddToCartController({ userId, productId }: Props) {
  const [quantity, setQuantity] = useState(1)

  
  if (!userId) {
    return (
      <Link
        href="/auth/signin"
        className="mt-4 block w-full rounded-lg bg-primary px-6 py-3 text-center font-bold text-white shadow-md transition hover:bg-primary-hover dark:text-text-dark-main"
      >
        Sign in to add to cart
      </Link>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <CartItemCounter
          userId={userId} 
          productId={productId}
          value={quantity}
          onChange={setQuantity} 
        />
        <RemoveAllButton userId={userId} productId={productId} />
      </div>

      <AddToCartButton
        userId={userId}
        productId={productId}
        quantity={quantity}
      />
    </div>
  )
}
