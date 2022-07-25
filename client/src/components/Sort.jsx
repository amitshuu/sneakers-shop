import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addSort } from '../features/filterSlice';

const Sort = () => {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    dispatch(addSort(e.target.value));
  };

  return (
    <Form>
      <Label>Sort by</Label>
      <Select onChange={handleSelect}>
        <Option>Sort</Option>
        <Option value='price-lowest'>Price (Lowest)</Option>
        <Option value='price-highest'>Price (Highest)</Option>
        <Option value='top-rated'>Top rated</Option>
      </Select>
    </Form>
  );
};

export default Sort;

const Form = styled.form``;
const Label = styled.label``;
const Select = styled.select`
  border: 1px solid var(--clr-gray);
  border-radius: 16px;
  padding: 4px;
  margin-left: 10px;
  background: transparent;
  margin-bottom: 1rem;
`;
const Option = styled.option`
  font-size: 16px;
  margin-bottom: 1rem;
  padding: 20px;
`;
