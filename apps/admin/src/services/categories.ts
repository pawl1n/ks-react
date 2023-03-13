import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

import Category, { CategoryRequest } from '../interfaces/Category';
import { ApiArrayResponse } from 'interfaces/apiResponse';
import { UpdateRequestProps } from '../interfaces';

const baseUrl = 'http://localhost:8080/api/categories';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
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
    getCategories: builder.query<Category[], void>({
      query: () => ``,
      transformResponse: (response: ApiArrayResponse<Category>) =>
        response._embedded?.categories ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Categories', id } as const)),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
    }),
    getCategoryById: builder.query<Category, number>({
      query: (id: number) => `/${id}`,
    }),
    createCategory: builder.mutation<
      ApiArrayResponse<Category>,
      CategoryRequest
    >({
      query: (category) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: category,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<
      Category,
      UpdateRequestProps<CategoryRequest>
    >({
      query: (props) => ({
        url: `/${props.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: props.data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Categories', id }],
    }),
    deleteCategory: builder.mutation<ApiArrayResponse<Category>, string>({
      query: (url) => ({
        url: url,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApi;
