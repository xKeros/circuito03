// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    // otros estados relacionados con la autenticación
  },
  reducers: {
    setAuthTokens: (state, action) => {
      state.userId = action.payload.userId;
      // actualizar otros estados si es necesario
    },
    clearAuthTokens: (state) => {
      state.userId = null;
      // limpiar otros estados si es necesario
    },
  },
});

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;
export default authSlice.reducer;
