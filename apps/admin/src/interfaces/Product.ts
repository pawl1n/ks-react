import { ApiResponseEntity, Link } from './apiResponse';
import { VariationOption } from './Variation';
import Category from './Category';

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

interface Product extends ApiResponseEntity {
  id: number;
  name: string;
  description: string;
  category: Category;
  mainImage: string;
  _links: {
    self: Link;
    category: Link;
    mainImage: Link;
    variations: Link;
  };
}

export default Product;
