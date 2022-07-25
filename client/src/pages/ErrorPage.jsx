import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const ErrorPage = () => {
  return (
    <Wrapper>
      <h1>No page found!</h1>
      <Button>
        <Link style={{ color: 'white' }} to='/'>
          Go back
        </Link>
      </Button>
    </Wrapper>
  );
};

export default ErrorPage;

const Wrapper = styled.div`
  display: flex;
  height: 80vh;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  color: white;
  border-radius: 5px;
  padding: 0.375rem 0.75rem;
  letter-spacing: 1.5px;
  font-size: 14px;
  transition: all 0.3s;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;
