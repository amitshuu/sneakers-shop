import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';
import userReducer from './features/userSlice';

const reducer = combineReducers({
  filter: filterReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer,
});
