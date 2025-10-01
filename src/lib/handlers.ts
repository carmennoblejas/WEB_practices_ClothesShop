import Products, { Product } from '@/models/Product'
import Users, { User, CartItem } from '@/models/User'

import connect from '@/lib/mongoose'
import { Types } from 'mongoose';


export interface GetProductsResponse {
  products: (Product & { _id: Types.ObjectId })[]
}

export async function getProducts(): Promise<GetProductsResponse> {
await connect()

const productsProjection = {
  __v: false
}

const products = await Products.find({}, productsProjection)

return {
  products,
  }
}

export async function getProduct(
  productId: Types.ObjectId | string
  ): Promise<GetProductResponse | null> {

    await connect()
    const productProjection = {
    name: true,
    description: true,
    img: true,
    price: true,
  }

  const product = await Products.findById(productId, productProjection)
  return product
}

export interface GetProductResponse
  extends Pick<Product, 'name' | 'description' | 'img' | 'price'> {
  _id: Types.ObjectId
}

export interface ErrorResponse {
  error: string
  message: string
}

export interface CreateUserResponse {
  _id: Types.ObjectId
}

export interface GetUserResponse
  extends Pick<User, 'email' | 'name' | 'surname' | 'address' | 'birthdate'> {
  _id: Types.ObjectId
}

export async function getUser(
  userId: Types.ObjectId | string
  ): Promise<GetUserResponse | null> {

    await connect()
    const userProjection = {
    email: true,
    name: true,
    surname: true,
    address: true,
    birthdate: true,
  }

  const user = await Users.findById(userId, userProjection)
  return user
}



export async function createUser(user: {
  email: string;
  password: string;
  name: string;
  surname: string;
  address: string;
  birthdate: Date;
}): Promise<CreateUserResponse | null> {
  await connect();

  const prevUser = await Users.find({ email: user.email });

  if (prevUser.length !== 0) {
    return null;
  }

  const doc: User = {
    ...user,
    birthdate: new Date(user.birthdate),
    cartItems: [],
    orders: [],
  };

  const newUser = await Users.create(doc);

  return {
    _id: newUser._id,
  };
}

export interface GetUserCartResponse {
  cartItems: (Omit<CartItem, 'product'> &{
    product: Product;
  })[]; 
}

export async function getUserCart(
  userId: Types.ObjectId | string
): Promise<GetUserCartResponse | null> {
  await connect();
  const user = await Users.findById(userId).populate<{
    cartItems: {
      product: Product;
      qty: number;
    }[];
  }>('cartItems.product');

  if(!user) {
    return null;
  }

  return { cartItems: user.cartItems};
}

