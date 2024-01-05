import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk(
  'user/login',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await getUserDetails();
      const { id, email, fullName: name } = res.data;
      return { id, name, email, role, avatar, location };
    } catch (e) {
      return rejectWithValue(e.response?.data?.message);
    }
  }
);
