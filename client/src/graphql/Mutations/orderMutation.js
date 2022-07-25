import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation {
    createOrder {
      purchasedBy
      datePurchased
      orderProducts {
        productId
        size
        productPrice
      }
    }
  }
`;

export { CREATE_ORDER };
