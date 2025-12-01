import { Router } from "express";
import { handleStripeEventController } from "../controllers/webhook.controller.js";
import express from "express";
import { stripe } from "../utils/payment.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { env } from "../config/env.config.js";

const webhookRouter = Router();

webhookRouter.route("/stripe").post(express.raw({ type: "application/json" }), async (req, res) => {
  let event;

  try {
    let sig = req.headers["stripe-signature"];
    if (env.NODE_ENV === "development") {
      sig = null;
    }
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ===========================
  // 1. PAYMENT SUCCESS
  // ===========================
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const user = await User.findOne({ email: session.customer_email });
    if (!user) return res.status(400).send("User not found");

    // For buy-now or cart checkout, both use metadata
    const cartItems = await Cart.find({ user: user._id }).populate("product");

    const orderProducts = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const order = await Order.create({
      user: user._id,
      products: orderProducts,
      amount: session.amount_total / 100,
      paymentStatus: "paid",
      paymentId: session.payment_intent,
      shippingAddressId: session.metadata.shippingAddressId,
    });

    // Reduce stock
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart after payment success
    await Cart.deleteMany({ user: user._id });

    console.log("✅ Order created:", order._id);
  }

  res.json({ received: true });
});

export { webhookRouter };
