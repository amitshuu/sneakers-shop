import React from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { addSize } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';

const SizeChart = () => {
  const filters = useSelector((state) => state.filter);
  const { menuState, handleToggle } = useToggle();
  const dispatch = useDispatch();

  const { size } = filters;
  let sizes = [];

  const handleSizeClick = (size) => {
    dispatch(addSize(size));
  };

  for (let i = 3; i <= 12.5; i += 0.5) {
    sizes.push(i);
  }

  return (
    <Container>
      <SizeTitle>
        Size
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
      </SizeTitle>
      {menuState && (
        <Wrapper>
          <SizeContainer>
            {sizes.map((item) => (
              <Size
                disabled={size === item}
                className={size === item ? 'disabled' : ''}
                onClick={() => handleSizeClick(item)}
                key={item}
              >
                {item}
              </Size>
            ))}
          </SizeContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default SizeChart;

const Container = styled.div`
  border-bottom: 2px solid var(--clr-border);
  .disabled {
    background-color: var(--clr-mocha);
    color: white;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--clr-mocha);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  margin-top: 20px;
  overflow-y: scroll;
`;

const SizeContainer = styled.div`
  flex-wrap: wrap;
  display: flex;

  height: 22vh;
  padding-right: 2rem;
`;

const SizeTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 500;
`;

const Size = styled.button`
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  flex: 15%;
  border: 2px solid var(--clr-gray);
  border-radius: 8px;
  margin: 0.5rem;
  padding: 7px 0px;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  color: var(--clr-gray);
  &:hover {
    background-color: var(--clr-mocha-2);
    color: #fff;
  }
`;
