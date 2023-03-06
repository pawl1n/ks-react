import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPayloadObject } from '../interfaces';

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
      console.log(action);
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
