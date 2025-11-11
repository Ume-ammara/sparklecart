import { Seller } from "../models/seller.model.js";

import { BecomeASeller } from "../schemas/seller.schema.js";
import { ApiError } from "../utils/ApiError.js";

export const becomeASellerService = async ({
  storeName,
  storeDescription,
  userId,
}: BecomeASeller) => {
  const existingStore = await Seller.findOne({ userId });
  if (existingStore) {
    throw new ApiError(409, "You already have seller store");
  }
  const newStore = await Seller.create({
    storeName,
    storeDescription,
    user: userId,
  });

  return newStore;
};
