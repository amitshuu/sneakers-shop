import mongoose from 'mongoose';
import Cart from './Cart.js';
const orderSchema = mongoose.Schema({
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  orderProducts: {
    type: Array,
    required: true,
  },
  datePurchased: {
    type: Date,
  },
});

orderSchema.pre('save', async function () {
  const cart = await Cart.findOne({ userId: this.purchasedBy });
  if (cart) {
    cart.cartProducts = [];
  }

  await cart.save();
});

export default mongoose.model('Order', orderSchema);
