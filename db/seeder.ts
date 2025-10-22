import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Users, { User } from '@/models/User';
import Products, { Product } from '@/models/Product';
import Orders, { Order } from '@/models/Order';


dotenv.config({ path: `.env.local`, override: true });
const MONGODB_URI = process.env.MONGODB_URI;


async function seed() {
  if (!MONGODB_URI) {
  throw new Error(
  'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const opts = { bufferCommands: false };

const conn = await mongoose.connect(MONGODB_URI, opts);

if (conn.connection.db === undefined) {
throw new Error('Could not connect');
}

await conn.connection.db.dropDatabase();
// Do things here.
const products: Product[] = [
{
  name: 'Orange Birkin 25',
  price: 5999.95,
  img: '/img/ecommerce-images/image-card-01.jpg',
  description: 'Ideal everyday bag for autumn',
},
{
  name: 'Lady Dior',
  price: 2449.95,
  img: '/img/ecommerce-images/image-card-02.jpg',
  description: 'Classy small bag for all type of events',
},
];
const insertedProducts = await Products.insertMany(products);
const user: User = {
  email: 'johndoe@example.com',
  password: '1234',
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
};

const retrievedUser = await Users
.findOne({ email: 'johndoe@example.com' })
.populate('cartItems.product');
console.log(JSON.stringify(retrievedUser, null, 2));


const res = await Users.create(user);
console.log(JSON.stringify(res, null, 2));

const order: Order = {
  userId: res._id,
  orderItems: [
    {
      product: insertedProducts[0]._id,
      qty:2,
      price: insertedProducts[0].price,
    },
    {
      product: insertedProducts[1]._id,
      qty:5,
      price: insertedProducts[1].price,
    },
  ],
address: res.address,
date: new Date(1-10-2025),
cardHolder: 'John Doe',
cardNumber: '0123456789',
};

const createdOrders = await Orders.insertMany(order)
res.orders = createdOrders.map((order) => order._id)
await res.save()

await conn.disconnect();

}
seed().catch(console.error);
