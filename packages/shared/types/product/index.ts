import type { ApiResponseEntity, Link } from "shared/types/response";
import type { VariationOption } from "shared/types/variation";
import type { Category } from "shared/types/category";

export type ProductRequest = {
  name: string;
  description: string;
  category?: number;
  mainImage?: string;
  price: number;
  sku: string;
};

export interface ProductItem extends ApiResponseEntity {
  id: number;
  sku: string;
  price: number;
  stock: number;
  productName: string;
  description: string;
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
  price: number;
  sku: string;
  slug: string;
  _links: {
    self: Link;
    category: Link;
    mainImage: Link;
    variations: Link;
  };
}

export interface ProductDetails extends ApiResponseEntity {
  product: Product;
  variations: ProductItem[];
  breadcrumbs: BreadCrumb;
}

export interface BreadCrumb {
  name: string;
  path: string;
  descendant: BreadCrumb;
}
