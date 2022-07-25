import { useMutation } from '@apollo/client';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import MuiError from '../../assets/mui/Alert';
import Loading from '../../assets/mui/Loading';
import { FormRow } from '../../components';
import { UPDATE_PRODUCT } from '../../graphql/Mutations/productMutation';
import { useForm } from '../../utils/customHooks';

const EditItemForm = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [publicId, setPublicId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);

  const initialState = {
    title: product?.title.toString() || '',
    brand: product?.brand.toString() || '',
    model: product?.model.toString() || '',
    price: product?.price.toString() || '',
    size: product?.size.toString() || '',
    color: product?.color.toString() || '',
    image: '',
    productId: product?.id || '',
  };

  const { onChange, onSubmit, values } = useForm(
    editProductCallback,
    initialState
  );

  const [editProdudct, { loading: productLoading, error }] = useMutation(
    UPDATE_PRODUCT,
    {
      variables: values,
      onCompleted() {
        setSuccess(true);
      },
    }
  );

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('upload_preset', 'wrhqjxmr');
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsrhwv8to/image/upload',
        formData
      );
      setLoading(false);
      setPublicId(response.data.public_id);
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  function editProductCallback() {
    if (imageUrl) {
      values.image = imageUrl;
    }
    editProdudct();
  }

  return (
    <Wrapper>
      {productLoading ? (
        <Loading />
      ) : (
        <LoadingContainer>
          <Container>
            <Title>EDIT AN ITEM</Title>
            <Label>Choose an image:</Label>
            {loading ? (
              <Loading />
            ) : (
              <Image
                className='image'
                cloudName='dsrhwv8to'
                publicId={publicId}
              />
            )}
            <Input type='file' onChange={(e) => uploadImage(e.target.files)} />
          </Container>

          <Form onSubmit={onSubmit}>
            <InputContainer>
              <FormRow
                exampleText={'e.g. Yeezy Boost 350 V2 Zebra'}
                labelText={'Shoe Title'}
                name='title'
                type='text'
                value={values.title}
                onChange={onChange}
              />
            </InputContainer>
            <InputContainer>
              <FormRow
                exampleText={'e.g. Yeezy'}
                labelText={'Shoe Brand'}
                name='brand'
                type='text'
                value={values.brand}
                onChange={onChange}
              />
            </InputContainer>
            <InputContainer>
              <FormRow
                exampleText={'e.g. V2 Zebra'}
                labelText={'Shoe Model'}
                name='model'
                type='text'
                value={values.model}
                onChange={onChange}
              />
            </InputContainer>
            <InputContainer>
              <FormRow
                exampleText={'e.g. red,black,blue'}
                labelText={'Shoe Colors'}
                name='color'
                type='text'
                value={values.color}
                onChange={onChange}
              />
            </InputContainer>
            <InputContainer>
              <FormRow
                exampleText={'e.g. 350'}
                labelText={'Shoe Price'}
                name='price'
                type='number'
                value={values.price}
                onChange={onChange}
              />
            </InputContainer>
            <InputContainer>
              <FormRow
                exampleText={'e.g. 7.5,8,11'}
                labelText={'Shoe Size'}
                name='size'
                value={values.size}
                type='text'
                onChange={onChange}
              />
            </InputContainer>
            <ButtonContainer>
              <Button type='submit'>EDIT ITEM</Button>
              {success ? (
                <MuiError type='success'>Edited Item Successfully</MuiError>
              ) : error ? (
                <MuiError type='error'>{error.message}</MuiError>
              ) : (
                ''
              )}
            </ButtonContainer>
          </Form>
        </LoadingContainer>
      )}
    </Wrapper>
  );
};

export default EditItemForm;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 2rem 3rem;
  .image {
    width: 250px;
  }
`;
const LoadingContainer = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.h1`
  color: var(--clr-primary-2);
`;
const Input = styled.input``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  margin-top: 2rem;
`;
const Button = styled.button`
  color: white;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
  background-color: var(--clr-primary);
  border-radius: 12px;
  padding: 12px;
  transition: all 0.3s;
  width: 50%;
  &:hover {
    background-color: var(--clr-primary-2);
  }
`;

const Label = styled.h3`
  color: var(--clr-primary-2);
`;
