import { Product } from '@/models/Product'
import { Types } from 'mongoose'
import Link from 'next/link'

interface ProductTileProps {
  product: Product & { _id: Types.ObjectId }
}

export default function ProductTile({ product }: ProductTileProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className='group block rounded-lg bg-gray-800 shadow-md transition hover:shadow-xl hover:bg-gray-700'
    >
      {/* Imagen del producto */}
      <div className='relative aspect-[4/5] w-full overflow-hidden rounded-t-lg'>
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Texto debajo */}
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-white group-hover:text-pink-200 transition'>
          {product.name}
        </h3>
        <p className='mt-1 text-md text-pink-100'>{product.price.toFixed(2)} €</p>
      </div>
    </Link>
  )
}
