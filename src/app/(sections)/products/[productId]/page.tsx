import { Types } from 'mongoose'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/handlers'
import { getSession } from '@/lib/auth'
import Image from 'next/image'
import AddToCartController from '@/components/AddToCartController' 

export default async function Product({
  params,
}: {
  params: { productId: string }
}) {
  // Validar ID
  if (!Types.ObjectId.isValid(params.productId)) {
    notFound()
  }

  // Obtener producto
  const product = await getProduct(params.productId)
  if (product === null) {
    notFound()
  }

  // Obtener sesión
  const session = await getSession()
  const isLoggedIn = !!session
  const userId = session?.userId

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

          <p className="text-xl text-accent dark:text-accent font-semibold">
            {product.price.toFixed(2)} €
          </p>

          {product.description && (
            <p className="text-text-muted dark:text-text-dark-muted leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Controles: contador, eliminar y botón de añadir */}
          <AddToCartController
            userId={userId}
            productId={product._id.toString()}
          />
        </div>
      </div>
    </section>
  )
}
