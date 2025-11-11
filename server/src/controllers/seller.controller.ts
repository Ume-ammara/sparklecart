import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { becomeASellerService } from "../services/seller.service.js";
import { becomeAsellerSchema } from "../schemas/seller.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const becomeASellerController = asyncHandler(async (req: Request, res: Response) => {
  
  const { data } = becomeAsellerSchema.safeParse({ ...req.body, userId: req.user?._id });
  console.log("Store data", data);
  const sellerStore = await becomeASellerService(data);

  return res
    .status(201)
    .json(new ApiResponse(201, "Seller store created successfully", { sellerStore }));
});

export const createProductController = asyncHandler(async (req: Request, res: Response) => {});

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
