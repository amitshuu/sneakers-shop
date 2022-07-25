import mongoose from 'mongoose';

const sizeEnum = [
  3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
  12, 12.5,
];

const reviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: [Number],
    enum: sizeEnum,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rates: {
    type: Number,
    default: 1,
  },
  numReviews: {
    type: Number,
    default: 1,
  },
  reviews: [reviewSchema],
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});
productSchema.pre('save', async function () {
  if (this.size.length < 1) {
    this.inStock = false;
  }
});

export default mongoose.model('Product', productSchema);
