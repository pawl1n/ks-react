import { ApiResponseEntity, Link } from "shared/types/response";

export type CategoryRequest = {
  name: string;
  description?: string;
  parentCategory?: number;
};

export interface Category extends ApiResponseEntity {
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
