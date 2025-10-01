import { NextRequest, NextResponse } from "next/server";
import { GetUserOrdersResponse, getUserOrders, ErrorResponse } from "@/lib/handlers";
import { Types } from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<GetUserOrdersResponse | ErrorResponse>> {
  const { userId } = params;


  // Validate userId
  if (!Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid user ID.',
      },
      { status: 400 }
    );
  }

  const orders = await getUserOrders(userId);

  if (orders === null) {
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json(orders);
}