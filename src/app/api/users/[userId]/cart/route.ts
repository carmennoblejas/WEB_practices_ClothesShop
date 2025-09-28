import { NextRequest, NextResponse } from "next/server";
import { GetUserCartResponse, getUserCart, ErrorResponse } from "@/lib/handlers";
import { Types } from "mongoose";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {userId : string};
  }
): Promise<NextResponse<GetUserCartResponse | ErrorResponse>>{
  const {userId} = params;

   if (!Types.ObjectId.isValid(userId)){
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid user ID',
      },
      { status: 400}

    );
  }

  const cart = await getUserCart(userId);

  if (cart === null){
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found.',
      },
      {status: 404}
    );
  }

  return NextResponse.json(cart);
}