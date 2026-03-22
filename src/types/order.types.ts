import { Product, Variant } from "./product.types";


export type PaymentMethod = "CASH_ON_DELIVERY" | "CREDIT_CARD" | "MOBILE_BANKING" | "BANK_TRANSFER" ;
export type PaymentStatus = "PAID" | "UNPAID" | "FAILED" | "REFUNDED";
export type OrderStatus = "DRAFT" | "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";




export interface Order {
  id: string;
  orderNumber: string;

  customerName: string;
  customerEmail: string;
  customerPhone: string;

  deliveryAddress: string;
  deliveryNote: string;

  quantity: number;

  productId: string;
  productName: string;
  product: Product;

  variantId: string;
  variantName: string;
  variant: Variant;

  unitPrice: string;
  originalPrice: string;
  discountAmount: string;
  deliveryCharge: string;
  totalAmount: string;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  status: OrderStatus;

  trackingNumber: string | null;
  transactionId: string | null;

  courierService: string | null;

  deliveredAt: string | null;

  createdAt: string;
  updatedAt: string;
}