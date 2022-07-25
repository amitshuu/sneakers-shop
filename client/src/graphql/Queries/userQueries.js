import { gql } from '@apollo/client';

const GET_USER_DETAILS = gql`
  query {
    getUserById {
      id
      username
      email
      firstName
      lastName
      isAdmin
      password
      shoeSize
      token
      topPicks
      shippingAddress {
        city
        postalCode
        country
        address
        phoneNumber
      }
    }
  }
`;

const GET_USER_TOP_PICKS = gql`
  query {
    getTopPicksProducts {
      image
      id
      rates
      price
      title
    }
  }
`;

const GET_DEFAULT_TOP_PICKS = gql`
  query {
    getDefaultTopPicks {
      id
      image
      rates
      price
      title
    }
  }
`;
export { GET_USER_DETAILS, GET_USER_TOP_PICKS, GET_DEFAULT_TOP_PICKS };
