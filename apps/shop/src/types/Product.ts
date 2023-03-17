import type { Entity, Link } from "./Response";

export default interface Product extends Entity {
  id: number;
  name: string;
  description: string;
  category: string;
  mainImage: string;

  _links: {
    self: Link;
    category: Link;
    variations: Link;
  };
}

export interface ProductVariation extends Entity {
  id: number;
  price: number;
  stock: number;
  variationOptions: VariationOption[];

  _links: {
    self: Link;
  };
}

export interface VariationOption extends Entity {
  variationId: number;
  value: string;

  _links: {
    self: Link;
  };
}
