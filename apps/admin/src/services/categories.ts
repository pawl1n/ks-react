import { createApi } from '@reduxjs/toolkit/query/react';

import { Category } from 'shared/types/category';
import { CategoryRequest, UpdateRequestProps } from 'types/request';
import { ApiArrayResponse } from 'shared/types/response';
import { Pageable } from 'shared/types/pageable';
import { baseQueryWithReauthorization } from './baseQueryWithReauthorization';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  tagTypes: ['Categories'],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getCategories: builder.query<
      ApiArrayResponse<Category>,
      Pageable<Category> | void
    >({
      query: (pageable?: Pageable<Category>) => ({
        url: '/categories',
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
      query: (id: number) => `/categories/${id}`,
      providesTags: (result) => [{ type: 'Categories', id: result?.id }],
    }),
    createCategory: builder.mutation<
      ApiArrayResponse<Category>,
      CategoryRequest
    >({
      query: (category) => ({
        url: '/categories',
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
      invalidatesTags: [
        { type: 'Categories', id: 'LIST' },
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
