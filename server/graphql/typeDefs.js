import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    isAdmin: Boolean!
    token: String!
    shoeSize: Float
    shippingAddress: Shipping!
    createdAt: String!
    updatedAt: String!
    currentPassword: String
    topPicks: [String]
  }
  type Query {
    getUserById: User!
    getProducts(page: Int): [Product!]!
    getProductsByTitle(searchQuery: String): [Product!]!
    getProductsPagination(
      page: Int
      productsFiltersInput: ProductsFiltersInput
    ): ProductPagination!
    getProductById(productId: ID!): Product!
    getTopPicksProducts: [Product]!
    getDefaultTopPicks: [Product]!
    getUserCart: Cart!
    getUserOrders: [Order]!
  }

  input ProductsFiltersInput {
    brand: String
    size: Float
    color: String
    price: [Int]
    sort: String
    rates: Float
  }

  type Shipping {
    city: String!
    postalCode: String!
    country: String!
    address: String!
    phoneNumber: String!
  }

  type ProductPagination {
    products: [Product!]!
    numOfPages: Int
  }

  type Product {
    id: ID!
    title: String!
    brand: String!
    model: String!
    price: Float!
    image: String
    rates: Float!
    numReviews: Int!
    userReviews: [ID!]
    reviews: [Reviews]
    color: [String]!
    inStock: Boolean!
    size: [Float!]!
    totalPages: Int
  }

  type TopPicksProducts {
    id: ID!
    title: String!
    rates: Int!
    image: String!
    price: Float!
  }

  type Reviews {
    userId: ID!
    rating: Float!
  }

  type Cart {
    userId: ID!
    cartProducts: [CartProducts]!
  }

  type Order {
    purchasedBy: ID!
    orderProducts: [CartProducts!]!
    datePurchased: Date
    id: ID
  }

  type CartProducts {
    productId: String!
    size: [Float!]!
    productPrice: Int!
    id: ID
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmedPassword: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    firstName: String
    lastName: String
    shoeSize: Float
    password: String
    currentPassword: String
  }

  input UpdateShippingInput {
    city: String
    postalCode: String
    country: String
    phoneNumber: String
    address: String
  }

  input AddProductInput {
    title: String!
    model: String!
    brand: String!
    image: String!
    price: String
    color: String
    size: String
  }
  input UpdateProductInput {
    productId: ID
    title: String
    model: String
    brand: String
    image: String
    price: String
    color: String
    size: String
  }

  type Mutation {
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    addProduct(addProductInput: AddProductInput): Product!
    updateProduct(updateProductInput: UpdateProductInput): Product!
    updateUser(updateUserInput: UpdateUserInput): User!
    updateShipping(updateShippingInput: UpdateShippingInput): User!
    addToCart(
      userId: ID!
      productId: ID!
      size: [Float]!
      productPrice: Int!
    ): Cart!
    deleteProductFromCart(id: ID!): Cart!
    createProductReview(productId: ID!, userRate: Int!): Product!
    createOrder: Order!
  }
`;
