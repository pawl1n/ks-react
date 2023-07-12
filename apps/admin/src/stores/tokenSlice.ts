import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Router from 'next/router';

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null;
};

const initialState: TokenState = {
  accessToken: null,
  refreshToken: getToken(),
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      if (state.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken);
      } else if (!state.accessToken && !state.refreshToken) {
        logout();
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem('refreshToken');
      Router.push('/login').catch(console.error);
    },
  },
});

export const { setToken, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
