export interface ApiEntityArrayResponse<T extends Entity> {
  _embedded: {
    [key: string]: T[];
  };
  _links: Links;
}

export interface Entity {
  id: number;
  [key: string]: string | number | Links | URL;
  _links: Links;
}

interface Links {
  self: {
    href: string;
  };
  [key: string]: {};
}
