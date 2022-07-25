import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '../components';
import { LOGIN_USER } from '../graphql/Mutations/userMutations';
import { useForm } from '../utils/customHooks';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/userSlice';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';

const LoginPage = () => {
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const { values, onChange, onSubmit } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      dispatch(loginUser(login));
      setErrors('');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]?.extensions.errors);
    },

    variables: values,
  });

  function loginUserCallback() {
    login();
  }

  return (
    <>
      <Wrapper>
        <Container>
          <div className='logo'>
            <Logo />
          </div>
          <Title>Login</Title>
          <Form onSubmit={onSubmit}>
            {loading && <Loading />}

            {error?.message === 'Failed to fetch' && (
              <MuiError
                value={'Something went wrong, Try again later'}
                type='error'
              />
            )}
            <Label>Username</Label>
            <Input
              type='text'
              name='username'
              value={values.username || ''}
              onChange={onChange}
              className={errors?.username ? 'error' : ''}
            />
            <Label>Password</Label>
            <Input
              type='password'
              name='password'
              value={values.password || ''}
              onChange={onChange}
              className={errors?.password ? 'error' : ''}
            />
            <Button disabled={loading} type='submit'>
              Submit
            </Button>
          </Form>
          <Member>
            Not a member yet?
            <Link to='/register'>
              <span> Register</span>
            </Link>
          </Member>
          <Link to='/'>
            <BackHome>Back home</BackHome>
          </Link>
          {errors &&
            Object.values(errors)?.map((err, index) => (
              <MuiError value={err} key={index} type='error' />
            ))}
        </Container>
      </Wrapper>
    </>
  );
};
export default LoginPage;

const Wrapper = styled.div`
  height: 95vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  border-top: 5px solid var(--clr-mocha-3);
  border-radius: 0.25rem;
  background: white;
  width: 25%;
  min-width: 350px;
  align-items: center;
  flex-direction: column;
  padding: 2rem 2.5rem;
  .logo {
    display: flex;
    justify-content: center;
  }
`;

const Title = styled.h1`
  letter-spacing: 1px;
  color: var(--clr-primary-2);
  margin-top: -0rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  .error {
    background-color: rgb(253, 237, 237);
  }
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  color: var(--clr-gray-2);
`;
const Input = styled.input`
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  padding: 0.357rem 0.75rem;
  border: 1px solid var(--clr-gray);
  background-color: var(--clr-mocha-hover);
  font-size: 100%;
  line-height: 1.15;
  font-weight: 500;
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  border: transparent;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  text-transform: capitalize;
  border-radius: 0.25rem;
  line-height: 1.2;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #fff;
  margin-top: 1rem;
  transition: all 0.3s;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;

const Member = styled.p`
  span {
    color: var(--clr-mocha-2);
    cursor: pointer;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;

const BackHome = styled.span`
  color: var(--clr-primary-2);
  cursor: pointer;
`;
