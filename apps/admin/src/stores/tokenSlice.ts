import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPayloadObject } from '../interfaces/auth';
import Router from 'next/router';

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

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
    setToken: (state, action: PayloadAction<TokenPayloadObject>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      if (state.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken);
      } else {
        localStorage.removeItem('refreshToken');
      }

      if (!state.accessToken) {
        Router.push('/login').then();
      }
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
