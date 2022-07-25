import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  BrandChart,
  ColorChart,
  Navbar,
  PriceChart,
  ProductList,
  ShopHeader,
  SizeChart,
} from '../components';
import { GET_PRODUCTS_PAGINATION } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { PaginationMUI } from '../assets/mui/PaginationMUI';
import { mobile } from '../responsive';

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);

  const { size, brand, price, sort, color } = useSelector(
    (state) => state.filter
  );

  const getPage = (value) => {
    setPage(value);
  };

  const { data, loading, error } = useQuery(GET_PRODUCTS_PAGINATION, {
    variables: {
      page,
      productsFiltersInput: {
        size,
        color,
        brand,
        price,
        sort,
        rates: filteredProducts?.rates,
      },
    },
    fetchPolicy: 'network-only',
  });

  const products = data?.getProductsPagination?.products;
  const numOfPages = data?.getProductsPagination?.numOfPages;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (size || brand || color || price.length > 0) {
      setPage(1);
    }
  }, [size, brand, color, price.length]);

  return (
    <div className='section-center'>
      <Navbar />
      <Container>
        <FilterWrapper>
          <h4>Filter</h4>
          <SizeChart />
          <BrandChart />
          <PriceChart />
          <ColorChart />
        </FilterWrapper>
        <ShopWrapper>
          <ShopHeader filteredProducts={filteredProducts} />
          {loading ? (
            <Loading />
          ) : error ? (
            <MuiError
              width='40%'
              type='warning'
              alignItems='center'
              value={'Something went wrong.. Please try again later.'}
            />
          ) : !loading && filteredProducts?.length < 1 ? (
            <MuiError
              width='40%'
              type='warning'
              alignItems='center'
              value={'No product is matching your result'}
            />
          ) : (
            <div>
              <ProductList
                data={data}
                filteredProducts={filteredProducts}
                error={error}
              />
            </div>
          )}
        </ShopWrapper>
      </Container>
      <PaginationContainer>
        <PaginationMUI page={page} getPage={getPage} numOfPages={numOfPages} />
      </PaginationContainer>
    </div>
  );
};

export default ShopPage;

const Container = styled.div`
  width: 100%;
  min-width: 250px;
  display: flex;
  ${mobile({ flexDirection: 'column' })}
`;
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  ${mobile({ minWidth: '350px' })}
  min-width: 250px;
`;

const ShopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 10rem;
  ${mobile({ margin: '0 auto' })}
`;
