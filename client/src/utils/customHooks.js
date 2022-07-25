import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/userSlice';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    values,
    onChange,
    onSubmit,
  };
};

export const useToggle = (initialState = true) => {
  const [menuState, setMenuState] = useState(initialState);

  const handleToggle = () => {
    setMenuState((prevState) => !prevState);
  };

  return {
    menuState,
    handleToggle,
  };
};

export const useLogout = () => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    client.resetStore();
    navigate('/');
  };

  return { handleLogout };
};
