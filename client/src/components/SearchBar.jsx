import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { ClickAwayListener } from '@mui/material';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_TITLE } from '../graphql/Queries/productQueries';
const SearchBar = ({ display }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { data: searchData } = useQuery(GET_PRODUCTS_BY_TITLE, {
    variables: { searchQuery: searchValue },
    skip: !searchValue,
  });

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const closeDropDown = () => {
    setFilteredData([]);
    setSearchValue('');
  };

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData([]);
    } else {
      setFilteredData(searchData?.getProductsByTitle);
    }
  }, [searchData?.getProductsByTitle, searchValue]);

  return (
    <Wrapper display={display}>
      <InputContainer>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <Input
          type='text'
          value={searchValue}
          placeholder='Search for brand or model'
          data={searchData}
          onChange={onChange}
        />
      </InputContainer>
      {filteredData?.length > 0 && (
        <ClickAwayListener onClickAway={closeDropDown}>
          <ResultContainer>
            {filteredData?.map((value, index) => {
              return (
                <Result key={index}>
                  <Link to={`/shop/${value.id}`}>{value.title}</Link>
                </Result>
              );
            })}
          </ResultContainer>
        </ClickAwayListener>
      )}
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: ${(props) => (props.display ? 'flex' : 'none')};
`;
const InputContainer = styled.div`
  position: relative;
  display: flex;
`;
const IconContainer = styled.div`
  position: absolute;
  top: 15px;
  margin-left: 6px;
`;
const Input = styled.input`
  background-color: #f9f9f9;
  border: 1px solid grey;
  border-radius: 2px;
  font-size: 18px;
  padding: 15px 35px;
  width: 250px;
  &::placeholder {
    font-size: 15px;
  }
`;
const ResultContainer = styled.div`
  height: 20vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 250px;
  margin-top: 0.3rem;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 1;
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
`;
const Result = styled.p`
  margin-bottom: 20px;
  margin-left: 10px;
  font-size: 15px;
  display: flex;
  color: black;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: var(--clr-mocha-hover);
  }
`;
