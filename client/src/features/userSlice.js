import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: localStorage.getItem('jwtToken')
      ? jwtDecode(localStorage.getItem('jwtToken'))
      : null,
    isLoading: true,
  },

  reducers: {
    loginUser: (state, action) => {
      localStorage.setItem('jwtToken', action.payload.token);
      state.userInfo = action.payload;
      state.isLoading = action.payload.loading;
    },
    logoutUser: (state, action) => {
      localStorage.removeItem('jwtToken');
      state.userInfo = null;
    },

    updateUser: (state, action) => {
      localStorage.setItem('jwtToken', action.payload.token);
      state.userInfo = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
