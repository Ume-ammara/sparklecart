import { z } from "zod";

export const createCheckoutForCartSchema = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
  shippingAddressId: z.string().optional(),
  currency: z.string().default("usd"),
});

export const createCheckoutForBuyNowSchema = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
  productId: z.string(),
  quantity: z.number().min(1).default(1),
  shippingAddressId: z.string().optional(),
  currency: z.string().default("usd"),
});

export type CreateCheckoutForCartDTO = z.infer<typeof createCheckoutForCartSchema>;
export type CreateCheckoutForBuyNowDTO = z.infer<typeof createCheckoutForBuyNowSchema>;
