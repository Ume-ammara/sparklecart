import { User } from "../models/user.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import {
  AddToWishlistDTO,
  ClearWishlistDTO,
  GetAllWishlistDTO,
  RemoveFromWishlistDTO,
} from "../schemas/wishlist.schema.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllWishlistService = async ({ userId }: GetAllWishlistDTO) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(403, "User not found");
  }
  const wishlist = await Wishlist.findOne({ user: userId }).populate({
    path: "products",
    select: "name price images",
  });
  return wishlist;
};

export const addToWishlistService = async ({ userId, productId }: AddToWishlistDTO) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(403, "User not found");
  }
  const wishlistProduct = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { products: productId } },
    { new: true, upsert: true }
  ).populate({ path: "products", select: "name price images" });

  return wishlistProduct;
};

export const removeFromWishlistService = async ({ userId, productId }: RemoveFromWishlistDTO) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(403, "User not found");
  }

  const wishlist = await Wishlist.deleteOne({ user: userId, products: productId });

  if (wishlist.deletedCount === 0) {
    throw new ApiError(404, "Product not found in wishlist");
  }

  return;
};

export const clearWishlistService = async ({ userId }: ClearWishlistDTO) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(403, "User not found");
  }
  const wishlist = await Wishlist.deleteMany({ user: userId });

  if (wishlist.deletedCount === 0) {
    throw new ApiError(404, "Wishlist is already empty");
  }

  return;
};
