import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import { useForm } from '../../utils/customHooks';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../graphql/Mutations/userMutations';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/userSlice';
import Loading from './Loading';
import MuiError from './Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  bgcolor: 'background.paper',
  borderRadius: '0.25rem',
  boxShadow: 24,
  p: 4,
};

export const PasswordModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const { values, onChange, onSubmit } = useForm(resetPasswordCallback, {
    currentPassword: '',
    password: '',
  });

  const [updatePassword, { error, loading }] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      dispatch(updateUser(data.updateUser));
      handleClose();
    },

    variables: values,
  });

  async function resetPasswordCallback() {
    updatePassword();
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: 'var(--clr-mocha)' }}>
        Reset password
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <Loading />
          ) : (
            <Form onSubmit={onSubmit}>
              <label>Current password</label>
              <input
                type='password'
                name='currentPassword'
                value={values.currentPassword}
                onChange={onChange}
              />
              <label>New password</label>
              <input
                type='password'
                name='password'
                value={values.password}
                onChange={onChange}
              />
              <button
                type='submit'
                disabled={!values.password || !values.currentPassword}
              >
                Submit
              </button>
              <button type='button' onClick={handleClose}>
                Cancel
              </button>
              {error && <MuiError type='error' value={error.message} />}
            </Form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  input {
    border-radius: 0.25rem;
    padding: 0.357rem 0.75rem;
    border: 1px solid var(--clr-gray);
    background-color: transparent;
    font-size: 100%;
    line-height: 1.15;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  button {
    margin-top: 1rem;
    background-color: var(--clr-primary);
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    width: 50%;
    margin: 10px auto;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: var(--clr-primary-2);
    }
  }
`;
