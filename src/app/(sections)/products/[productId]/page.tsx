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
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-background-secondary dark:bg-background-dark-secondary border border-border-light dark:border-border-dark">
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
          <h1 className="text-3xl font-serif font-bold text-text-main dark:text-text-dark-main">
            {product.name}
          </h1>

          <p className="text-xl text-accent dark:text-accent font-semibold">{product.price.toFixed(2)} €</p>

          {product.description && (
            <p className="text-text-muted dark:text-text-dark-muted leading-relaxed">{product.description}</p>
          )}

          {/* Controles visuales (a futuro funcionales) */}
          <div className="flex items-center gap-4 pt-4">
            <button className="bg-background-secondary dark:bg-background-dark-secondary text-text-main dark:text-text-dark-main border border-border-light dark:border-border-dark px-3 py-1 rounded text-lg hover:bg-background dark:hover:bg-background-dark transition">
              -
            </button>
            <span className="text-text-main dark:text-text-dark-main text-lg font-medium">1</span>
            <button className="bg-background-secondary dark:bg-background-dark-secondary text-text-main dark:text-text-dark-main border border-border-light dark:border-border-dark px-3 py-1 rounded text-lg hover:bg-background dark:hover:bg-background-dark transition">
              +
            </button>
          </div>

          <button className="mt-6 bg-primary hover:bg-primary-hover text-white dark:text-text-dark-main px-6 py-3 rounded font-semibold shadow-md transition">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  )
}
