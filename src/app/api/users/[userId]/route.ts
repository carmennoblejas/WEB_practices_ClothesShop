import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import { ErrorResponse, getUser, GetUserResponse, createUser, CreateUserResponse } from '@/lib/handlers'
import { create } from 'domain'

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string }
  }
): Promise<NextResponse<GetUserResponse> | NextResponse<ErrorResponse>> {
  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid user ID.',
      },
      { status: 400 }
    )
  }

  const user = await getUser(params.userId)

  if (user === null) {
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found.',
      },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<CreateUserResponse | ErrorResponse>> {
  const data = await request.json();

  if (!data.email || !data.password || !data.name){
    return NextResponse.json(
      {
        error: 'INVALID_DATA',
        message: 'Missing required fields: email, password or name',
      },
      {status:400}
    );
  }

  const user = await createUser({
    email: data.email,
    password: data.password,
    name: data.name,
    surname: data.surname,
    address: data.address,
    birthdate: new Date(data.birthdate),
  });

  if (user == null){
    return NextResponse.json(
      {
        error: 'USER_EXISTS',
        message: 'A user with that email already exists.',
      },
      {status: 400}
    );
  }

  return NextResponse.json(user, {status:201});
}

