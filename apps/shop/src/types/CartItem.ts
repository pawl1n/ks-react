import type { VariationOption } from "shared/types/variation";

export default interface CartItemType {
  productItemId: number;
  productId: number;
  productSlug: string;
  name: string;
  description: string;
  category: string;
  price: number;
  mainImage: string;
  quantity: number;
  variationOptions?: VariationOption[];
}
