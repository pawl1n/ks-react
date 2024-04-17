import { createApi } from '@reduxjs/toolkit/query/react';

import {
  Order,
  OrderItem,
  OrderRequest,
  OrderStatusRequest,
} from 'shared/types/order';
import { ApiArrayResponse } from 'shared/types/response';
import { Pageable } from 'shared/types/pageable';
import { baseQueryWithReauthorization } from './baseQueryWithReauthorization';
import { NestedItemsProps } from '../types/request';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders', 'OrderItems'],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getOrders: builder.query<ApiArrayResponse<Order>, Pageable<Order> | void>({
      query: (pageable?: Pageable<Order>) => ({
        url: '/orders',
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.orders ?? []).map(
                ({ id }) => ({ type: 'Orders', id } as const),
              ),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    getOrderById: builder.query<Order, number>({
      query: (id: number) => `/orders/${id}`,
      providesTags: (result) => [{ type: 'Orders', id: result?.id }],
    }),
    createOrder: builder.mutation<ApiArrayResponse<Order>, OrderRequest>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: order,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    updateStatus: builder.mutation<ApiArrayResponse<Order>, OrderStatusRequest>(
      {
        query: ({ order, status }) => ({
          url: `${order._links.self.href}/status`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { status },
        }),
      },
    ),
    // updateOrder: builder.mutation<
    //   Order,
    //   UpdateRequestProps<Order, OrderRequest>
    // >({
    //   query: ({ entity, data }) => ({
    //     url: entity._links.self.href,
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: (result, error, { entity }) => {
    //     console.log([{ type: 'Orders', id: entity.id }]);
    //     return [{ type: 'Orders', id: entity.id }];
    //   },
    // }),
    // deleteOrder: builder.mutation<void, Order>({
    //   query: (order) => ({
    //     url: order._links.self.href,
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }),
    //   invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    // }),
    getOrderItems: builder.query<
      ApiArrayResponse<OrderItem>,
      NestedItemsProps<OrderItem, Order>
    >({
      query: ({ pageable, parent }) => ({
        url: parent._links.items.href,
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result?._embedded?.orders ?? []).map(
                ({ id }) => ({ type: 'OrderItems', id } as const),
              ),
              { type: 'OrderItems', id: 'LIST' },
            ]
          : [{ type: 'OrderItems', id: 'LIST' }],
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateStatusMutation,
  useGetOrderItemsQuery,
} = ordersApi;
