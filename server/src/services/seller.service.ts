import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.model.js";
import { USER_ROLES } from "../constants/user.constant.js";

import { BecomeASellerDTO, CreateProductDTO } from "../schemas/seller.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";

export const becomeASellerService = async ({ name, description, userId }: BecomeASellerDTO) => {
  logger.info(`Create seller store service called for user: ${userId}`);

  const existingStore = await User.findOne({ userId });

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
}: CreateProductDTO) => {
  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    throw new ApiError(401, "You are not registered as a seller");
  }
  const productCategory = await Category.create({
    name,
  });
  const createProduct = await Product.create({
    name,
    description,
    price,
    quantity,
    category: productCategory._id,
    images,
    seller: seller._id,
  });

  console.log("product", createProduct);

  return createProduct;
};

export const getAllSellerProductsService = async (userId: string) => {
  const seller = await Seller.findOne({ user: userId });
  if (!seller) {
    throw new ApiError(401, "unauthorized request");
  }

  const products = await Product.find();
  return products;
};

export const deleteAllSellerProductsService = async (userId: string) => {};
