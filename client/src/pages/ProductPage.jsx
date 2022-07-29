import React, { useState } from 'react';
import { Navbar, Stars } from '../components';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SINGLE_PRODUCT } from '../graphql/Queries/productQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ADD_TO_CART } from '../graphql/Mutations/cartMutations';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { mobile } from '../responsive';

const ProductPage = () => {
  const [product, setProduct] = useState('');
  const [shoeSize, setShoeSize] = useState([]);
  const [success, setSuccess] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = userInfo && userInfo.id;

  const { loading, data, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { productId: id },
    pollInterval: 1000,
  });

  const { data: cart } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });

  const [cartHandle, { loading: cartLoading, error: cartError }] = useMutation(
    ADD_TO_CART,
    {
      onCompleted() {
        setShoeSize([]);
        setSuccess(true);
      },
      variables: {
        userId,
        productId: id,
        size: shoeSize,
        productPrice: data?.getProductById.price,
      },
      refetchQueries: [
        {
          query: GET_USER_CART,
          variables: { userId },
          awaitRefetchQueries: true,
        },
      ],
    }
  );

  useEffect(() => {
    if (data) {
      setProduct(data?.getProductById);
    }
  }, [data, data?.getProductById, dispatch]);

  const { image, title, price, rates, inStock, brand, model, size } = product;

  const filteredCartProducts = cart?.getUserCart.cartProducts.filter(
    (c) => c.productId === id
  );
  const filteredSizesFromCart = filteredCartProducts?.map((c) => +c.size);
  const matchUserId = userId === cart?.getUserCart.userId;

  const onClickHandler = () => {
    if (!userId) {
      navigate(`/login?redirect=${id}`);
    } else {
      cartHandle();
    }
  };

  return (
    <Wrapper className='section-center'>
      <Navbar />
      <Link to='/shop'>
        <Button>BACK TO PRODUCTS</Button>
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <MuiError type='error' value={error.message} />
      ) : (
        <ProductContainer>
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>
          <InfoContainer>
            <Title>{title}</Title>
            <Stars stars={rates} />
            <Price>${price}</Price>
            <Lorem>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
              ullam est dicta vero sint aliquid ut accusamus, natus corporis
              quisquam obcaecati? Similique odio ex repellendus eaque, molestiae
              praesentium sunt nesciunt.
            </Lorem>
            <Info>
              Available:<span>{inStock ? 'In stock' : 'Out of stock'}</span>
            </Info>
            <Info>
              Brand:<span>{brand}</span>
            </Info>
            <Info>
              Model:<span>{model}</span>
            </Info>

            {inStock ? (
              <Info>
                Sizes:
                <SizeContainer>
                  {size?.map((size, index) => (
                    <SizeButton
                      className={size === shoeSize ? 'active' : ''}
                      onClick={(e) => setShoeSize(Number(e.target.value))}
                      value={size}
                      key={index}
                      disabled={
                        matchUserId &&
                        filteredCartProducts &&
                        filteredSizesFromCart?.includes(size)
                      }
                    >
                      {`${size} US`}
                    </SizeButton>
                  ))}
                </SizeContainer>
              </Info>
            ) : (
              ''
            )}
            <hr />
            <Button
              className={`${inStock ? '' : 'btn-disabled'}`}
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
              disabled={cartLoading || !inStock}
              onClick={onClickHandler}
            >
              {inStock ? 'ADD TO CART' : 'Out of stock'}
            </Button>

            {cartLoading ? (
              <Loading />
            ) : cartError ? (
              <MuiError type='error' width={'100%'} value={cartError.message} />
            ) : success ? (
              <MuiError type='success'>
                Item added to the cart!
                <Link
                  style={{ textDecoration: 'underline', margin: '0.5rem' }}
                  to='/cart'
                >
                  Visit cart
                </Link>
              </MuiError>
            ) : (
              ''
            )}
          </InfoContainer>
        </ProductContainer>
      )}
    </Wrapper>
  );
};

export default ProductPage;

const Wrapper = styled.div`
  min-height: 105vh;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .btn-disabled {
    background-color: #666565;
    &:hover {
      background-color: #666565;
    }
  }
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  color: white;
  border-radius: 5px;
  padding: 0.375rem 0.75rem;
  margin-top: 3rem;
  letter-spacing: 1.5px;
  font-size: 14px;
  transition: all 0.3s;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;

const ImageContainer = styled.div`
  flex: 2;
`;
const Image = styled.img`
  width: 450px;
  ${mobile({ width: '350px' })}
  margin-top: 4rem;
`;
const InfoContainer = styled.div`
  flex: 2;
  .active {
    border: 1px solid black;
  }
`;
const Title = styled.h1`
  color: var(--clr-primary);
  font-size: 36px;
  ${mobile({ fontSize: '24px' })}
`;

const Price = styled.p`
  color: var(--clr-mocha-2);
  font-size: 22px;
`;

const Lorem = styled.p`
  letter-spacing: 1px;
  line-height: 1.5rem;
  ${mobile({ marginBottom: '2rem' })}
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
  font-weight: 600;
  span {
    font-weight: 400;
  }
`;

const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const SizeButton = styled.button`
  background-color: transparent;
  outline: none;
  margin-left: 0.5rem;
  color: black;
  font-weight: 500;
  font-size: 16px;
  padding: 15px 20px;
  margin-bottom: 10px;
  border: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  :hover {
    border: 1px solid black;
  }
  :disabled {
    color: #b6b6b6;
    border: none;
    pointer-events: none;
  }

  :checked {
    border: 1px solid black;
  }
`;
