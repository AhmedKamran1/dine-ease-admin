import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getUser } from './authActions';

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    role: null,
    avatar: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = initialState;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const selectUserState = (state) => state.auth.user;

export const authActions = authSlice.actions;
export default authSlice;
