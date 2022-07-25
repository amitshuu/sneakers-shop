import React, { useState } from 'react';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import Stars from './Stars';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import { useSelector } from 'react-redux';
import { DELETE_FROM_CART } from '../graphql/Mutations/cartMutations';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import MuiError from '../assets/mui/Alert';
import { mobile } from '../responsive';

const CartItems = ({ productId, size, id, orderPage, historyPage }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const { loading } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId },
    onCompleted({ getProductById }) {
      setCartItems(getProductById);
    },
  });

  const [deleteProduct, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_FROM_CART, {
      variables: { id },
      refetchQueries: [
        {
          query: GET_USER_CART,
          variables: { userId: userInfo.id },
          awaitRefetchQueries: true,
        },
      ],
    });

  const { image, title, model, price } = cartItems;

  return (
    <>
      <Container>
        <Wrapper orderPage={orderPage}>
          {loading ? (
            <Loading />
          ) : deleteLoading ? (
            <Loading />
          ) : deleteError ? (
            <MuiError
              type='error'
              value={'Something went wrong.. Please try again later'}
            />
          ) : (
            <ItemContainer>
              <ImageContainer>
                <Image src={image} />
              </ImageContainer>
              <InfoContainer>
                <Title>{title} </Title>
                <Model>{model}</Model>
                <Size>{`Sizes: ${size} US`}</Size>

                <Qty>{`Qty: ${size?.length}`}</Qty>
              </InfoContainer>
            </ItemContainer>
          )}
          {historyPage ? (
            <SaleInfo>
              <h4>Sale Info:</h4>
              <div className='info'>
                Date Purchased: <span>21/11/2021</span>
              </div>
              <div className='info'>
                Day: <span>Sunday</span>
              </div>
              <div className='rating-container'>
                <h3>Rate this item</h3>
                <Stars />
              </div>
            </SaleInfo>
          ) : (
            <PriceContainer>
              {loading ? (
                ''
              ) : deleteLoading ? (
                ''
              ) : deleteError ? (
                ''
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'column',
                  }}
                >
                  {orderPage ? (
                    ''
                  ) : (
                    <ClearIcon
                      className='icon'
                      onClick={() => deleteProduct()}
                    />
                  )}
                  <Price>${price * size?.length}</Price>
                </div>
              )}
            </PriceContainer>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default CartItems;

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  background-color: #fff;
  width: 100%;
  margin: 2rem 0 0;
  border-radius: 1rem;
`;
const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 290px;
  justify-content: space-evenly;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
  width: 180px;
  ${mobile({ width: '120px', marginTop: '1rem' })}
`;
const InfoContainer = styled.div`
  width: ${(props) => (props.historyPage ? '60%' : '40%')};
  margin-top: 1rem;
`;

const Title = styled.h4``;
const Model = styled.p`
  font-size: 14px;
  color: var(--clr-gray);
  margin-top: -1rem;
`;
const Size = styled.p`
  font-size: 14px;
  font-weight: 500;
  /* color: var(--clr-gray); */
  margin-top: 0.5rem;
`;

const Qty = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const Price = styled.h2`
  color: var(--clr-red);
  align-self: end;
  margin-right: 2rem;
  ${mobile({
    margin: '0.5rem',
    padding: '0',
  })}
`;

const PriceContainer = styled.div`
  display: ${(props) => (props.historyPage ? 'none' : 'flex')};
  width: 10%;
  margin-top: 0.5rem;
  flex-direction: column;
  justify-content: space-around;

  .icon {
    transition: all 0.3s;
    color: var(--clr-gray);
    cursor: pointer;
    font-size: 22px;
    &:hover {
      color: red;
    }
  }
`;

const SaleInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--clr-border);
  width: 60%;
  padding-top: 1rem;
  padding-left: 1rem;
  h4 {
  }
  .info {
    display: flex;
    width: 85%;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .rating-container {
    display: flex;
    width: 95%;
    justify-content: space-between;
    h3 {
      font-weight: 600;
    }
  }
`;
