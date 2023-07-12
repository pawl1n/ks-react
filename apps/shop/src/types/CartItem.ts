import type { VariationOption } from "shared/types/variation";

export default interface CartItemType {
  productId: number;
  productSlug: string;
  variationId: number;
  name: string;
  description: string;
  category: string;
  price: number;
  mainImage: string;
  quantity: number;
  variationOptions?: VariationOption[];
}
