import Stripe from "stripe";
import { ApiError } from "../utils/ApiError.js";

export const handleStripeEventService = async (event: Stripe.Event) => {
  if (event.type == "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  } else if (event.type == "payment_method.attached") {
    const paymentMethod = event.data.object;
  } else {
    throw new ApiError(400, "Something went wrong while processing your order!!!");
  }

  return;
};
