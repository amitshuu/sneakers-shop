import Product from '../../models/Product.js';
import { UserInputError } from 'apollo-server';
import { auth } from '../../utils/auth.js';

export const products = {
  Query: {
    getProducts: async () => {
      const products = await Product.find({});

      return products;
    },
    getProductsPagination: async (
      _,
      { page, productsFiltersInput: { size, brand, price, color, sort, rates } }
    ) => {
      const query = {};
      if (size) {
        query.size = size;
      }
      if (brand) {
        query.brand = brand;
      }
      if (color) {
        query.color = color;
      }
      if (price.length > 0) {
        query.price = { $gte: price[0], $lte: price[1] };
      }
      let result = Product.find(query);
      if (sort === 'price-lowest') {
        result = result.sort('price');
      }
      if (sort === 'price-highest') {
        result = result.sort('-price');
      }
      if (sort === 'top-rated') {
        result = result.sort('-rates');
      }

      const skip = (page - 1) * 12;
      const limit = 12;
      const totalItems = await Product.countDocuments(query);
      const pages = Math.ceil(totalItems / limit);
      result = result.skip(skip).limit(limit);

      const products = await result;

      return { products, numOfPages: pages };
    },

    getProductById: async (_, { productId }) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new UserInputError('Sorry, no product found.');
      }
      return product;
    },
    getProductsByTitle: async (_, { searchQuery }) => {
      if (!searchQuery) return;

      const products = await Product.find({
        title: { $regex: searchQuery, $options: 'i' },
      });

      return products;
    },
    getTopPicksProducts: async (_, {}, context) => {
      const userAuth = await auth(context);
      const userTopPicks = userAuth.topPicks;

      const topPicksProducts = await Product.find({ brand: userTopPicks });
      const defaultPicks = await Product.find({ brand: 'Yeezy' });

      let topPicks;
      if (topPicksProducts.length < 4) {
        topPicks = defaultPicks.slice(0, 4);
      } else {
        topPicks = new Set([]);
        while (topPicks.size < 4) {
          topPicks.add(
            topPicksProducts[
              Math.floor(Math.random() * topPicksProducts.length)
            ]
          );
        }
      }

      const sortedTopPicks = Array.from(topPicks).sort(
        (a, b) => b.rates - a.rates
      );

      return sortedTopPicks;
    },
    getDefaultTopPicks: async (_, {}) => {
      const defaultPicks = await Product.find({ brand: 'Yeezy' });
      const topPicks = defaultPicks.slice(0, 4);
      return topPicks;
    },
  },
  Mutation: {
    addProduct: async (
      _,
      { addProductInput: { title, model, brand, color, price, size, image } },
      context
    ) => {
      const userAuth = await auth(context);

      if (!userAuth.isAdmin) {
        throw new UserInputError('Must be an admin to add an item');
      }

      if (!title || !model || !brand || !color || !price || !size || !image) {
        throw new UserInputError('One or more fields are missing');
      } else {
        size = size.split(',').map((str) => Number(str));
        color = color.split(',');
        price = Number(price);
      }

      const newProduct = await Product.create({
        title,
        model,
        brand,
        image,
        color,
        price,
        size,
      });

      return newProduct;
    },
    updateProduct: async (
      _,
      {
        updateProductInput: {
          productId,
          title,
          model,
          brand,
          color,
          price,
          size,
          image,
        },
      },
      context
    ) => {
      const userAuth = await auth(context);
      const product = await Product.findById(productId);
      if (!userAuth.isAdmin) {
        throw new UserInputError('Must be an admin to edit an item');
      }
      if (!product) {
        throw new UserInputError('Sorry, no product found.');
      }

      size = size.split(',').map((str) => Number(str));
      color = color.split(',');
      price = Number(price);

      product.title = title || product.title;
      product.model = model || product.model;
      product.brand = brand || product.brand;
      product.color = color || product.color;
      product.price = price || product.price;
      product.size = size || product.size;
      product.image = image || product.image;

      if (product.inStock === false && size) {
        product.inStock = true;
      }

      await product.save();

      return product;
    },
    createProductReview: async (_, { productId, userRate }, context) => {
      const userAuth = await auth(context);
      const product = await Product.findById(productId);
      const alreadyReviewd = product.reviews.find(
        (p) => p.userId.toString() === userAuth._id.toString()
      );

      if (!product) {
        throw new UserInputError('No product found!');
      }

      if (alreadyReviewd) {
        throw new UserInputError('You already reviewd this product');
      }

      const review = {
        userId: userAuth._id,
        rating: userRate,
      };

      product.reviews.push(review);

      product.rates =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      return product;
    },
  },
};
