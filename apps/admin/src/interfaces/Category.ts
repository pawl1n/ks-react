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
  _links: {
    self: Link;
    parentCategory: Link;
    childrenCategories: Link;
  };
}

export default Category;
