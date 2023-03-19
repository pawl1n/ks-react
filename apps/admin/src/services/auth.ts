import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse, LoginRequest } from '../interfaces/auth';
import { RootState } from '../stores/store';
import { setToken } from '../stores/tokenSlice';
import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import Router from 'next/router';
import { addToast } from '../stores/toastSlice';
import { ToastType } from '../interfaces/Toast';

const baseUrl = 'http://localhost:8080/api/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export const authMiddleware =
  (api: MiddlewareAPI) => (next: any) => (action: any) => {
    if (authApi.endpoints.login.matchFulfilled(action)) {
      if (action.payload) {
        api.dispatch(setToken(action.payload));

        if (window.history.length > 1) {
          Router.back();
        } else {
          Router.push('/').then();
        }
      }
    }

    return next(action);
  };

export const unauthenticatedErrorMiddleware: Middleware =
  (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 403) {
        api.dispatch(
          addToast({
            toast: {
              type: ToastType.danger,
              message: 'Відсутні необхідні привілеї',
            },
          }),
        );
      }
    }

    return next(action);
  };
