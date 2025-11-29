'use client'

import { Product } from '@/models/Product'
import { useState, useEffect } from 'react'

interface CartItem {
  product: Product
  qty: number
}

interface UserData {
  name: string
  surname: string
  address: string
}

export default function CheckOutForm({
  cartItems,
  user,
}: {
  cartItems: CartItem[]
  user: UserData
}) {
  const [address, setAddress] = useState(user.address || '')
  const [cardHolder, setCardHolder] = useState(`${user.name} ${user.surname}`)
  const [cardNumber, setCardNumber] = useState('')

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0)

  const handlePurchase = () => {
    console.log('Procesando compra...')
    console.log({ address, cardHolder, cardNumber })
    // Aquí puedes hacer una llamada a tu API para guardar el pedido
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-white space-y-10">
      <h1 className="text-3xl font-bold font-serif mb-6">Checkout</h1>

      {/* Tabla de productos */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-xs">
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ product, qty }) => {
              const unitPrice = product.price.toFixed(2)
              const itemTotal = (product.price * qty).toFixed(2)

              return (
                <tr key={product._id.toString()} className="border-b border-gray-700">
                  <td className="px-4 py-3 text-white">{product.name}</td>
                  <td className="px-4 py-3 text-center text-gray-300">{qty}</td>
                  <td className="px-4 py-3 text-center text-gray-300">{unitPrice} €</td>
                  <td className="px-4 py-3 text-right text-white">{itemTotal} €</td>
                </tr>
              )
            })}

            <tr className="border-t border-gray-700">
              <td colSpan={3} className="px-4 py-4 text-right font-semibold text-pink-300">
                Total
              </td>
              <td className="px-4 py-4 text-right font-bold text-white">
                {total.toFixed(2)} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Formulario de pago */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-300">
            Shipping address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-400"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-gray-300">Card Holder</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-gray-300">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={handlePurchase}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
          >
            Purchase
          </button>
        </div>
      </div>
    </section>
  )
}
