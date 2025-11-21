import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  createCheckoutForBuyNowSchema,
  createCheckoutForCartSchema,
} from "../schemas/checkout.schema.js";
import { createCheckoutForBuyNowService, createCheckoutForCartService } from "../services/checkout.service.js";

export const createCheckoutForCartController = asyncHandler(async (req: Request, res: Response) => {
  // When clicked on "Checkout" from cart page then this controller will handle buying all cart items of the user which are not purchased yet means isPurchased: false

  const { data } = createCheckoutForCartSchema.safeParse({
    ...req.body,
    email: req.user?.email,
  });

  const paymentIntent = await createCheckoutForCartService(data);

  return res.status(201).json(new ApiResponse(201, "Checkout for cart created successfully", {}));
});

export const createCheckoutForBuyNowController = asyncHandler(
  async (req: Request, res: Response) => {
    // When clicked on "Buy Now" from product details page then this controller will handle buying that single product immediately with given quantity

    const { data } = createCheckoutForBuyNowSchema.safeParse({
      ...req.body,
      email: req.user?.email,
    });

    const paymentIntent = await createCheckoutForBuyNowService(data);

    return res
      .status(201)
      .json(new ApiResponse(201, "Checkout for buy now created successfully", {}));
  }
);
