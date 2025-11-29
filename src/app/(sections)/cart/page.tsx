import { redirect } from 'next/navigation'
import { getUserCart, getUser } from '@/lib/handlers'
import { getSession } from '@/lib/auth'
import CartContent from '@/components/CartContent'

export default async function Cart() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/signin')
  }

  const user = await getUser(session.userId)
  const cart = await getUserCart(session.userId)

  if (!user || !cart) {
    redirect('/auth/signin')
  }

  const plainCart = JSON.parse(JSON.stringify(cart.cartItems))
  if (cart.cartItems.length != 0){
  return <CartContent cartItems={plainCart} />
  }
  return <div className="flex items-center justify-between gap-6 bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
        <p className="text-white text-lg font-bold">
          Your cart is empty
        </p>
      </div>
}
