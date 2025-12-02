'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Product } from '@/models/Product'
import { useRouter } from 'next/navigation'

interface CartItem {
  product: Product
  qty: number
}

export default function CartContent({ cartItems }: { cartItems: CartItem[] }) {
  const router = useRouter()

  const handleDelete = (productId: string) => {
    console.log(`Eliminar producto con ID: ${productId}`)
    //lógica para eliminar del carrito
  }

  const handleCheckout = () => {
    router.push('/checkout') 
  }

  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0)

  return (
    <section className="space-y-6">
      {cartItems.map((item) => {
        const { product, qty } = item
        const totalPrice = (product.price * qty).toFixed(2)
        const unitPrice = product.price.toFixed(2)

        return (
          <div
            key={product._id.toString()}
            className="flex items-center justify-between gap-6 bg-background-secondary dark:bg-background-dark-secondary p-4 rounded-lg shadow-md hover:bg-background dark:hover:bg-background-dark border border-border-light dark:border-border-dark transition"
          >
            {/* Imagen */}
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

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${product._id}`}
                className="block text-text-main dark:text-text-dark-main font-medium text-md hover:text-secondary dark:hover:text-accent transition truncate"
              >
                {product.name}
              </Link>
              <p className="text-sm text-text-muted dark:text-text-dark-muted mt-1">Per unit: {unitPrice} €</p>
            </div>

            {/* Precio total */}
            <div className="text-right">
              <p className="text-accent dark:text-accent font-semibold text-lg">{totalPrice} €</p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main hover:bg-background-secondary dark:hover:bg-background-dark-secondary border border-border-light dark:border-border-dark transition">-</button>
              <span className="px-2 text-text-main dark:text-text-dark-main">{qty}</span>
              <button className="px-2 py-1 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main hover:bg-background-secondary dark:hover:bg-background-dark-secondary border border-border-light dark:border-border-dark transition">+</button>

              {/* Trash button */}
              <button
                type="button"
                onClick={() => handleDelete(product._id.toString())}
                className="p-2 text-text-muted dark:text-text-dark-muted hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )
      })}

      {/* Total row */}
      <div className="flex items-center justify-between gap-6 bg-background-secondary dark:bg-background-dark-secondary p-4 rounded-lg shadow-md border border-border-light dark:border-border-dark">
        <p className="text-text-main dark:text-text-dark-main text-lg font-bold text-right ml-auto">
          Total: <span className="ml-16 text-accent">{totalCartPrice.toFixed(2)} €</span>
        </p>
      </div>

      {/* Checkout button */}
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
