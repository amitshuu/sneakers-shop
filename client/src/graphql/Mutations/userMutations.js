import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      createdAt
      id
      isAdmin
      shoeSize
      token
      username
      firstName
      lastName
      password
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

const REGISTER_USER = gql`
  mutation (
    $username: String!
    $password: String!
    $email: String!
    $confirmedPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        email: $email
        confirmedPassword: $confirmedPassword
      }
    ) {
      id
      email
      username
      password
      token
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

const UPDATE_USER = gql`
  mutation (
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $shoeSize: Float
    $password: String
    $currentPassword: String
  ) {
    updateUser(
      updateUserInput: {
        username: $username
        email: $email
        firstName: $firstName
        lastName: $lastName
        shoeSize: $shoeSize
        password: $password
        currentPassword: $currentPassword
      }
    ) {
      id
      username
      email
      firstName
      lastName
      shoeSize
      createdAt
      isAdmin
      token
      password
      currentPassword
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

const UPDATE_SHIPPING = gql`
  mutation (
    $city: String
    $address: String
    $country: String
    $phoneNumber: String
    $postalCode: String
  ) {
    updateShipping(
      updateShippingInput: {
        city: $city
        address: $address
        country: $country
        phoneNumber: $phoneNumber
        postalCode: $postalCode
      }
    ) {
      shippingAddress {
        address
        city
        country
        postalCode
      }
      id
      username
      email
      firstName
      lastName
      shoeSize
      createdAt
      isAdmin
      token
      password
      currentPassword
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, UPDATE_USER, UPDATE_SHIPPING };
