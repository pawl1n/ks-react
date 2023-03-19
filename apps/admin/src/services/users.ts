import { createApi } from '@reduxjs/toolkit/query/react';
import User, { PasswordChangeRequest } from '../interfaces/User';
import { Middleware } from '@reduxjs/toolkit';
import { setUser } from '../stores/mainSlice';
import { baseQueryWithReauthorization } from './baseQueryWithReauthorization';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: [{ type: 'Users', id: 'ME' }],
    }),
    updateMe: builder.mutation<User, User>({
      query: (user) => ({
        url: '/users/me',
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: [{ type: 'Users', id: 'ME' }],
    }),
    changePassword: builder.mutation<User, PasswordChangeRequest>({
      query: (password) => ({
        url: '/users/me/password',
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
