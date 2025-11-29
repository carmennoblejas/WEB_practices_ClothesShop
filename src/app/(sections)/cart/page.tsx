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

  return <CartContent cartItems={plainCart} />
}
