import React from 'react';
import styled from 'styled-components';
import Loading from '../assets/mui/Loading';
import { Link } from 'react-router-dom';

const OrderSum = ({ cartProducts, loading, link, onClick, orderPage }) => {
  const deliveryTax = 10.0;
  const salesTax = 5.0;

  const originalPriceCalculated = cartProducts?.reduce(
    (acc, val) => Number(acc) + Number(val.productPrice),
    [0]
  );

  const totalPriceCalculated =
    originalPriceCalculated &&
    Number(originalPriceCalculated) + Number(deliveryTax) + Number(salesTax);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <Container
          style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <Title>Order Summary</Title>
          <Info>
            Original price
            <span>${parseFloat(originalPriceCalculated)?.toFixed(2)}</span>
          </Info>
          <Info>
            3 Items
            <span>${parseFloat(originalPriceCalculated)?.toFixed(2)}</span>
          </Info>
          <Info>
            Delivery<span>${deliveryTax.toFixed(2)}</span>
          </Info>
          <Info>
            Sales tax<span>${salesTax.toFixed(2)}</span>
          </Info>
          <hr />
          <TotalContainer>
            <TotalPrice>Total</TotalPrice>
            <Price>${parseFloat(totalPriceCalculated)?.toFixed(2)}</Price>
          </TotalContainer>
          <Link to='/order'>
            <Button onClick={onClick}>
              {orderPage ? 'Complete Order' : 'Proceed To Checkout'}
            </Button>
          </Link>
        </Container>
      )}
    </Wrapper>
  );
};

export default OrderSum;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  hr {
    margin-top: 3rem;
    width: 100%;
    border: 2px solid var(--clr-border);
    border-top: none;
    border-left: none;
    border-right: none;
  }
`;
const Container = styled.div``;
const Title = styled.h4``;
const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 0.7rem;
  span {
    font-weight: 600;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const TotalPrice = styled.h2``;
const Price = styled.h1`
  color: var(--clr-red);
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
  background-color: var(--clr-primary);
  border-radius: 12px;
  padding: 12px;
  transition: all 0.3s;
  width: 100%;
  &:hover {
    background-color: var(--clr-primary-2);
  }
`;
