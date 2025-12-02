import { Types } from 'mongoose'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/handlers'
import Image from 'next/image'

export default async function Product({
  params,
}: {
  params: { productId: string }
}) {
  if (!Types.ObjectId.isValid(params.productId)) {
    notFound()
  }

  const product = await getProduct(params.productId)
  if (product === null) {
    notFound()
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Imagen del producto */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-800">
          <Image
            src={product.img}
            alt={product.name}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <h1 className="text-3xl font-serif font-bold text-white">
            {product.name}
          </h1>

          <p className="text-xl text-gray-200">{product.price.toFixed(2)} €</p>

          {product.description && (
            <p className="text-gray-300 leading-relaxed">{product.description}</p>
          )}

          {/* Controles visuales (a futuro funcionales) */}
          <div className="flex items-center gap-4 pt-4">
            <button className="bg-gray-700 text-white px-3 py-1 rounded text-lg hover:bg-gray-600">
              -
            </button>
            <span className="text-white text-lg">1</span>
            <button className="bg-gray-700 text-white px-3 py-1 rounded text-lg hover:bg-gray-600">
              +
            </button>
          </div>

          <button className="mt-6 bg-gray-400 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded font-semibold transition">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  )
}
