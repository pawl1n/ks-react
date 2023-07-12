import { ApiResponseEntity } from "shared/types/response";

export type Pageable<T extends ApiResponseEntity> = {
  page: number;
  size: number;
  sort?: Sort<T>;
};

export type Sort<T extends ApiResponseEntity> =
  | SortKey<T>
  | `${SortKey<T> & string},${SortDirection}`
  | undefined;

export type SortKey<T extends ApiResponseEntity> = Exclude<keyof T, "_links">;

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}
