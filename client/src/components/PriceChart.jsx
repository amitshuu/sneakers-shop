import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { PriceSlider } from '../assets/mui/PriceSlider';
import { useDispatch } from 'react-redux';
import { addPrice } from '../features/filterSlice';
import { useToggle } from '../utils/customHooks';
const PriceChart = () => {
  const [sliderValue, setSliderValue] = useState([199, 1000]);

  const dispatch = useDispatch();

  const { menuState, handleToggle } = useToggle();

  const handlePriceSlider = (e) => {
    setSliderValue(e.target.value);
  };

  const handleCommit = () => {
    dispatch(addPrice(sliderValue));
  };

  return (
    <Wrapper>
      <SizeTitle>
        Price
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
        <div>
          <PriceContainer>
            <Price>$0</Price>
            <Price>$1K</Price>
          </PriceContainer>
          <PriceSlider
            value={sliderValue}
            onChange={handlePriceSlider}
            onChangeCommitted={handleCommit}
          />
          <InputContainer>
            From
            <PriceInput value={sliderValue[0]} readOnly />
            To
            <PriceInput value={sliderValue[1]} readOnly />
          </InputContainer>
        </div>
      )}
    </Wrapper>
  );
};

export default PriceChart;

const Wrapper = styled.div`
  border-bottom: 2px solid var(--clr-border);
`;

const SizeTitle = styled.h4`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;
  color: var(--clr-gray-2);
  font-size: 16px;
  align-items: center;
`;
const PriceInput = styled.input`
  width: 25%;
  border-radius: 10px;
  border: 1px solid black;
  padding: 5px;
`;
