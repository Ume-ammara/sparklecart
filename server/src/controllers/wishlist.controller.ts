import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  addToWishlistSchema,
  getAllWishlistSchema,
  removeFromWishlistSchema,
} from "../schemas/wishlist.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  addToWishlistService,
  clearWishlistService,
  getAllWishlistService,
  removeFromWishlistService,
} from "../services/wishlist.service.js";

export const getAllWishlistController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getAllWishlistSchema.safeParse({ userId: req.user._id });
  const wishlist = await getAllWishlistService(data);
  return res.status(200).json(new ApiResponse(200, "Wishlist fetched successfully", { wishlist }));
});

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

export const clearWishlistController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getAllWishlistSchema.safeParse({ userId: req.user._id });

  await clearWishlistService(data);

  return res.status(200).json(new ApiResponse(200, "Wishlist cleared successfully"));
});
