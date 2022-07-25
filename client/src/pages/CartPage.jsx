import { useQuery } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loading from '../assets/mui/Loading';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';

import { Navbar, OrderSum, TopPicks } from '../components';
import CartItems from '../components/CartItems';
import MuiError from '../assets/mui/Alert';
import { mobile } from '../responsive';

const CartPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { loading, data, error } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });
  const cartProducts = data?.getUserCart.cartProducts;
  const cartLength = cartProducts?.length;

  return (
    <div className='section-center'>
      <Navbar />
      <Wrapper>
        {loading ? (
          <Loading />
        ) : !cartLength ? (
          <MuiError fontSize={'25px'} type='warning' className='warning'>
            Your cart is empty,
            <Link
              style={{ textDecoration: 'underline', margin: '0.2rem' }}
              to='/shop'
            >
              Fill it
            </Link>
          </MuiError>
        ) : error ? (
          <MuiError
            type='error'
            value={'Something went wrong.. Try again later.'}
          />
        ) : (
          <div className='container'>
            <Container>
              <Header>
                <Title>Your bag</Title>
                <span style={{ color: 'var(--clr-gray)' }}>
                  Totals: <TotalItems>{cartLength} items </TotalItems>
                </span>
              </Header>
              <CartItemsContainer>
                {cartProducts?.map((cartItem, index) => (
                  <CartItems key={index} {...cartItem} />
                ))}
              </CartItemsContainer>
            </Container>
            <OrderSummary>
              <OrderSum cartProducts={cartProducts} loading={loading} />
            </OrderSummary>
          </div>
        )}
      </Wrapper>

      <hr className='hr' />
      <TopPicks cartPage />
    </div>
  );
};

export default CartPage;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .container {
    display: flex;
    width: 100%;
    ${mobile({
      display: 'flex',
      flexDirection: 'column',
    })}
  }
`;

const Header = styled.div``;
const Title = styled.h2`
  color: var(--clr-primary);
  font-size: 30px;
`;
const TotalItems = styled.span`
  font-weight: 500;
  color: black;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
  margin-top: 1rem;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  ${mobile({
    margin: '0 auto',
    padding: '0',
  })}
`;

const OrderSummary = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  padding: 6rem;
  ${mobile({
    display: 'flex',
    padding: '0',
    justifyContent: 'center',
    width: '100%',
  })}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;
