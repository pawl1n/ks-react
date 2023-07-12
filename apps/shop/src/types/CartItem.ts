import type { VariationOption } from "shared/types/variation";

export default interface CartItemType {
  productId: number;
  variationId: number;
  name: string;
  description: string;
  category: string;
  price: number;
  mainImage: string;
  quantity: number;
  variationOptions?: VariationOption[];
}
