import React from 'react';
import styled from 'styled-components';
import Stars from './Stars';

const PurchasedDate = () => {
  return (
    <Wrapper>
      <SaleInfo>Sale Info:</SaleInfo>
      <Info>
        Date Purchased: <span>{}</span>
      </Info>
      <Info>
        Day: <span>Sunday</span>
      </Info>
      <RatingContainer>
        <Rate>Rate this item</Rate>
        <Stars />
      </RatingContainer>
    </Wrapper>
  );
};

export default PurchasedDate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--clr-border);
  width: 60%;
  padding-top: 1rem;
  padding-left: 1rem;
`;

const SaleInfo = styled.h4``;
const Info = styled.div`
  display: flex;
  width: 85%;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const RatingContainer = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
`;

const Rate = styled.h3`
  font-weight: 600;
`;
