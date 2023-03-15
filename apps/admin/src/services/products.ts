import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

import Product, {
  ProductItem,
  ProductItemRequest,
  ProductItemRequestParams,
  ProductRequest,
} from '../interfaces/Product';
import { ApiArrayResponse } from 'interfaces/apiResponse';
import { Pageable, UpdateRequestProps } from '../interfaces';
import Image from '../interfaces/Image';

const baseUrl = 'http://localhost:8080/api/products';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products', 'ProductItems'],
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
      UpdateRequestProps<Product, ProductRequest>
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
        { type: 'Products', id: entity.id },
      ],
    }),
    deleteProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: product._links.self.href,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getMainImage: builder.query<Image, Product>({
      query: (product) => ({
        url: product._links.mainImage.href,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getProductItems: builder.query<ApiArrayResponse<ProductItem>, Product>({
      query: (product) => ({
        url: product._links.variations.href,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.productItems ?? []).map(
                ({ id }) => ({ type: 'Products', id } as const),
              ),
              { type: 'ProductItems', id: 'LIST' },
            ]
          : [{ type: 'ProductItems', id: 'LIST' }],
    }),
    getProductItemById: builder.query<ProductItem, string>({
      query: (url) => ({
        url,
      }),
    }),
    createProductItem: builder.mutation<
      ApiArrayResponse<ProductItem>,
      ProductItemRequestParams
    >({
      query: ({ product, productItem }) => ({
        url: product._links.variations.href,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: productItem,
      }),
      invalidatesTags: [{ type: 'ProductItems', id: 'LIST' }],
    }),
    updateProductItem: builder.mutation<
      ProductItem,
      UpdateRequestProps<ProductItem, ProductItemRequest>
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
        { type: 'ProductItems', id: entity.id },
      ],
    }),
    deleteProductItem: builder.mutation<void, ProductItem>({
      query: (productItem) => ({
        url: productItem._links.self.href,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ProductItems', id: 'LIST' }],
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
  useGetMainImageQuery,
  useGetProductItemsQuery,
  useGetProductItemByIdQuery,
  useCreateProductItemMutation,
  useUpdateProductItemMutation,
  useDeleteProductItemMutation,
} = productsApi;
