import { Variation, VariationOption } from 'shared/types/variation';
import { Product } from 'shared/types/product';
import { ApiResponseEntity, Link } from 'shared/types/response';

export type ProductRequest = {
  name: string;
  description: string;
  category?: number;
  mainImage?: string;
};

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
  description?: string;
  parentCategory?: number;
};

export type UpdateRequestProps<Entity extends ApiResponseEntity, T> = {
  entity: Entity;
  data: T;
};
