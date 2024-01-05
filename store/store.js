import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import userSlice from './user/userSlice';

const store = configureStore({
  reducer: { user: userSlice.reducer },
});

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
