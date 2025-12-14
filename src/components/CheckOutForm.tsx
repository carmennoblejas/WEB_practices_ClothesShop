'use client'

import { Product } from '@/models/Product'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  product: Product & { _id: string }
  qty: number
}

interface UserData {
  _id: string
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
  const router = useRouter()
  const [address, setAddress] = useState(user.address || '')
  const [cardHolder, setCardHolder] = useState(`${user.name} ${user.surname}`)
  const [cardNumber, setCardNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false) 

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0)

  const handlePurchase = async () => {
    if (!address || !cardHolder || !cardNumber) {
      alert('Please fill in all fields')
      return
    }
    const cardNumberRegex = /^\d{16}$/
    if (!cardNumberRegex.test(cardNumber)) {
      alert('Invalid card number. Must be 16 digits.')
      return
    }
    setIsSubmitting(true)
    
    try {
      
      const response = await fetch(`/api/users/${user._id}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          cardHolder,
          cardNumber,
        }),
      })

      if (response.ok) {
        alert('Order placed successfully!')
        router.push('/profile') 
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to place order')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while processing your order')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-text-main dark:text-text-dark-main space-y-10">
      <h1 className="text-3xl font-bold font-serif mb-6">Checkout</h1>

      <div className="bg-background-secondary dark:bg-background-dark-secondary rounded-lg shadow-lg overflow-x-auto border border-border-light dark:border-border-dark">
        <table className="min-w-full table-auto text-left text-sm">
          <thead>
            <tr className="bg-background dark:bg-background-dark text-text-muted dark:text-text-dark-muted uppercase text-xs border-b border-border-light dark:border-border-dark">
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
                <tr key={product._id.toString()} className="border-b border-border-light dark:border-border-dark">
                  <td className="px-4 py-3 text-text-main dark:text-text-dark-main">{product.name}</td>
                  <td className="px-4 py-3 text-center text-text-muted dark:text-text-dark-muted">{qty}</td>
                  <td className="px-4 py-3 text-center text-text-muted dark:text-text-dark-muted">{unitPrice} €</td>
                  <td className="px-4 py-3 text-right text-text-main dark:text-text-dark-main">{itemTotal} €</td>
                </tr>
              )
            })}

            <tr className="border-t border-border-light dark:border-border-dark">
              <td colSpan={3} className="px-4 py-4 text-right font-semibold text-secondary dark:text-accent">
                Total
              </td>
              <td className="px-4 py-4 text-right font-bold text-accent dark:text-accent">
                {total.toFixed(2)} €
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-background-secondary dark:bg-background-dark-secondary p-6 rounded-lg shadow-lg space-y-4 border border-border-light dark:border-border-dark">
        <div>
          <label className="block mb-1 text-sm font-semibold text-text-muted dark:text-text-dark-muted">
            Shipping address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-text-muted dark:text-text-dark-muted">Card Holder</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full px-4 py-2 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 text-sm font-semibold text-text-muted dark:text-text-dark-muted">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 rounded bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition"
            />
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={handlePurchase}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-hover text-white dark:text-text-dark-main font-semibold px-6 py-3 rounded-md shadow-md transition"
          >
            Purchase
            {isSubmitting ? ' Processing...' : ' '}
          </button>
        </div>
      </div>
    </section>
  )
}
