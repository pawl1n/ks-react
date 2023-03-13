import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPayloadObject } from '../interfaces/auth';
import Router from 'next/router';

interface TokenState {
  token: string | null;
}

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const initialState: TokenState = {
  token: getToken(),
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenPayloadObject>) => {
      state.token = action.payload.token;

      if (state.token) {
        localStorage.setItem('token', state.token);
      } else {
        localStorage.removeItem('token');
        Router.push('/login');
      }
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
