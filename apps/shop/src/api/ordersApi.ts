import { post } from "./baseApi";
import type { ApiResponse } from "../types/apiResponse";
import type { OrderRequest } from "shared/types/order";

const userApi = {
  create: (data: OrderRequest): Promise<ApiResponse<void>> =>
    post("orders", data, false),
};

export const { create } = userApi;
