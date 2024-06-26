import { createApi } from "@reduxjs/toolkit/query/react";

import type {
  Product,
  ProductItem,
  ProductItemRequest,
  ProductItemRequestParams,
  ProductRequest,
} from "shared/types/product";
import type { ApiArrayResponse } from "shared/types/response";
import type { Pageable } from "shared/types/pageable";
import type { Image, UpdateRequestProps } from "types/request";
import { baseQueryWithReauthorization } from "./baseQueryWithReauthorization";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products", "ProductItems"],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getProducts: builder.query<ApiArrayResponse<Product>, Pageable<Product>>({
      query: (pageable?: Pageable<Product>) => ({
        url: "/products",
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
            ...(result?._embedded?.products ?? []).map(
              ({ id }) => ({ type: "Products", id }) as const,
            ),
            { type: "Products", id: "LIST" },
          ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProductById: builder.query<Product, number>({
      query: (id: number) => `/products/${id}`,
      providesTags: (result) => [{ type: "Products", id: result?.id }],
    }),
    createProduct: builder.mutation<ApiArrayResponse<Product>, ProductRequest>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<
      Product,
      UpdateRequestProps<Product, ProductRequest>
    >({
      query: ({ entity, data }) => ({
        url: entity._links.self.href,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: (_result, _error, { entity }) => {
        console.log([{ type: "Products", id: entity.id }]);
        return [{ type: "Products", id: entity.id }];
      },
    }),
    deleteProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: product._links.self.href,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    getMainImage: builder.query<Image, Product>({
      query: (product) => ({
        url: product._links.mainImage.href,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) => [{ type: "ProductItems", id: result?.id }],
    }),
    getProductItems: builder.query<ApiArrayResponse<ProductItem>, Product>({
      query: (product) => ({
        url: product._links.variations.href,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
            ...(result?._embedded?.productItems ?? []).map(
              ({ id }) => ({ type: "Products", id }) as const,
            ),
            { type: "ProductItems", id: "LIST" },
          ]
          : [{ type: "ProductItems", id: "LIST" }],
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: productItem,
      }),
      invalidatesTags: [{ type: "ProductItems", id: "LIST" }],
    }),
    updateProductItem: builder.mutation<
      ProductItem,
      UpdateRequestProps<ProductItem, ProductItemRequest>
    >({
      query: ({ entity, data }) => ({
        url: entity._links.self.href,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: (_result, _error, { entity }) => [
        { type: "ProductItems", id: entity.id },
      ],
    }),
    deleteProductItem: builder.mutation<void, ProductItem>({
      query: (productItem) => ({
        url: productItem._links.self.href,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProductItems", id: "LIST" }],
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
