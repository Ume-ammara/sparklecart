import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.model.js";
import { USER_ROLES } from "../constants/user.constant.js";

import { BecomeASellerDTO, CreateProductDTO } from "../schemas/seller.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { cookieOptions } from "../config/cookie.config.js";
import { Brand } from "../models/brand.model.js";

export const becomeASellerService = async ({ name, description, userId }: BecomeASellerDTO) => {
  logger.info(`Create seller store service called for user: ${userId}`);

  const existingStore = await Seller.findOne({ user: userId });

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

  const accessToken = await user.generateAccessToken();
  const accessTokenOptions = cookieOptions(30);

  const refreshToken = await user.generateRefreshToken();
  const refreshTokenOptions = cookieOptions(60 * 24 * 30);

  logger.info(`Seller store created successfully for user: ${userId}`);

  return { user, store, accessToken, accessTokenOptions, refreshToken, refreshTokenOptions };
};

export const createProductService = async ({
  name,
  description,
  price,
  quantity,
  category,
  images,
  brand,
  userId,
}: CreateProductDTO) => {
  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    throw new ApiError(401, "You are not registered as a seller");
  }

  let productCategory = await Category.findOne({ name: category });

  if (!productCategory) {
    productCategory = await Category.create({ name: category });
  }

  let productBrand = await Brand.findOne({ name: brand });

  if (!productBrand) {
    productBrand = await Brand.create({ name: brand });
  }

  const createProduct = await Product.create({
    name,
    description,
    price,
    quantity,
    category: productCategory._id,
    images,
    brand: productBrand._id,
    seller: seller._id,
  });

  console.log("product", createProduct);

  return createProduct;
};

export const getAllSellerProductsService = async (userId: string) => {
  const products = await Product.find();
  return products;
};

export const deleteAllSellerProductsService = async (userId: string, sellerId: string) => {
  await Product.deleteMany({ seller: sellerId });
};
