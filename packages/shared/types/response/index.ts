export type Link = {
  href: string;
};

export type ApiResponseEntity = {
  id: number;
  _links: {
    self: Link;
  };
};

export type ApiArrayResponse<Entity extends ApiResponseEntity> = {
  _embedded?: {
    [key: string]: Entity[];
  };
  _links: {
    self: Link;
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};
