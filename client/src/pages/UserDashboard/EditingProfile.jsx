import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SizeSelection from '../../assets/mui/SizeSelection';
import { UPDATE_USER } from '../../graphql/Mutations/userMutations';
import { useForm } from '../../utils/customHooks';
import { updateUser } from '../../features/userSlice';
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';

const EditingProfile = ({
  toggleEdit,
  title,
  InfoContainer,
  Wrapper,
  TitleContainer,
  Title,
  EditButton,
  Info,
  Label,
  userInfo,
}) => {
  const initialState = {
    username: userInfo.username,
    email: userInfo.email,
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    shoeSize: userInfo.shoeSize || null,
  };
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();

  let sizes = [];
  for (let i = 3; i <= 12.5; i += 0.5) {
    sizes.push(i);
  }

  const { onChange, onSubmit, values } = useForm(
    updateUserCallback,
    initialState
  );

  const [update, { loading }] = useMutation(UPDATE_USER, {
    update(_, data) {
      dispatch(updateUser(data.data.updateUser));
      toggleEdit();
    },
    onError(err) {
      setErrors(err.message);
    },
    variables: values,
  });

  function updateUserCallback() {
    update();
  }
  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>{title}</Title>
          <EditButton onClick={toggleEdit}>Cancel</EditButton>
        </TitleContainer>
        <InfoContainer>
          <Form onSubmit={onSubmit}>
            <Info>
              <Label>First name</Label>
              <Input
                type='text'
                name='firstName'
                value={values.firstName}
                onChange={onChange}
              />
            </Info>
            <Info>
              <Label>Last Name</Label>
              <Input
                type='text'
                name='lastName'
                value={values.lastName}
                onChange={onChange}
              />
            </Info>
            <Info>
              <Label>Email Address</Label>
              <Input
                type='email'
                name='email'
                value={values.email}
                onChange={onChange}
              />
            </Info>
            <Info>
              <Label>Shoe Size(US)</Label>
              <SizeSelection
                width={'50%'}
                sizes={sizes}
                value={values.shoeSize}
                name='shoeSize'
                onChange={onChange}
              />
            </Info>
            <Info>
              <Label>Username</Label>
              <Input
                type='text'
                name='username'
                value={values.username}
                onChange={onChange}
              />
            </Info>
            <Info>
              <Label>
                {loading ? (
                  <Loading />
                ) : (
                  <SubmitButton type='submit'>Submit</SubmitButton>
                )}
              </Label>
            </Info>

            {errors && <MuiError value={errors} type='error' />}
          </Form>
        </InfoContainer>
      </Wrapper>
    </>
  );
};

export default EditingProfile;

const Input = styled.input`
  margin-top: -2rem;
  border-radius: 0.25rem;
  padding: 0.357rem 0.75rem;
  border: 1px solid var(--clr-gray);
  background-color: transparent;
  font-size: 100%;
  line-height: 1.15;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  height: 5vh;
  margin-top: 1.8rem;
  min-width: 50%;
  background: transparent;
  border: none;
  background-color: var(--clr-primary-2);
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  font-size: 14px;
  letter-spacing: 0.5px;
  &:hover {
    background-color: var(--clr-primary);
  }
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 30vh;
`;
