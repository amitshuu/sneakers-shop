import { useLazyQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import MuiError from '../../assets/mui/Alert';
import { FormRow } from '../../components';
import { GET_PRODUCT_BY_ID } from '../../graphql/Queries/productQueries';
import Loading from '../../assets/mui/Loading';
import { EditItemForm } from '../AdminDashboard';
import { useForm } from '../../utils/customHooks';

const EditItem = () => {
  const initialState = {
    product: '',
    errors: '',
    productId: '',
  };

  const { onChange, onSubmit, values } = useForm(
    getProductFunction,
    initialState
  );

  const [getProduct, { loading, error }] = useLazyQuery(GET_PRODUCT_BY_ID, {
    onCompleted({ getProductById }) {
      values.product = getProductById;
      values.errors = '';
    },
  });

  function getProductFunction() {
    getProduct({ variables: { productId: values.productId } });
  }

  return (
    <>
      {values.product ? (
        <EditItemForm product={values.product} />
      ) : (
        <Wrapper>
          {loading ? (
            <Loading />
          ) : (
            <Form onSubmit={onSubmit}>
              <Title>Please type the ID of the item</Title>
              <FormRow
                name='productId'
                type='text'
                value={values.productId}
                onChange={onChange}
              />
              <Button type='submit'>Search</Button>
              {values.errors ? (
                <MuiError type='error'>{values.errors}</MuiError>
              ) : error ? (
                <MuiError type='error'>{error.message}</MuiError>
              ) : (
                ''
              )}
            </Form>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default EditItem;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 2rem 3rem;
`;

const Form = styled.form``;
const Title = styled.h2``;
const Button = styled.button`
  color: white;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 1rem;
  background-color: var(--clr-primary);
  border-radius: 12px;
  padding: 6px;
  transition: all 0.3s;
  width: 50%;
  &:hover {
    background-color: var(--clr-primary-2);
  }
`;
