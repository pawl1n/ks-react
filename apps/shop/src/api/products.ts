import get, { getAll, getOne } from "./Get";
import type Product from "../types/Product";
import type { ProductVariation } from "../types/Product";
import type { ApiArrayResponse } from "ks-react-admin/src/interfaces/apiResponse";

export const getProducts = (): Promise<Product[]> => {
  return get("products").then((data) => data._embedded.products);
};

export const getProduct = (id: string) => {
  return getOne<Product>("products", parseInt(id));
};

export const getProductVariations = (
  product: Product
): Promise<ApiArrayResponse<ProductVariation>> => {
  return getAll<ProductVariation>(`products/${product.id}/variations`);
};
