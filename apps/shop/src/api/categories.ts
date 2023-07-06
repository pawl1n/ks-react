import type { ApiArrayResponse } from "ks-react-admin/src/interfaces/apiResponse";
import { get } from "./baseApi";
import type { ApiResponse } from "../types/Response";
import type Category from "ks-react-admin/src/interfaces/Category";

const categoriesApi = {
  getAll: (): Promise<ApiResponse<ApiArrayResponse<Category>>> =>
    get("categories/tree", false),
};

export const { getAll } = categoriesApi;
