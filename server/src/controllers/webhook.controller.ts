import { env } from "../config/env.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import { stripe } from "../utils/payment.js";
import { handleStripeEventService } from "../services/webhook.service.js";

export const handleStripeEventController = asyncHandler(async (req: Request, res: Response) => {
  let event = req.body;

  const endpointSecret = env.STRIPE_WEBHOOK_SECRET_KEY;

  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(event, signature, endpointSecret);
  }

  const result = handleStripeEventService(event);
});
