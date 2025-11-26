import { env } from "../config/env.config.js";
import { Cart } from "../models/cart.model.js";

import { User } from "../models/user.model.js";
import {
  CreateCheckoutForBuyNowDTO,
  CreateCheckoutForCartDTO,
} from "../schemas/checkout.schema.js";
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
  console.log("cart data", cart);

  
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
}: CreateCheckoutForBuyNowDTO) => {};
