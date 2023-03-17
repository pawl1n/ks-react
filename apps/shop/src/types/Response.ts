export interface ApiEntityArrayResponse<T extends Entity> {
  _embedded: {
    [key: string]: T[];
  };
  _links: Links;
}

export interface Entity {
  id: number;
  [key: string]: any;
  _links: Links;
}

interface Links {
  self: Link;
  [key: string]: Link;
}

export interface Link {
  href: string;
}
