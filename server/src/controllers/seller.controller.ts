import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { becomeASellerService, createProductService } from "../services/seller.service.js";
import { becomeAsellerSchema, createProductSchema } from "../schemas/seller.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const becomeASellerController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = becomeAsellerSchema.safeParse({ ...req.body, userId: req.user?._id });

  const { user, store } = await becomeASellerService(data);

  return res
    .status(201)
    .json(new ApiResponse(201, "Seller store created successfully", { user, store }));
});

export const createProductController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = createProductSchema.safeParse({ ...req.body, userId: req.user?._id });

  const product = await createProductService(data);

  res.status(201).json(new ApiResponse(201, "Product created successfully ", { product }));
});

export const getAllSellerProductsController = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const deleteAllSellerProductsController = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const updateAllProductsController = asyncHandler(async (req: Request, res: Response) => {});
export const getProductByIdController = asyncHandler(async (req: Request, res: Response) => {});
export const updateProductByIdController = asyncHandler(async (req: Request, res: Response) => {});

export const deleteProductByIdController = asyncHandler(async (req: Request, res: Response) => {});
