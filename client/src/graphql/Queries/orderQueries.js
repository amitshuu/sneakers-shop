import { gql } from '@apollo/client';

const GET_USER_ORDER = gql`
  query {
    getUserOrders {
      id
      purchasedBy
      datePurchased
      orderProducts {
        productId
        productPrice
        size
      }
    }
  }
`;

export { GET_USER_ORDER };
