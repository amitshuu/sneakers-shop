import { gql } from '@apollo/client';

const GET_USER_CART = gql`
  query {
    getUserCart {
      userId
      cartProducts {
        productId
        size
        productPrice
        id
      }
    }
  }
`;
export { GET_USER_CART };
