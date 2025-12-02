'use client'

import { GetUserResponse } from '@/lib/handlers'
import { GetUserOrdersResponse } from '@/lib/handlers'
import Link from 'next/link'
import {
  UserIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

export default function ProfileContent({
  user,
  orders,
}: {
  user: GetUserResponse
  orders: GetUserOrdersResponse['orders']
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-text-main dark:text-text-dark-main">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">My profile</h1>

      <div className="bg-background-secondary dark:bg-background-dark-secondary p-6 rounded-lg shadow-lg mb-12 space-y-4 border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-bold text-text-main dark:text-text-dark-main mb-2">Personal Information</h2>

        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Name:</span>
          <span className="text-text-main dark:text-text-dark-main">{user.name} {user.surname}</span>
        </div>

        <div className="flex items-center gap-2">
          <EnvelopeIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Email:</span>
          <span className="text-text-main dark:text-text-dark-main">{user.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Address:</span>
          <span className="text-text-main dark:text-text-dark-main">{user.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-secondary dark:text-accent" />
          <span className="text-secondary dark:text-accent font-semibold">Birth date:</span>
          <span className="text-text-main dark:text-text-dark-main">{new Date(user.birthdate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-background-secondary dark:bg-background-dark-secondary p-6 rounded-lg shadow-lg border border-border-light dark:border-border-dark">
        <h2 className="text-2xl font-bold text-text-main dark:text-text-dark-main mb-4">Completed orders</h2>

        {orders?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr className="border-b border-border-light dark:border-border-dark text-text-muted dark:text-text-dark-muted uppercase text-xs tracking-widest">
                  <th className="px-4 py-2">Order</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const total = order.orderItems.reduce(
                    (sum, item) => sum + item.qty * item.price,
                    0
                  )

                  return (
                    <tr
                      key={order._id.toString()}
                      className="border-b border-border-light dark:border-border-dark hover:bg-background dark:hover:bg-background-dark transition"
                    >
                      <td className="px-4 py-2 text-text-main dark:text-text-dark-main">{order._id.toString()}</td>
                      <td className="px-4 py-2 text-text-muted dark:text-text-dark-muted">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-text-muted dark:text-text-dark-muted">{order.address}</td>
                      <td className="px-4 py-2 text-accent dark:text-accent font-semibold">
                        {total.toFixed(2)} €
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/orders/${order._id}`}
                          className="text-secondary dark:text-accent hover:underline font-medium transition"
                        >
                          View details
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-text-muted dark:text-text-dark-muted">You have not made any orders yet.</p>
        )}
      </div>
    </section>
  )
}
