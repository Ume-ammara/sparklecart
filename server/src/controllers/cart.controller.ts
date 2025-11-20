import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { addToCartProductSchema, getAllCartItemsSchema } from "../schemas/cart.schema.js";

export const getAllCartItemsController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getAllCartItemsSchema.safeParse({ userId: req.user._id });
});
export const addToCartProductController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = addToCartProductSchema.safeParse({ ...req.body, userId: req.user._id });
});

export const removeToCartProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const { data } = addToCartProductSchema.safeParse({ ...req.body, userId: req.user._id });
  }
);
export const clearCartController = asyncHandler(async (req: Request, res: Response) => {});
