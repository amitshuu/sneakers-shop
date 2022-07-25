import React from 'react';
import styled from 'styled-components';
import FilterTags from './FilterTags';
import Sort from './Sort';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGridView, toggleListView } from '../features/filterSlice';
import { mobile } from '../responsive';

const ShopHeader = ({ filteredProducts }) => {
  const dispatch = useDispatch();
  const { gridView, listView } = useSelector((state) => state.filter);

  const toggleGrid = () => {
    dispatch(toggleGridView());
  };

  const toggleList = () => {
    dispatch(toggleListView());
  };

  return (
    <Wrapper>
      <Title>SNEAKERS SHOP</Title>
      <SortContainer>
        <TotalSneakers>
          {filteredProducts && filteredProducts.length + ' sneakers'}
        </TotalSneakers>
        <Sort />
      </SortContainer>
      <ViewIcons>
        <GridViewIcon
          onClick={toggleGrid}
          className={`icon ${gridView ? 'active' : ''}`}
        />
        <ViewListIcon
          onClick={toggleList}
          className={`icon ${listView ? 'active' : ''}`}
        />
      </ViewIcons>

      <FilterTags />
    </Wrapper>
  );
};

export default ShopHeader;

const Wrapper = styled.div`
  width: 90%;
  min-width: 350px;
  margin-left: 3rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  ${mobile({ margin: '2rem 0' })}
`;
const Title = styled.h1`
  color: var(--clr-primary);
  font-size: 36px;
`;
const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin: -1rem 0px;
  margin-bottom: 1rem;
  ${mobile({ margin: '0.5rem 0' })}
`;

const ViewIcons = styled.div`
  display: flex;
  .icon {
    margin-right: 0.5rem;
    border: 1px solid black;
    height: 25px;
    width: 25px;
    padding: 1px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
  .active {
    background-color: var(--clr-mocha-2);
    color: white;
  }
  ${mobile({ display: 'none' })}
`;

const TotalSneakers = styled.span``;
