'use client'

import { useState } from 'react'
import CartItemCounter from './CartItemCounter'
import AddToCartButton from './addCartButton'
import RemoveAllButton from './RemoveAllButton'

interface Props {
  userId?: string
  productId: string
}

export default function AddToCartController({ userId, productId }: Props) {
  const [quantity, setQuantity] = useState(1)

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
