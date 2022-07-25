import Cart from '../../models/Cart.js';
import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import { auth } from '../../utils/auth.js';
import { UserInputError } from 'apollo-server';

export const order = {
  Query: {
    getUserOrders: async (_, {}, context) => {
      const userAuth = await auth(context);
      const order = await Order.find({ purchasedBy: userAuth._id });

      if (!order) {
        throw new UserInputError('No order available');
      }
      return order;
    },
  },

  Mutation: {
    createOrder: async (_, {}, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });
      const products = await Product.find({
        _id: cart.cartProducts.map((c) => c.productId),
      });
      const topPicksBrands = products.map((p) => p.brand);

      for (const cartInfo of cart.cartProducts) {
        for (const product of products) {
          product.size = product.size.filter((size) => size !== +cartInfo.size);
          await product.save();
        }
      }
      if (cart.cartProducts.length < 1) {
        throw new UserInputError('No available order!');
      }
      userAuth.topPicks.push(...topPicksBrands);

      await userAuth.save();
      const newOrder = new Order({
        orderProducts: cart.cartProducts,
        purchasedBy: userAuth._id,
        datePurchased: new Date(),
      });
      await newOrder.save();
      return newOrder;
    },
  },
};
