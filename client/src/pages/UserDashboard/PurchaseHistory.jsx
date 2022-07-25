import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OrderComponent from '../../components/OrderComponent';
import { useQuery } from '@apollo/client';
import { GET_USER_ORDER } from '../../graphql/Queries/orderQueries';
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';

const PurchaseHistory = () => {
  const { loading, error, data } = useQuery(GET_USER_ORDER);

  const navigate = useNavigate();

  const ordersLength = data?.getUserOrders.length;

  useEffect(() => {
    if (ordersLength < 1 && !loading) {
      navigate('/shop');
    }
  }, [ordersLength, navigate, loading]);

  return (
    <>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : error ? (
          <MuiError type='error' value={'Please try again later..'} />
        ) : (
          <div>
            {data &&
              data?.getUserOrders?.map((c, index) => {
                return <OrderComponent key={index} {...c} />;
              })}
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default PurchaseHistory;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem 3rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75vh;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
`;
