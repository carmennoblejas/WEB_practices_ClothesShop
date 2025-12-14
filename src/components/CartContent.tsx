'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/Product'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import RemoveAllButton from './RemoveAllButton'

interface CartItem {
  product: Product & { _id: string }
  qty: number
}

interface CartContentProps {
  cartItems: CartItem[]
  userId: string
}


export default function CartContent({ cartItems, userId }: CartContentProps) {
  const router = useRouter()

  // Nuevo estado para cantidades
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.product._id.toString()] = item.qty
        return acc
      }, {} as Record<string, number>)
  )

  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null)

  const updateQuantity = async (productId: string, newQty: number) => {
    if (newQty < 1 || newQty > 50) return

    // Actualizar localmente la cantidad
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }))

    // Llamar a la API
    setUpdatingProductId(productId)
    await fetch(`/api/users/${userId}/cart/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty: newQty }),
    })
    setUpdatingProductId(null)
    // router.refresh() no es necesario si ya actualizas localmente
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * (quantities[item.product._id.toString()] ?? item.qty),
    0
  )

  return (
    <section className="space-y-6">
      {cartItems.map(({ product }) => {
        const productId = product._id.toString()
        const qty = quantities[productId]
        const totalPrice = (product.price * qty).toFixed(2)
        const unitPrice = product.price.toFixed(2)
        const isUpdating = updatingProductId === productId

        return (
          <div
            key={productId}
            className="flex items-center justify-between gap-6 bg-background-secondary dark:bg-background-dark-secondary p-4 rounded-lg shadow-md hover:bg-background dark:hover:bg-background-dark border border-border-light dark:border-border-dark transition"
          >
            <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-md bg-background dark:bg-background-dark">
              <Image
                src={product.img}
                alt={product.name}
                fill
                priority
                sizes="150px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${productId}`}
                className="block text-text-main dark:text-text-dark-main font-medium text-md hover:text-secondary dark:hover:text-accent transition truncate"
              >
                {product.name}
              </Link>
              <p className="text-sm text-text-muted dark:text-text-dark-muted mt-1">Per unit: {unitPrice} €</p>
            </div>

            <div className="text-right">
              <p className="text-accent dark:text-accent font-semibold text-lg">{totalPrice} €</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main hover:bg-background-secondary dark:hover:bg-background-dark-secondary border border-border-light dark:border-border-dark transition"
                disabled={isUpdating}
                onClick={() => updateQuantity(productId, qty - 1)}
              >
                -
              </button>

              <span className="px-2 text-text-main dark:text-text-dark-main">{qty}</span>

              <button
                className="px-2 py-1 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main hover:bg-background-secondary dark:hover:bg-background-dark-secondary border border-border-light dark:border-border-dark transition"
                disabled={isUpdating}
                onClick={() => updateQuantity(productId, qty + 1)}
              >
                +
              </button>

              <RemoveAllButton userId={userId} productId={productId} />
            </div>
          </div>
        )
      })}

      <div className="flex items-center justify-between gap-6 bg-background-secondary dark:bg-background-dark-secondary p-4 rounded-lg shadow-md border border-border-light dark:border-border-dark">
        <p className="text-text-main dark:text-text-dark-main text-lg font-bold text-right ml-auto">
          Total: <span className="ml-16 text-accent">{totalCartPrice.toFixed(2)} €</span>
        </p>
      </div>

      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={handleCheckout}
          className="bg-primary hover:bg-primary-hover text-white dark:text-text-dark-main font-semibold px-6 py-3 rounded-md shadow-md transition"
        >
          Checkout
        </button>
      </div>
    </section>
  )
}
