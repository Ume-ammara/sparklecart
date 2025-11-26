export const PaymentStatus = {
  UNPAID: "unpaid",
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export const PaymentMethods = {
  CARD: "card",
  WALLET: "wallet",
  
} as const;

export const PAYMENT_STATUS_ENUM = Object.values(PaymentStatus);
export const PAYMENT_METHODS_ENUM = Object.values(PaymentMethods);