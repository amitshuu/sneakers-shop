import React from 'react';
import styled from 'styled-components';
import HistoryItems from './HistoryItems';

const OrderComponent = ({ datePurchased, orderProducts, id }) => {
  return (
    <>
      <Wrapper>
        <OrderTitle>ORDER ({id}) :</OrderTitle>
        {orderProducts.flatMap((c, index) => {
          return (
            <HistoryItems key={index} {...c} datePurchased={datePurchased} />
          );
        })}
      </Wrapper>
    </>
  );
};

export default OrderComponent;

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const OrderTitle = styled.h2`
  color: var(--clr-primary-2);
`;
