import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "shared/types/user";
import type { PasswordChangeRequest } from "shared/types/auth";
import type { Middleware } from "@reduxjs/toolkit";
import { setUser } from "../stores/mainSlice";
import { baseQueryWithReauthorization } from "./baseQueryWithReauthorization";
import type { Statistics } from "types/response";
import type { DateRangeRequest } from "types/request";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: [{ type: "Users", id: "ME" }],
    }),
    updateMe: builder.mutation<User, User>({
      query: (user) => ({
        url: "/users/me",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),
    changePassword: builder.mutation<User, PasswordChangeRequest>({
      query: (password) => ({
        url: "/users/me/password",
        method: "PUT",
        body: password,
      }),
      invalidatesTags: [{ type: "Users", id: "ME" }],
    }),
    getUserStats: builder.query<Statistics, DateRangeRequest>({
      query: (params) => ({
        url: "/users/stats",
        method: "GET",
        params,
      }),
    }),
  }),
  refetchOnReconnect: true,
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useGetUserStatsQuery,
} = usersApi;

export const usersMiddleware: Middleware = (api) => (next) => (action) => {
  if (usersApi.endpoints.getMe.matchFulfilled(action)) {
    const data = action.payload;
    const name =
      data.firstName +
      (data.middleName ? ` ${data.middleName}` : "") +
      (data.lastName ? ` ${data.lastName}` : "");

    api.dispatch(
      setUser({
        name: name,
        email: data.email,
      }),
    );
  }

  return next(action);
};
