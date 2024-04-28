import { createApi } from "@reduxjs/toolkit/query/react";

import type {
  Order,
  OrderItem,
  OrderRequest,
  OrderReport,
  OrderReportRequest,
} from "shared/types/order";
import type { Pageable } from "shared/types/pageable";
import type { ApiArrayResponse } from "shared/types/response";
import type { NestedItemsProps, UpdateRequestProps } from "../types/request";
import { baseQueryWithReauthorization } from "./baseQueryWithReauthorization";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["Orders", "OrderItems"],
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getOrders: builder.query<
      ApiArrayResponse<Order>,
      Pageable<Order> | undefined
    >({
      query: (pageable?: Pageable<Order>) => ({
        url: "/orders",
        params: pageable,
      }),
      providesTags: (result) =>
        result
          ? [
            ...(result?._embedded?.orders ?? []).map(
              ({ id }) => ({ type: "Orders", id }) as const,
            ),
            { type: "Orders", id: "LIST" },
          ]
          : [{ type: "Orders", id: "LIST" }],
    }),
    getOrderById: builder.query<Order, number>({
      query: (id: number) => `/orders/${id}`,
      providesTags: (result) => [{ type: "Orders", id: result?.id }],
    }),
    createOrder: builder.mutation<ApiArrayResponse<Order>, OrderRequest>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: order,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    updateOrder: builder.mutation<
      Order,
      UpdateRequestProps<Order, OrderRequest>
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
        console.log([{ type: "Orders", id: entity.id }]);
        return [{ type: "Orders", id: entity.id }];
      },
    }),
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
              ({ id }) => ({ type: "OrderItems", id }) as const,
            ),
            { type: "OrderItems", id: "LIST" },
          ]
          : [{ type: "OrderItems", id: "LIST" }],
    }),
    getReport: builder.query<OrderReport, OrderReportRequest>({
      query: (params: OrderReportRequest) => ({
        url: "/orders/report",
        params,
      }),
      providesTags: () => [{ type: "Orders", id: "LIST" }],
    }),
  }),
  refetchOnFocus: false,
  refetchOnReconnect: true,
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetOrderItemsQuery,
  useGetReportQuery,
} = ordersApi;
