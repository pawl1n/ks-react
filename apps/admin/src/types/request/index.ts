import type { Variation, VariationOption } from "shared/types/variation";
import type { Product } from "shared/types/product";
import type { ApiResponseEntity, Link } from "shared/types/response";
import type { Pageable } from "shared/types/pageable";

export type ProductRequest = {
  name: string;
  description: string;
  category?: number;
  mainImage?: string;
  price: number;
  sku: string;
};

export type ProductItemRequest = {
  stock: number;
  variationOptions?: VariationOption[];
};

export type ProductItemRequestParams = {
  product: Product;
  productItem: ProductItemRequest;
};

export type VariationRequest = {
  name: string;
};

export type VariationOptionRequest = {
  value: string;
};

export type VariationOptionRequestParams = {
  variation: Variation;
  option: VariationOptionRequest;
};

export type ImageRequest = {
  name: string;
  description?: string;
  base64Image: string;
};

export interface Image extends ApiResponseEntity {
  id: number;
  name: string;
  description: string;
  url: string;
  _links: {
    self: Link;
  };
}

export type CategoryRequest = {
  name: string;
  parentCategory?: number;
  slug?: string;
  variations?: number[];
};

export type UpdateRequestProps<Entity extends ApiResponseEntity, T> = {
  entity: Entity;
  data: T;
};

export type NestedItemsProps<
  Entity extends ApiResponseEntity,
  Parent extends ApiResponseEntity,
> = {
  parent: Parent;
  pageable: Pageable<Entity>;
};
