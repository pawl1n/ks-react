import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

import Product, { ProductRequest } from '../interfaces/Product';
import { ApiArrayResponse } from 'interfaces/apiResponse';
import { Pageable, UpdateRequestProps } from '../interfaces';

const baseUrl = 'http://localhost:8080/api/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
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
    getProducts: builder.query<
      ApiArrayResponse<Product>,
      Pageable<Product> | void
    >({
      query: (pageable?: Pageable<Product>) => ({
        url: '',
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.products ?? []).map(
                ({ id }) => ({ type: 'Products', id } as const),
              ),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id: number) => `/${id}`,
    }),
    createProduct: builder.mutation<ApiArrayResponse<Product>, ProductRequest>({
      query: (product) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: product,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<
      Product,
      UpdateRequestProps<ProductRequest>
    >({
      query: (props) => ({
        url: `/${props.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: props.data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),
    deleteProduct: builder.mutation<ApiArrayResponse<Product>, string>({
      query: (url) => ({
        url: url,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
