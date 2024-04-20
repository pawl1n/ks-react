import type { ApiResponseEntity, Link } from "shared/types/response";
import type { Variation } from "../variation";

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
  slug: string;
  descendants: Category[];
  variations: Variation[];
  _links: {
    self: Link;
    parentCategory: Link;
    descendants: Link;
  };
}
