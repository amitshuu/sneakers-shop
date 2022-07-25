import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    getProducts {
      id
      title
      image
      brand
      model
      price
      inStock
      rates
      title
      color
      size
    }
  }
`;

const GET_PRODUCTS_PAGINATION = gql`
  query ($page: Int, $productsFiltersInput: ProductsFiltersInput) {
    getProductsPagination(
      page: $page
      productsFiltersInput: $productsFiltersInput
    ) {
      numOfPages
      products {
        id
        title
        brand
        model
        image
        color
        price
        inStock
        rates
        numReviews
        reviews {
          rating
        }
        size
      }
    }
  }
`;

const GET_SINGLE_PRODUCT = gql`
  query ($productId: ID!) {
    getProductById(productId: $productId) {
      id
      title
      image
      brand
      inStock
      model
      price
      rates
      size
      color
    }
  }
`;

const GET_PRODUCTS_BY_TITLE = gql`
  query ($searchQuery: String) {
    getProductsByTitle(searchQuery: $searchQuery) {
      title
      id
    }
  }
`;

const GET_PRODUCT_BY_ID = gql`
  query ($productId: ID!) {
    getProductById(productId: $productId) {
      id
      title
      image
      brand
      color
      inStock
      model
      price
      rates
      size
      color
    }
  }
`;

export {
  GET_SINGLE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_PAGINATION,
  GET_PRODUCTS_BY_TITLE,
  GET_PRODUCT_BY_ID,
};
