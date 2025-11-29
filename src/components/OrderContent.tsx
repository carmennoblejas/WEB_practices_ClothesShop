'use client'

import { Order } from '@/models/Order'
import { CalendarDaysIcon, MapPinIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function OrderContent({ order }: { order: Order }) {
  const total = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">Order Details</h1>

      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Order Info</h2>

        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-pink-300" />
          <span className="text-pink-300 font-semibold">Date:</span>
          <span className="text-white">{new Date(order.date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-pink-300" />
          <span className="text-pink-300 font-semibold">Address:</span>
          <span className="text-white">{order.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5 text-pink-300" />
          <span className="text-pink-300 font-semibold">Cardholder:</span>
          <span className="text-white">{order.cardHolder}</span>
        </div>

        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5 text-pink-300" />
          <span className="text-pink-300 font-semibold">Card Number:</span>
          <span className="text-white">•••• •••• •••• {order.cardNumber.slice(-4)}</span>
        </div>
      </div>

    
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Products</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 uppercase text-xs tracking-widest">
                <th className="px-4 py-2">Product Image</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => {
                const product = item.product
                const productName = typeof product !== 'string' ? product.name : ''
                const productImage = typeof product !== 'string' ? product.img : ''
                const unitPrice = item.price.toFixed(2)
                const subtotal = (item.qty * item.price).toFixed(2)

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-3 flex items-center gap-4">
                      {productImage && (
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={productImage}
                            alt={productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-white">{productName}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-300">{item.qty}</td>
                    <td className="px-4 py-3 text-center text-gray-300">{unitPrice} €</td>
                    <td className="px-4 py-3 text-right text-gray-200">{subtotal} €</td>
                  </tr>
                )
              })}

              {/* Total row */}
              <tr className="border-t border-gray-600">
                <td colSpan={3} className="px-4 py-4 text-right font-bold text-pink-300">
                  Total
                </td>
                <td className="px-4 py-4 text-right font-bold text-white">
                  {total.toFixed(2)} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
