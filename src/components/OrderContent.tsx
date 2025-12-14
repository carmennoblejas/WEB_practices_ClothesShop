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
    <section className="max-w-6xl mx-auto px-6 py-12 text-text-main dark:text-text-dark-main">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">Order Details</h1>

      <div className="bg-background-secondary dark:bg-background-dark-secondary p-6 rounded-lg shadow-lg mb-12 space-y-4 border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-bold text-text-main dark:text-text-dark-main mb-4">Order Info</h2>

        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Date:</span>
          <span className="text-text-main dark:text-text-dark-main">{new Date(order.date).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Address:</span>
          <span className="text-text-main dark:text-text-dark-main">{order.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Cardholder:</span>
          <span className="text-text-main dark:text-text-dark-main">{order.cardHolder}</span>
        </div>

        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Card Number:</span>
          <span className="text-text-main dark:text-text-dark-main">•••• •••• •••• {order.cardNumber.slice(-4)}</span>
        </div>
      </div>

      
      <div className="bg-background-secondary dark:bg-background-dark-secondary p-6 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-bold text-text-main dark:text-text-dark-main mb-4">Products</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead>
              <tr className="border-b border-border-light dark:border-border-dark text-text-muted dark:text-text-dark-muted uppercase text-xs tracking-widest">
                <th className="px-4 py-2">Product Image</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => {
                //  Añadimos 'as unknown' antes del tipo final para que no pete
                const product = item.product as unknown as { name: string; img: string }
                
                const productName = product.name || 'Unknown Product'
                const productImage = product.img || ''
                const unitPrice = item.price.toFixed(2)
                const subtotal = (item.qty * item.price).toFixed(2)

                return (
                  <tr
                    key={index}
                    className="border-b border-border-light dark:border-border-dark hover:bg-background dark:hover:bg-background-dark transition"
                  >
                    <td className="px-4 py-3 flex items-center gap-4">
                      {productImage && (
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-background dark:bg-background-dark">
                          <Image
                            src={productImage}
                            alt={productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-text-main dark:text-text-dark-main">{productName}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-text-muted dark:text-text-dark-muted">{item.qty}</td>
                    <td className="px-4 py-3 text-center text-text-muted dark:text-text-dark-muted">{unitPrice} €</td>
                    <td className="px-4 py-3 text-right text-text-main dark:text-text-dark-main">{subtotal} €</td>
                  </tr>
                )
              })}

              <tr className="border-t border-border-light dark:border-border-dark">
                <td colSpan={3} className="px-4 py-4 text-right font-bold text-secondary dark:text-accent">
                  Total
                </td>
                <td className="px-4 py-4 text-right font-bold text-accent dark:text-accent">
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
