import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

import Category, { CategoryRequest } from '../interfaces/Category';
import { ApiArrayResponse } from 'interfaces/apiResponse';
import { Pageable, UpdateRequestProps } from '../interfaces';

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
    getCategories: builder.query<
      ApiArrayResponse<Category>,
      Pageable<Category> | void
    >({
      query: (pageable?: Pageable<Category>) => ({
        url: '',
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.categories ?? []).map(
                ({ id }) => ({ type: 'Categories', id } as const),
              ),
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
      UpdateRequestProps<Category, CategoryRequest>
    >({
      query: ({ entity, data }) => ({
        url: entity._links.self.href,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
      invalidatesTags: (result, error, { entity }) => [
        { type: 'Categories', id: entity.id },
      ],
    }),
    deleteCategory: builder.mutation<void, Category>({
      query: (category) => ({
        url: category._links.self.href,
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
