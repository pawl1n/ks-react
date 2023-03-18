import type { VariationOption } from "./Product";

export default interface CartItemType {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  mainImage: string;
  quantity: number;
  variationOptions: VariationOption[];
}
