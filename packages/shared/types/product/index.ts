import { ApiResponseEntity, Link } from "shared/types/response";
import { VariationOption } from "shared/types/variation";
import { Category } from "shared/types/category";

export type ProductRequest = {
  name: string;
  description: string;
  category?: number;
  mainImage?: string;
};

export interface ProductItem extends ApiResponseEntity {
  id: number;
  sku: string;
  price: number;
  stock: number;
  variationOptions?: VariationOption[];
}

export type ProductItemRequest = {
  sku: string;
  price: number;
  stock: number;
  variationOptions?: VariationOption[];
};

export type ProductItemRequestParams = {
  product: Product;
  productItem: ProductItemRequest;
};

export interface Product extends ApiResponseEntity {
  id: number;
  name: string;
  description: string;
  category: Category;
  mainImage: string;
  slug: string;
  _links: {
    self: Link;
    category: Link;
    mainImage: Link;
    variations: Link;
  };
}
