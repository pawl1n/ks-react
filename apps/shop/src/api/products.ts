import type {
  Product,
  ProductDetails,
  ProductItem,
} from "shared/types/product";
import type { ApiArrayResponse } from "shared/types/response";
import { get } from "./baseApi";
import type { ApiResponse } from "../types/apiResponse";

const productsApi = {
  getAll: (
    searchParams?: URLSearchParams,
  ): Promise<ApiResponse<ApiArrayResponse<Product>>> =>
    get("products", false, searchParams),
  getOneBySlug: (slug: string): Promise<ApiResponse<ProductDetails>> =>
    get(`products/slug/${slug}/details`, false),
  getVariations: (
    product: Product,
  ): Promise<ApiResponse<ApiArrayResponse<ProductItem>>> =>
    get(product._links.variations.href, false),
};

export const { getAll, getOneBySlug, getVariations } = productsApi;
