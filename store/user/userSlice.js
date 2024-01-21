import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  id: null,
  name: null,
  email: null,
  slug: null,
  role: null,
  avatar: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action) => (state = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return { ...state, ...action };
    });
  },
});

export const selectUserState = (state) => state.user;

export const userActions = userSlice.actions;
export default userSlice;
