import { get, post } from "./baseApi";
import type { ApiResponse } from "../types/apiResponse";
import type { Order, OrderRequest } from "shared/types/order";
import type { ApiArrayResponse } from "shared/types/response";

const userApi = {
  create: (data: OrderRequest): Promise<ApiResponse<void>> =>
    post("orders", data, false),
  getUserOrders: (
    searchParams?: URLSearchParams,
  ): Promise<ApiResponse<ApiArrayResponse<Order>>> =>
    get("users/me/orders", true, searchParams),
};

export const { create, getUserOrders } = userApi;
