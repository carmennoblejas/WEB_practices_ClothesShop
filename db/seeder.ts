import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Users, { User } from '@/models/User'
import Products, { Product } from '@/models/Product'
import Orders, { Order } from '@/models/Order'
import bcrypt from 'bcrypt'

dotenv.config({ path: `.env.local`, override: true })
const MONGODB_URI = process.env.MONGODB_URI

async function seed() {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  const opts = { bufferCommands: false }

  const conn = await mongoose.connect(MONGODB_URI, opts)

  if (conn.connection.db === undefined) {
    throw new Error('Could not connect')
  }

  await conn.connection.db.dropDatabase()

  const products: Product[] = [
    {
      name: 'Orange Birkin 25',
      price: 5999.95,
      img: '/img/Birkinnaranja.png',
      description: 'Ideal everyday bag for autumn',
    },
    {
      name: 'Lady Dior',
      price: 2449.95,
      img: '/img/ladydiorgris.png',
      description: 'Classy small bag for all type of events',
    },
     {
      name: 'Jacquemus',
      price: 820,
      img: '/img/jaquemus.png',
      description: 'Perfect juvenil bag',
    },
     {
      name: 'Louis Vouitton Side Trunk',
      price: 3000,
      img: '/img/louisvuitton.png',
      description: 'Chic bag for that brunch',
    },
     {
      name: 'Kelly',
      price: 7000,
      img: '/img/kelly.png',
      description: 'Perfect as a classy business bag',
    },
     {
      name: 'Bvlgari',
      price: 6500,
      img: '/img/bvlgarisf.png',
      description: 'Impress in that event with your bvlgari',
    },
     {
      name: 'Picotin',
      price: 3850,
      img: '/img/picotin.png',
      description: 'Classy small bag',
    },
     {
      name: 'Dior Toujours',
      price: 3000,
      img: '/img/diortoujours.png',
      description: 'All eyes on you',
    },
     {
      name: 'Chanel Double Classic',
      price: 6500,
      img: '/img/chanel.png',
      description: 'Incredible breathtaking bag',
    },
  ]
  const insertedProducts = await Products.insertMany(products)

  const hashedPassword = await bcrypt.hash('1234', 10)

  // Usuario 1
  const user1: User = {
    email: 'johndoe@example.com',
    password: hashedPassword,
    name: 'John',
    surname: 'Doe',
    address: '123 Main St, 12345 New York, United States',
    birthdate: new Date('1970-01-01'),
    cartItems: [
      {
        product: insertedProducts[0]._id,
        qty: 2,
      },
      {
        product: insertedProducts[1]._id,
        qty: 5,
      },
    ],
    orders: [],
  }

  const res1 = await Users.create(user1)
  console.log('Usuario 1 creado:', JSON.stringify(res1, null, 2))


  const hashedPassword2 = await bcrypt.hash('password', 10)
  // Usuario 2
  const user2: User = {
    email: 'janedoe@example.com',
    password: hashedPassword2,
    name: 'Jane',
    surname: 'Smith',
    address: '456 Oak Ave, 67890 Los Angeles, United States',
    birthdate: new Date('1985-06-15'),
    cartItems: [
      {
        product: insertedProducts[1]._id,
        qty: 1,
      },
    ],
    orders: [],
  }

  const res2 = await Users.create(user2)
  console.log('Usuario 2 creado:', JSON.stringify(res2, null, 2))

  // Orden para usuario 1
  const order1: Order = {
    userId: res1._id,
    orderItems: [
      {
        product: insertedProducts[0]._id,
        qty: 2,
        price: insertedProducts[0].price,
      },
      {
        product: insertedProducts[1]._id,
        qty: 5,
        price: insertedProducts[1].price,
      },
    ],
    address: res1.address,
    date: new Date('2025-10-01'),
    cardHolder: 'John Doe',
    cardNumber: '0123456789',
  }

  const createdOrders1 = await Orders.insertMany(order1)
  res1.orders = createdOrders1.map((order) => order._id)
  await res1.save()

  // Orden para usuario 2
  const order2: Order = {
    userId: res2._id,
    orderItems: [
      {
        product: insertedProducts[1]._id,
        qty: 1,
        price: insertedProducts[1].price,
      },
    ],
    address: res2.address,
    date: new Date('2025-10-15'),
    cardHolder: 'Jane Smith',
    cardNumber: '9876543210',
  }

  const createdOrders2 = await Orders.insertMany(order2)
  res2.orders = createdOrders2.map((order) => order._id)
  await res2.save()

  await conn.disconnect()
  console.log('Seed completado con 2 usuarios')
}

seed().catch(console.error)
