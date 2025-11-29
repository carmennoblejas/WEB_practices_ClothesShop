'use client'

import { GetUserResponse } from '@/lib/handlers'
import { GetUserOrdersResponse } from '@/lib/handlers'
import Link from 'next/link'

export default function ProfileContent({
  user,
  orders,
}: {
  user: GetUserResponse
  orders: GetUserOrdersResponse['orders']
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">My profile</h1>

      {/* 🧍 Información personal */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>

        <p>
          <span className="text-pink-300 font-semibold">Name:</span> {user.name} {user.surname}
        </p>
        <p>
          <span className="text-pink-300 font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="text-pink-300 font-semibold">Address:</span> {user.address}
        </p>
        <p>
          <span className="text-pink-300 font-semibold">Birth date:</span>{' '}
          {new Date(user.birthdate).toLocaleDateString()}
        </p>
      </div>

      {/* 📦 Pedidos realizados */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Completed orders</h2>

        {orders?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
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
                      className="border-b border-gray-700 hover:bg-gray-700 transition"
                    >
                      <td className="px-4 py-2 text-white">{order._id.toString()}</td>
                      <td className="px-4 py-2 text-gray-300">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-gray-300">{order.address}</td>
                      <td className="px-4 py-2 text-pink-200 font-semibold">
                        {total.toFixed(2)} €
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/orders/${order._id}`}
                          className="text-blue-400 hover:underline"
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
          <p className="text-gray-400">Aún no has realizado ningún pedido.</p>
        )}
      </div>
    </section>
  )
}
