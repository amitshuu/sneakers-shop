import connectDB from './db/connect.js';
import User from './models/User.js';
import 'dotenv/config';
import { dummy_data } from './utils/dummy_data.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

const deleteUsers = async () => {
  await connectDB(process.env.MONGO_URI);
  try {
    await User.deleteMany();
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const insertProducts = async () => {
  connectDB(process.env.MONGO_URI);

  try {
    const sampleProducts = dummy_data.map((shoe) => {
      return shoe;
    });
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('Success');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteCarts = async () => {
  connectDB(process.env.MONGO_URI);

  try {
    await Cart.deleteMany();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const deleteOrders = async () => {
  connectDB(process.env.MONGO_URI);

  try {
    await Order.deleteMany();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// deleteUsers();
// deleteOrders();
// insertProducts();
