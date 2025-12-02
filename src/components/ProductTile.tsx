import { Product } from '@/models/Product'
import { Types } from 'mongoose'
import Image from 'next/image'
import Link from 'next/link'

interface ProductTileProps {
  product: Product & { _id: Types.ObjectId }
}

export default function ProductTile({ product }: ProductTileProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className='group block rounded-lg bg-background-secondary dark:bg-background-dark-secondary shadow-md transition hover:shadow-xl hover:bg-background dark:hover:bg-background-dark border border-border-light dark:border-border-dark'
    >
      <div className='relative aspect-[4/5] w-full overflow-hidden rounded-t-lg'>
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div className='p-4'>
        <h3 className='text-lg font-semibold text-text-main dark:text-text-dark-main group-hover:text-secondary dark:group-hover:text-accent transition'>
          {product.name}
        </h3>
        <p className='mt-1 text-md text-accent dark:text-accent font-medium'>{product.price.toFixed(2)} €</p>
      </div>
    </Link>
  )
}
