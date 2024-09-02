// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    clearAuthTokens: (state) => {
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;

export default authSlice.reducer;
