import { NextRequest, NextResponse } from "next/server";
import Users from '@/models/User';
import {
  GetUserCartResponse,
  ErrorResponse,
} from '@/lib/handlers';
import { Types } from 'mongoose';


export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string; productId: string } }
): Promise<NextResponse<GetUserCartResponse | ErrorResponse>> {
  const { userId, productId } = params;


  // Validate userId and productId
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid user ID or product ID.',
      },
      { status: 400 }
    );
  }

  const data = await request.json();
  const { qty } = data;

  // Validate quantity
  if (typeof qty !== 'number' || qty < 1) {
    return NextResponse.json(
      {
        error: 'INVALID_DATA',
        message: 'Quantity must be greater than or equal to 1.',
      },
      { status: 400 }
    );
  }

  // Check if the user exists
  const user = await Users.findById(userId);
  if (!user) {
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found.',
      },
      { status: 404 }
    );
  }


  // Check if product already exists in cart
  const existingCartItemIndex = user.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );

  let newItem = false;

  if (existingCartItemIndex === -1){
    // Product not in cart, add it
    user.cartItems.push({
      product: new Types.ObjectId(productId),
      qty: qty,
    });
    newItem = true; // Mark it
  } else {
    user.cartItems[existingCartItemIndex].qty = qty;
  }

  // Save user changes
  await user.save();

  // Populate cart
  await user.populate({
    path: 'cartItems.product',
    select: 'name price img description',
  });

  //Return updated cart
  return NextResponse.json(
    { cartItems: user.cartItems as unknown as GetUserCartResponse['cartItems'], newItem},
    {
      status: newItem ? 201 : 200,
      headers: newItem
      ? {
        Location: `/api/users/${userId}/cart/${productId}`,
      }
      : undefined,
    }
  );
}