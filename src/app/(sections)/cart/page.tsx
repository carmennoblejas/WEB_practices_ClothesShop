import { redirect } from 'next/navigation'
import { getUserCart } from '@/lib/handlers'
import { getSession } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'

export default async function Cart() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/signin')
  }

  const cartItemsData = await getUserCart(session.userId)
  if (!cartItemsData) {
    redirect('/auth/signin')
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h3 className="pb-8 text-3xl font-serif font-bold text-white">
        My Shopping Cart
      </h3>

      {cartItemsData.cartItems.length === 0 ? (
        <div className="text-center text-gray-400">The cart is empty</div>
      ) : (
        <div className="space-y-6">
          {cartItemsData.cartItems.map((cartItem) => {
            const product = cartItem.product

            return (
              <div
                key={product._id.toString()}
                className="flex items-center gap-6 bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                {/* Imagen del producto */}
                <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-900">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Info del producto */}
                <div className="flex-1 space-y-1">
                  <Link
                    href={`/products/${product._id}`}
                    className="text-lg font-semibold text-white hover:underline"
                  >
                    {product.name}
                  </Link>

                  <p className="text-gray-300">Cantidad: {cartItem.qty}</p>

                  <p className="text-gray-200 font-medium">
                    Precio: {product.price.toFixed(2)} €
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
