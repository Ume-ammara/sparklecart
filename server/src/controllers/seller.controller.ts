import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  becomeASellerService,
  createProductService,
  deleteAllSellerProductsService,
  getAllSellerProductsService,
  updateAllProductsService,
} from "../services/seller.service.js";
import {
  becomeAsellerSchema,
  createProductSchema,
  updateAllProductsSchema,
} from "../schemas/seller.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const becomeASellerController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = becomeAsellerSchema.safeParse({ ...req.body, userId: req.user?._id });

  const { user, store, accessToken, accessTokenOptions, refreshToken, refreshTokenOptions } =
    await becomeASellerService(data);

  return res
    .status(201)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(201, "Seller store created successfully", { user, store }));
});

export const createProductController = asyncHandler(async (req: Request, res: Response) => {
  console.log("create products", req.body);
  const { data } = createProductSchema.safeParse({ ...req.body, userId: req.user?._id });

  const product = await createProductService(data);

  res.status(201).json(new ApiResponse(201, "Product created successfully ", { product }));
});

export const getAllSellerProductsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const products = await getAllSellerProductsService(userId);

  res.status(200).json(new ApiResponse(200, "Seller products fetched successfully", { products }));
});

export const deleteAllSellerProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const sellerId = req.user?.sellerId;

    await deleteAllSellerProductsService(userId, sellerId);
    res.status(200).json(new ApiResponse(200, "Products deleted successfully"));
  }
);

export const updateAllProductsController = asyncHandler(async (req: Request, res: Response) => {
  console.log("update product", req.body);
  const { data } = updateAllProductsSchema.safeParse({ ...req.body, userId: req.user._id });
  const updateProducts = await updateAllProductsService(data);

  res.status(200).json(new ApiResponse(200, "Products update successfully", { updateProducts }));
});
export const getProductByIdController = asyncHandler(async (req: Request, res: Response) => {

});
export const updateProductByIdController = asyncHandler(async (req: Request, res: Response) => {});

export const deleteProductByIdController = asyncHandler(async (req: Request, res: Response) => {});
