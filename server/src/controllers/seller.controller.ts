import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  becomeASellerService,
  createProductService,
  deleteAllSellerProductsService,
  deleteProductByIdService,
  getAllSellerProductsService,
  getProductByIdService,
  updateAllProductsService,
  updateProductByIdService,
} from "../services/seller.service.js";
import {
  becomeAsellerSchema,
  createProductSchema,
  updateAllProductsSchema,
  updateProductByIdSchema,
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
  const body = {
    ...req.body,
    slug: req.body.slug?.trim(),
    name: req.body.name?.trim(),
    description: req.body.description?.trim(),
    category: req.body.category?.trim(),
    price: Number(req.body.price),
    quantity: Number(req.body.quantity),
    brand: {
      slug: req.body.brand?.slug?.trim(),
      name: req.body.brand?.name?.trim(),
      description: req.body.brand?.description?.trim(),
      country: req.body.brand?.country?.trim(),
    },
  };

  const files = req.files as Express.Multer.File[];
  const { data } = createProductSchema.safeParse({ ...body, userId: req.user?._id });
  console.log("IMAGES : ", files);
  const product = await createProductService(data, files);

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
  const productId = req.params.id;
  const product = await getProductByIdService(productId);
  res.status(200).json(new ApiResponse(200, "Product fetched successfully", { product }));
});

export const updateProductByIdController = asyncHandler(async (req: Request, res: Response) => {
  console.log("UPDATE BOYD : ", req.body);

  const productId = req.params.id;

  const body = {
    slug: req.body.slug?.trim(),
    name: req.body.name?.trim(),
    description: req.body.description?.trim(),
    category: req.body.category?.trim(),

    price: req.body.price !== undefined ? Number(req.body.price) : undefined,
    quantity: req.body.quantity !== undefined ? Number(req.body.quantity) : undefined,

    userId: req.user!._id,
  };

  const files = req.files as Express.Multer.File[] | undefined;

  const parsed = updateProductByIdSchema.safeParse(body);

  const product = await updateProductByIdService(parsed.data, files, productId);

  res.status(200).json(new ApiResponse(200, "Product updated successfully", { product }));
});

export const deleteProductByIdController = asyncHandler(async (req: Request, res: Response) => {
  const sellerId = req.user.sellerId;
  const productId = req.params.id;
  await deleteProductByIdService(sellerId, productId);

  res.status(200).json(new ApiResponse(200, "Product deleted successfully"));
});
