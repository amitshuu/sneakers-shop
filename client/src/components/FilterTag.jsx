import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';

const FilterTag = ({ label, clearIcon, removeFilter }) => {
  return (
    <Wrapper>
      <Tag>
        {label}
        {clearIcon && <ClearIcon onClick={removeFilter} className='icon' />}
      </Tag>
    </Wrapper>
  );
};

export default FilterTag;

const Wrapper = styled.div``;

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
