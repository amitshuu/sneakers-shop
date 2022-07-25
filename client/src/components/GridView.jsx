import React from 'react';
import ProductsContainer from './ProductsContainer';
import styled from 'styled-components';
import { mobile } from '../responsive';
const GridView = ({ data }) => {
  return (
    <Wrapper>
      {data &&
        data.map((product) => (
          <Product key={product.id}>
            <ProductsContainer {...product} />
          </Product>
        ))}
    </Wrapper>
  );
};

export default GridView;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin-left: 3rem;
  margin-top: 1.5rem;
  ${mobile({ display: 'flex', flexDirection: 'column', margin: '1rem auto' })}
`;

const Product = styled.div`
  display: flex;
`;
