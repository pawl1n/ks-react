import { ApiResponseEntity, Link } from "shared/types/response";
import { ProductItem } from "../product";

export type OrderItemRequest = {
  productItem: number;
  quantity: number;
};

export type OrderRequest = {
  phoneNumber: string;
  email: string;
  address: string;
  customerFullName: string;
  paymentType: PaymentType;
  shippingMethod: ShippingMethod;
  orderItems: OrderItemRequest[];
};

export type OrderStatusRequest = {
  order: Order;
  status: OrderStatus;
};

export enum PaymentType { CASH = "CASH" };
export enum ShippingMethod { PICKUP = "PICKUP" };
export type OrderStatus = (typeof PossibleStatuses)[number];

export const PossibleStatuses = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "SHIPPED",
  "DELIVERED",
  "COMPLETED",
] as const;

export interface OrderItem extends ApiResponseEntity {
  id: number;
  sku: string;
  productItem: ProductItem;
  quantity: number;
  price: number;
  _links: {
    self: Link;
    order: Link;
  };
}

export interface Order extends ApiResponseEntity {
  id: number;
  userEmail: string;
  address: string;
  currentStatus: OrderStatus;
  paymentType: PaymentType;
  phoneNumber: string;
  customerFullName: string;
  shippingMethod: ShippingMethod;
  totalPrice: number;
  description: string;
  _links: {
    self: Link;
    items: Link;
  };
}
