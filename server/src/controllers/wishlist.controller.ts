import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { addToWishlistSchema, removeFromWishlistSchema } from "../schemas/wishlist.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { addToWishlistService, removeFromWishlistService } from "../services/wishlist.service.js";

export const addToWishlistController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = addToWishlistSchema.safeParse({ ...req.body, userId: req.user._id });

  const wishlistProduct = await addToWishlistService(data);
  return res
    .status(201)
    .json(new ApiResponse(200, "Product added to wishlist successfully", { wishlistProduct }));
});

export const removeFromWishlistController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = removeFromWishlistSchema.safeParse({ ...req.body, userId: req.user._id });

  const updateWishlist = await removeFromWishlistService(data);

  return res
    .status(200)
    .json(new ApiResponse(200, "Product removed from wishlist successfully", { updateWishlist }));
});
