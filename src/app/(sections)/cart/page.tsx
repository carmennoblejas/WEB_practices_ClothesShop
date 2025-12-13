import { redirect } from 'next/navigation'
import { getUserCart, getUser } from '@/lib/handlers'
import { getSession } from '@/lib/auth'
import CartContent from '@/components/CartContent'
import { userInfo } from 'os'

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
    return <CartContent cartItems={plainCart} userId= {session.userId} />
  }
  return (
    <div className="flex items-center justify-center gap-6 bg-background-secondary dark:bg-background-dark-secondary p-8 rounded-lg shadow-md border border-border-light dark:border-border-dark">
      <p className="text-text-main dark:text-text-dark-main text-lg font-bold">
        Your cart is empty
      </p>
    </div>
  )
}
