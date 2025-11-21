import {
  CreateCheckoutForBuyNowDTO,
  CreateCheckoutForCartDTO,
} from "../schemas/checkout.schema.js";

export const createCheckoutForCartService = async ({
  name,
  email,
  currency,
  shippingAddressId,
}: CreateCheckoutForCartDTO) => {};

export const createCheckoutForBuyNowService = async ({
  name,
  email,
  productId,
  quantity,
  currency,
  shippingAddressId,
}: CreateCheckoutForBuyNowDTO) => {};
