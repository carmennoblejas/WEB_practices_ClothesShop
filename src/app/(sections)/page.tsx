import ProductTile from '@/components/ProductTile'
import { getProducts } from '@/lib/handlers'

export default async function Index() {
  const data = await getProducts()

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-text-main dark:text-text-dark-main mb-10 text-center">
          Our Collection
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data.products.map((product) => (
            <ProductTile key={product._id.toString()} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
