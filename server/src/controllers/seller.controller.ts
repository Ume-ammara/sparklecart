import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

export const becomeASellerController = asyncHandler(async (req: Request, res: Response) => {});

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
