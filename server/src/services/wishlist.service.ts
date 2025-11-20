import { User } from "../models/user.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import { AddToWishlistInput, RemoveFromWishlistInput } from "../schemas/wishlist.schema.js";
import { ApiError } from "../utils/ApiError.js";

export const addToWishlistService = async ({ userId, productId }: AddToWishlistInput) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(403, "User not found");
  }
  const wishlistProduct = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $addToSet: { products: productId } },
    { new: true, upsert: true }
  );

  return wishlistProduct;
};

export const removeFromWishlistService = async ({ userId, productId }: RemoveFromWishlistInput) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(403, "User not found");
  }
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { products: productId } },
    { new: true }
  );

  return wishlist;
};
