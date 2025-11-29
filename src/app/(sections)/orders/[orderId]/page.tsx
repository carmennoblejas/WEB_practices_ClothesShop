import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getOrderById } from '@/lib/handlers';
import OrderContent from '@/components/OrderContent';

export default async function OrderPage({ params }: { params: { orderId: string } }) {
  const session = await getSession();
  if (!session) {
    redirect('/auth/signin'); // Redirige si no hay sesión
  }

  const order = await getOrderById(params.orderId);

  if (!order || order.userId.toString() !== session.userId.toString()) {
    // Asegura que el usuario solo vea sus propios pedidos
    redirect('/');
  }

  const plainOrder = JSON.parse(JSON.stringify(order));

  return <OrderContent order={plainOrder} />;
}
