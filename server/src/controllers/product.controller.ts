import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAllProductsService } from "../services/product.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { productQuerySchema } from "../schemas/product.schema.js";

export const getAllProductsController = asyncHandler(async (req: Request, res: Response) => {
  const parsed = productQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid query parameters", { errors: parsed.error }));
  }

  const products = await getAllProductsService(parsed.data);

  res.status(200).json(new ApiResponse(200, "Products fetched successfully", { products }));
});

export const getProductBySlugController = asyncHandler(async (req: Request, res: Response) => {});

export const getAllProductsByBrandController = asyncHandler(
  async (req: Request, res: Response) => {}
);
