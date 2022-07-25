import React from 'react';
import { useSelector } from 'react-redux';
import { GridView, ListView } from '../components';

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
