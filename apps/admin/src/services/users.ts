import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';
import User, { PasswordChangeRequest } from '../interfaces/User';
import { Middleware } from '@reduxjs/toolkit';
import { setUser } from '../stores/mainSlice';

const baseUrl = 'http://localhost:8080/api/users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: [{ type: 'Users', id: 'ME' }],
    }),
    updateMe: builder.mutation<User, User>({
      query: (user) => ({
        url: '/me',
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: [{ type: 'Users', id: 'ME' }],
    }),
    changePassword: builder.mutation<User, PasswordChangeRequest>({
      query: (password) => ({
        url: '/me/password',
        method: 'PUT',
        body: password,
      }),
      invalidatesTags: [{ type: 'Users', id: 'ME' }],
    }),
  }),
  refetchOnReconnect: true,
});

export const { useGetMeQuery, useUpdateMeMutation, useChangePasswordMutation } =
  usersApi;

export const usersMiddleware: Middleware = (api) => (next) => (action) => {
  if (usersApi.endpoints.getMe.matchFulfilled(action)) {
    const data = action.payload;
    const name =
      data.firstName +
      (data.middleName ? ' ' + data.middleName : '') +
      (data.lastName ? ' ' + data.lastName : '');

    api.dispatch(
      setUser({
        name: name,
        email: data.email,
      }),
    );
  }

  return next(action);
};
