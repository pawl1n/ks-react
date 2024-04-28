import type { ApiResponseEntity, Link } from "shared/types/response";
import type { ProductItem } from "../product";

export type OrderItemRequest = {
  productItem: number;
  quantity: number;
};

export type OrderRequest = {
  phoneNumber: string;
  userEmail: string;
  address: string;
  customerFullName: string;
  paymentType: PaymentType;
  shippingMethod: ShippingMethod;
  items: OrderItemRequest[] | undefined;
};

export type OrderStatusRequest = {
  order: Order;
  status: OrderStatus;
};

export enum PaymentType {
  CASH = "CASH",
}
export enum ShippingMethod {
  PICKUP = "PICKUP",
}
export type OrderStatus = (typeof PossibleStatuses)[number];

export const PossibleStatuses = [
  "CREATED",
  "CONFIRMED",
  "CANCELED",
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

export interface OrderReport {
  startDate: string;
  endDate: string;
  details: OrderReportDetails;
}

export type OrderReportDetails = {
  [key in (typeof PossibleStatuses)[number]]: {
    [key: string]: number;
  };
};

export interface OrderReportRequest {
  startDate: string;
  endDate: string;
}
