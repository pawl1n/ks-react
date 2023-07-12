import type { ApiArrayResponse } from "shared/types/response";
import { get } from "./baseApi";
import type { ApiResponse } from "../types/apiResponse";
import type { Category } from "shared/types/category";

const categoriesApi = {
  getAll: (): Promise<ApiResponse<ApiArrayResponse<Category>>> =>
    get("categories/tree", false),
  getOne: (path: string): Promise<ApiResponse<Category>> =>
    get("categories/path/" + path, false),
};

export const { getAll } = categoriesApi;
