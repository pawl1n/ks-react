import { ApiResponseEntity, Link } from './apiResponse';

export type ProductRequest = {
  name: string;
  description: string;
  category?: number;
  mainImage?: string;
};

interface Product extends ApiResponseEntity {
  id: number;
  name: string;
  description: string;
  category: string;
  _links: {
    self: Link;
    category: Link;
  };
}

export default Product;
