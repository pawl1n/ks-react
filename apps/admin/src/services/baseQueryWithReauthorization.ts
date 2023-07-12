import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';
import { logout, setToken } from '../stores/tokenSlice';
import { addToast } from '../stores/toastSlice';
import { ToastType } from 'types/toast';
import { AuthResponse } from 'shared/types/auth';
import Router from 'next/router';
import { MiddlewareAPI } from '@reduxjs/toolkit';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).token.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauthorization: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  let response = await baseQuery(args, api, extraOptions);
  if (response?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).token.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        },
        api,
        extraOptions,
      );

      if (refreshResult?.data) {
        const data = refreshResult.data as AuthResponse;
        api.dispatch(setToken(data));
        response = await baseQuery(args, api, extraOptions);
      } else {
        logoutWithError(api);
      }
    } else {
      logoutWithError(api);
    }
  }
  return response;
};

const logoutWithError = (api: MiddlewareAPI) => {
  api.dispatch(logout());
  api.dispatch(
    addToast({
      toast: {
        type: ToastType.danger,
        message: 'Необхідно авторизуватись',
      },
    }),
  );
  Router.push('/login').then();
};
