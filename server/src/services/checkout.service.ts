import { env } from "../config/env.config.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

import { User } from "../models/user.model.js";
import {
  CreateCheckoutForBuyNowDTO,
  CreateCheckoutForCartDTO,
} from "../schemas/checkout.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { stripe } from "../utils/payment.js";

export const createCheckoutForCartService = async ({
  name,
  email,
  currency,
  shippingAddressId,
}: CreateCheckoutForCartDTO) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const cart = await Cart.find({ user: user._id }).populate("product");

  if (!cart) {
    throw new Error("Cart is empty");
  }
  const lineItems = cart.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.product.name,
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${env.FRONTEND_URL}/success`,
    cancel_url: `${env.FRONTEND_URL}/cancel`,
  });
  return session;
};
export const createCheckoutForBuyNowService = async ({
  name,
  email,
  productId,
  quantity,
  currency,
  shippingAddressId,
}: CreateCheckoutForBuyNowDTO) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(403, "User not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  console.log("product", product);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: quantity,
      },
    ],

    success_url: `${env.FRONTEND_URL}/success`,
    cancel_url: `${env.FRONTEND_URL}/cancel`,
  });
  return session;
};
