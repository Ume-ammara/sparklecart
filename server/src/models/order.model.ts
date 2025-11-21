import mongoose, { Schema } from "mongoose";
import {
  PAYMENT_METHODS_ENUM,
  PAYMENT_STATUS_ENUM,
  PaymentMethods,
  PaymentStatus,
} from "../constants/payment.constant.js";
import { ORDER_STATUS_ENUM, OrderStatus } from "../constants/order.constant.js";

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;

  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  totalAmount: number;
  currency: string;

  shippingAddress: mongoose.Types.ObjectId;

  status: string; // pending, processing, shipped...
  paymentStatus: string; // unpaid, pending, paid, failed, refunded
  paymentMethod: string; // card, wallet, upi...

  stripePaymentIntentId?: string;
  stripePaymentIntentClientSecret?: string;
  stripeRefundId?: string;

  paidAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "usd",
    },

    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ORDER_STATUS_ENUM,
      default: OrderStatus.PENDING,
    },

    // STRIPE FIELDS ----------------------

    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS_ENUM,
      default: PaymentStatus.UNPAID,
    },

    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS_ENUM,
      default: PaymentMethods.CARD,
    },

    stripePaymentIntentId: {
      type: String,
      default: null,
    },

    stripePaymentIntentClientSecret: {
      type: String,
      default: null,
    },

    stripeRefundId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export { Order };
