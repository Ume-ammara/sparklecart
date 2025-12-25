import { Seller } from "../models/seller.model.js";
import { User } from "../models/user.model.js";
import { USER_ROLES } from "../constants/user.constant.js";

import {
  BecomeASellerDTO,
  CreateProductDTO,
  updateAllProductsDTO,
  updateProductDTO,
} from "../schemas/seller.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { cookieOptions } from "../config/cookie.config.js";
import { Brand } from "../models/brand.model.js";
import { uploadOnCloudinary } from "../config/cloudinary.config.js";

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

export const createProductService = async (
  { slug, name, description, price, quantity, category, images, brand, userId }: CreateProductDTO,
  files: Express.Multer.File[]
) => {
  logger.info(`Checking seller store for user: ${userId}`);

  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    logger.error(`No seller store found for user: ${userId}`);
    throw new ApiError(401, "You are not registered as a seller");
  }

  const slugExists = await Product.findOne({ slug });

  if (slugExists) {
    throw new ApiError(409, "Product with this slug already exists");
  }

  let productCategory = await Category.findOne({ name: category });

  if (!productCategory) {
    productCategory = await Category.create({ name: category });
  }

  let productBrand = await Brand.findOne({ slug: brand.slug });

  if (!productBrand) {
    productBrand = await Brand.create(brand);
  }

  const product = await Product.create({
    slug,
    name,
    description,
    price,
    quantity,
    category: productCategory._id,
    images,
    brand: productBrand._id,
    seller: seller._id,
  });

  let imageUrls = [];
  for (let img of files) {
    const url = await uploadOnCloudinary(img.path);
    imageUrls.push(url);
  }

  await product.images.push(...imageUrls);
  await product.save();

  logger.info(`Product created successfully for seller: ${seller._id}`);

  return product;
};

export const getAllSellerProductsService = async (userId: string) => {
  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    throw new ApiError(401, "You are not registered as a seller");
  }

  const products = await Product.find({ seller: seller._id })
    .populate("category", "name")
    .populate("brand", "slug name description country")
    .populate("seller", "_id name description createdAt updatedAt");

  logger.info(`Fetched products for seller: ${seller._id}`);
  return products;
};

export const deleteAllSellerProductsService = async (userId: string, sellerId: string) => {
  logger.info(`Deleting all products for seller: ${sellerId}`);
  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    logger.error(`No seller store found for user: ${userId}`);
    throw new ApiError(401, "You are not registered as a seller");
  }

  await Product.deleteMany({ seller: sellerId });
  logger.info(`All products deleted for seller: ${sellerId}`);
};

export const updateAllProductsService = async ({
  slug,
  name,
  description,
  price,
  quantity,
  category,
  images,
  userId,
}: updateAllProductsDTO) => {
  logger.info(`Updating all products for seller with user: ${userId}`);
  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    logger.error(`No seller store found for user: ${userId}`);
    throw new ApiError(401, "You are not registered as a seller");
  }

  const slugExists = await Product.findOne({ slug });

  if (slugExists) {
    logger.error(`Product slug conflict for seller with user: ${userId}`);
    throw new ApiError(409, "Product with this slug already exists");
  }

  let productCategory = await Category.findOne({ name: category });

  if (!productCategory) {
    productCategory = await Category.create({ name: category });
  }

  const updateProducts = await Product.updateMany(
    { seller: seller._id },
    {
      $set: {
        slug,
        name,
        description,
        price,
        quantity,
        category: productCategory,
        images,
      },
    }
  );
  logger.info(`All products updated for seller with user: ${userId}`);

  return updateProducts;
};

export const getProductByIdService = async (productId: string) => {
  const product = await Product.findById(productId)
    .populate("category", "name")
    .populate("brand", "slug name description country")
    .populate("seller", "_id name description createdAt updatedAt");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return product;
};

export const updateProductByIdService = async (
  { name, description, price, quantity, category, images, userId }: updateProductDTO,
  productId: string
) => {
  const seller = await Seller.findOne({ user: userId });

  if (!seller) {
    throw new ApiError(401, "You are not registered as a seller");
  }
  let productCategory = await Category.findOne({ name: category });

  if (!productCategory) {
    productCategory = await Category.create({ name: category });
  }

  const updateProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      description,
      price,
      quantity,
      category: productCategory,
      images,
    },
    { new: true }
  );

  if (!updateProduct) {
    throw new ApiError(404, "Product not found");
  }
  return updateProduct;
};

export const deleteProductByIdService = async (sellerId: string, productId: string) => {
  logger.info(`Deleting product: ${productId} for seller: ${sellerId}`);
  const seller = await Seller.findById(sellerId);

  if (!seller) {
    logger.error(`No seller store found for seller: ${sellerId}`);
    throw new ApiError(404, "Seller not found");
  }

  await Product.findByIdAndDelete(productId);

  logger.info(`Product: ${productId} deleted successfully for seller: ${sellerId}`);
};
