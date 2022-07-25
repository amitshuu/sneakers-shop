import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },

  cartProducts: [
    {
      productId: {
        type: String,
        required: true,
      },
      size: {
        type: [Number],
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model('Cart', cartSchema);
