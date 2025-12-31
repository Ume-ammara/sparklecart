import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  addToCartSchema,
  clearCartItemsSchema,
  getAllCartItemsSchema,
  removeFromCartSchema,
  updateCartQuantitySchema,
} from "../schemas/cart.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  addToCartService,
  clearCartItemsService,
  getAllCartItemsService,
  removeFromCartService,
  updateCartQuantityService,
} from "../services/cart.service.js";

export const getAllCartItemsController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getAllCartItemsSchema.safeParse({ userId: req.user._id });

  const cartItems = await getAllCartItemsService(data);

  return res
    .status(200)
    .json(new ApiResponse(200, "Cart items fetched successfully", { cartItems }));
});
export const addToCartController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = addToCartSchema.safeParse({ ...req.body, userId: req.user._id });

  const cart = await addToCartService(data);

  return res.status(201).json(new ApiResponse(201, "Product added to cart successfully", { cart }));
});

export const removeFromCartController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = removeFromCartSchema.safeParse({
    cartItemId: req.params.cartItemId,
    userId: req.user._id,
  });

  await removeFromCartService(data);

  return res.status(200).json(new ApiResponse(200, "Product removed from cart successfully"));
});
export const clearCartController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = clearCartItemsSchema.safeParse({ userId: req.user._id });

  await clearCartItemsService(data);

  return res.status(200).json(new ApiResponse(200, "Cart cleared successfully"));
});

export const updateCartQuantityController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = updateCartQuantitySchema.safeParse({
    userId: req.user._id,
    cartItemId: req.params.cartItemId,
    quantity: Number(req.body.quantity),
  });

  const cartItem = await updateCartQuantityService(data);

  res.status(200).json(
    new ApiResponse(200, "Cart updated successfully", {
      cartItem,
    })
  );
});
