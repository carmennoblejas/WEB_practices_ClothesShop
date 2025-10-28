import { NextRequest, NextResponse } from "next/server";
import { GetUserCartResponse, getUserCart, ErrorResponse } from "@/lib/handlers";
import { Types } from "mongoose";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {userId : string};
  }
): Promise<NextResponse<GetUserCartResponse | ErrorResponse>>{
  const {userId} = params;
      const session = await getSession()
      if (!session?.userId) {
        return NextResponse.json(
          {
            error: 'NOT_AUTHENTICATED',
            message: 'Authentication required.',
          },
          { status: 401 }
        )
      }
  if (session.userId.toString() !== params.userId) {
    return NextResponse.json(
      {
        error: 'NOT_AUTHORIZED',
        message: 'Unauthorized access.',
      },
      { status: 403 }
    )
  }

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