import React from 'react';
import styled from 'styled-components';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stars from './Stars';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';

const ProductsContainer = ({ title, image, price, rates, id }) => {
  return (
    <>
      <Wrapper>
        <Link to={`/shop/${id}`}>
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>

          <Title>{title}</Title>
        </Link>
        <InfoContainer>
          <RatesContainer>
            <Stars stars={rates} />
          </RatesContainer>
        </InfoContainer>

        <PriceContainer>
          <Link to={`/shop/${id}`}>
            <Button>
              Buy <AddShoppingCartIcon style={{ fontSize: '18px' }} />
            </Button>
          </Link>
          <Price>${price}</Price>
        </PriceContainer>
      </Wrapper>
    </>
  );
};

export default ProductsContainer;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 16px;
  margin-right: 2rem;
  padding: 0px 1rem;
  width: 100%;
  margin-bottom: 2rem;
  ${mobile({ minWidth: '350px' })}
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  width: 50%;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  color: var(--clr-primary);
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
  font-weight: 500;
  text-decoration: underline;
`;
const RatesContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--clr-primary);
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 4rem;
  background: none;
  border: 1px solid lightgray;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: var(--clr-mocha-hover);
  }
  padding: 0.4rem 0.4rem;
`;
const Price = styled.p`
  color: var(--clr-red);
  font-size: 22px;
`;
