import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.model.js";
import { USER_ROLES } from "../constants/user.constant.js";

import { BecomeASellerDTO, CreateProductDTO } from "../schemas/seller.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

export const becomeASellerService = async ({ name, description, userId }: BecomeASellerDTO) => {
  logger.info(`Create seller store service called for user: ${userId}`);

  const existingStore = await Seller.findOne({ userId });

  if (existingStore) {
    logger.warn(`User: ${userId} already has a seller store`);
    throw new ApiError(409, "You already have seller store");
  }
  const store = await Seller.create({
    name,
    description,
    user: userId,
  });

  let user = await User.findById(userId);

  if (user) {
    user.role = USER_ROLES.SELLER;
    user = await user.save();
    logger.info(`User: ${userId} marked as seller`);
  }

  logger.info(`Seller store created successfully for user: ${userId}`);

  return { user, store };
};

export const createProductService = async ({
  name,
  description,
  price,
  quantity,
  category,
  images,
  userId,
}: CreateProductDTO) => {};

export const getAllSellerProductsService = async (userId: string) => {};

export const deleteAllSellerProductsService = async (userId: string) => {};
