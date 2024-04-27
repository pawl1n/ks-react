import type { ApiResponseEntity } from "shared/types/response";

export type Pageable<T extends ApiResponseEntity> = {
  page: number;
  size: number;
  sort?: Sort<T>;
};

export type Sort<T extends ApiResponseEntity> =
  | SortKey<T>
  | `${SortKey<T> & string},${SortDirection}`
  | undefined;

// SortKey can be any key of object or nested object but not link
export type SortKey<T extends ApiResponseEntity> = Exclude<
  NestedKeyOf<T>,
  `${string}_links${string}`
>;

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
  ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
  : `${Key}`;
}[keyof ObjectType & (string | number)];
