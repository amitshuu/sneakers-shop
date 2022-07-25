import React from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import { addColor } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';
const ColorChart = () => {
  const dispatch = useDispatch();
  const { data } = useQuery(GET_PRODUCTS);
  const { menuState, handleToggle } = useToggle();

  const shoeColors = new Set(
    data?.getProducts.reduce((res, { color }) => [...res, ...color], [])
  );

  const handleClick = (color) => {
    dispatch(addColor(color));
  };

  return (
    <Wrapper>
      <ColorTitle>
        Colors
        {menuState ? (
          <ArrowDropUpIcon
            style={{ cursor: 'pointer' }}
            onClick={handleToggle}
          />
        ) : (
          <ArrowDropDownIcon
            style={{ cursor: 'pointer' }}
            onClick={handleToggle}
          />
        )}
      </ColorTitle>
      {menuState && (
        <Container>
          <ColorContainer>
            {[...shoeColors].map((c, index) => (
              <Color color={c} key={index} onClick={() => handleClick(c)} />
            ))}
          </ColorContainer>
        </Container>
      )}
    </Wrapper>
  );
};

export default ColorChart;

const Wrapper = styled.div`
  border-bottom: 2px solid var(--clr-border);
`;

const Container = styled.div`
  width: 100%;
`;

const ColorContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  padding-bottom: 1rem;
`;

const ColorTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`;

const Color = styled.button`
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  margin-right: 10px;
  margin-top: 1rem;
  cursor: pointer;
`;
