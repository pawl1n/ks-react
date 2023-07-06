import { ApiResponseEntity, Link } from './apiResponse';

export type CategoryRequest = {
  name: string;
  description?: string;
  parentCategory?: number;
};

interface Category extends ApiResponseEntity {
  id: number;
  name: string;
  parentCategory?: string;
  path: string;
  descendants: Category[];
  _links: {
    self: Link;
    parentCategory: Link;
    descendants: Link;
  };
}

export default Category;
