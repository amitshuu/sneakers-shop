import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearFilters,
  removeBrandFilter,
  removePriceFilter,
  removeSizeFilter,
  removeColorFilter,
} from '../features/filterSlice';
import FilterTag from './FilterTag';
const FilterTags = () => {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { size, brand, price, color } = filters;

  const clearFiltersHandler = () => {
    dispatch(clearFilters());
  };

  return (
    <>
      <Wrapper>
        {size !== null ? (
          <FilterTag
            removeFilter={() => dispatch(removeSizeFilter())}
            clearIcon
            label={`Size: ${size}`}
          />
        ) : null}
        {brand !== null ? (
          <FilterTag
            removeFilter={() => dispatch(removeBrandFilter())}
            clearIcon
            label={`Brand: ${brand}`}
          />
        ) : null}
        {color !== null ? (
          <FilterTag
            removeFilter={() => dispatch(removeColorFilter())}
            clearIcon
            label={`Color: ${color}`}
          />
        ) : null}
        {price.length > 0 ? (
          <FilterTag
            removeFilter={() => dispatch(removePriceFilter())}
            clearIcon
            label={`Price: ${price[0]}~${price[1]}`}
          />
        ) : null}
        {size || brand || color || price.length > 0 ? (
          <ClearAll onClick={clearFiltersHandler}>Clear All</ClearAll>
        ) : null}
      </Wrapper>
    </>
  );
};

export default FilterTags;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Tag = styled.div`
  display: flex;
  height: 25px;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  color: var(--clr-gray);
  font-size: 14px;

  .icon {
    font-size: 12px;
    background: none;
    outline: none;
    color: var(--clr-gray);
    border: none;
    display: flex;
    margin-left: 10px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

const ClearAll = styled.button`
  display: flex;
  color: var(--clr-gray);
  cursor: pointer;
  font-size: 14px;
  height: 20px;
  background: transparent;
  border: none;
  &:hover {
    color: var(--clr-gray-2);
  }
`;
