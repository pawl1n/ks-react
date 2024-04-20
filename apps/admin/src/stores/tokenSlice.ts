import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const getTokens = () => {
  const tokens = {
    accessToken: null,
    refreshToken: null,
  };

  if (typeof window !== "undefined") {
    tokens.accessToken = localStorage.getItem("accessToken");
    tokens.refreshToken = localStorage.getItem("refreshToken");
  }
  return tokens;
};

const initialState: TokenState = getTokens();

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      console.log(action.payload);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      if (state.refreshToken) {
        localStorage.setItem("refreshToken", state.refreshToken);
        localStorage.setItem("accessToken", state.refreshToken);
      } else if (!state.accessToken && !state.refreshToken) {
        logout();
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      Router.push("/login").catch(console.error);
    },
  },
});

export const { setToken, logout } = tokenSlice.actions;

export default tokenSlice.reducer;
