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
    // Aquí iría la lógica para eliminar del carrito
  }

  const handleCheckout = () => {
    router.push('/checkout') // Asegúrate de tener esta ruta creada
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
            className="flex items-center justify-between gap-6 bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            {/* Imagen */}
            <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-900">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${product._id}`}
                className="block text-white font-medium text-md hover:underline truncate"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gray-400 mt-1">Per unit: {unitPrice} €</p>
            </div>

            {/* Precio total */}
            <div className="text-right">
              <p className="text-white font-semibold text-lg">{totalPrice} €</p>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600">-</button>
              <span className="px-2 text-white">{qty}</span>
              <button className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600">+</button>

              {/* Trash button */}
              <button
                type="button"
                onClick={() => handleDelete(product._id.toString())}
                className="p-2 hover:text-red-500 transition-colors"
              >
                <TrashIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        )
      })}

      {/* 💰 Total row */}
      <div className="flex items-center justify-between gap-6 bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
        <p className="text-white text-lg font-bold text-right ml-auto">
          Total: <span className="ml-16">{totalCartPrice.toFixed(2)} €</span>
        </p>
      </div>

      {/* ✅ Checkout button */}
      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={handleCheckout}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
        >
          Checkout
        </button>
      </div>
    </section>
  )
}
