import type Product from "../types/Product";
import type { ProductVariation } from "../types/Product";
import type { ApiArrayResponse } from "ks-react-admin/src/interfaces/apiResponse";
import { get } from "./baseApi";
import type { ApiResponse } from "../types/Response";

const productsApi = {
  getAll: (
    searchParams?: URLSearchParams
  ): Promise<ApiResponse<ApiArrayResponse<Product>>> =>
    get("products", false, searchParams),
  getOne: (id: string): Promise<ApiResponse<Product>> =>
    get(`products/${id}`, false),
  getVariations: (
    product: Product
  ): Promise<ApiResponse<ApiArrayResponse<ProductVariation>>> =>
    get(product._links.variations.href, false),
};

export const { getAll, getOne, getVariations } = productsApi;
