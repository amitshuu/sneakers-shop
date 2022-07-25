import React from 'react';
import { useSelector } from 'react-redux';
import { GridView, ListView } from '../components';
import styled from 'styled-components';

const ProductList = ({ data, filteredProducts }) => {
  const { gridView } = useSelector((state) => state.filter);

  return (
    <>
      {gridView ? (
        <GridView data={filteredProducts} />
      ) : (
        <ListView filteredProducts={filteredProducts} data={data} />
      )}
    </>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
