import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Users, { User } from '@/models/User';
import Products, { Product } from '@/models/Product';


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
/*const retrievedUsers = await Users.find();
console.log(JSON.stringify(retrievedUsers, null, 2));

const retrievedUserById = await Users.findById('6509cbf41f4159bd52089aa8');
console.log(JSON.stringify(retrievedUserById, null, 2));

const deletedUser = await Users.deleteOne({ email: 'johndoe@example.com' });
console.log(JSON.stringify(deletedUser, null, 2));

const retrievedUsersByCriteria = await Users.find({
  email: 'johndoe@example.com',
});*/
const products: Product[] = [
{
  name: 'Earthen Bottle',
  price: 39.95,
  img: '/img/ecommerce-images/image-card-01.jpg',
  description: 'What a bottle!',
},
{
  name: 'Nomad Tumbler',
  price: 39.95,
  img: '/img/ecommerce-images/image-card-02.jpg',
  description: 'Yet another item',
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




/*const retrievedUserByCriteria = await Users.findOne({
email: 'johndoe@example.com',
});
console.log(JSON.stringify(retrievedUserByCriteria, null, 2));

retrievedUserByCriteria.name = 'Foo';
await retrievedUserByCriteria.save();

const retrievedNewUserByCriteria = await Users.findOne({
email: 'johndoe@example.com',
});


//console.log(JSON.stringify(res, null, 2));
console.log(JSON.stringify(retrievedNewUserByCriteria, null, 2));*/
await conn.disconnect();

}
seed().catch(console.error);