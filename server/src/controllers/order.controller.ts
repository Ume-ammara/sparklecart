import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getAllOrdersByUserService, getOrderByIdService } from "../services/order.service.js";
import { getAllOrdersByUserSchema, getOrderByIdSchemaSchema } from "../schemas/order.schema.js";

export const getAllOrdersByUserController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getAllOrdersByUserSchema.safeParse({ userId: req.user._id });

  const orders = await getAllOrdersByUserService(data);
  return res
    .status(200)
    .json(new ApiResponse(200, "Order for user fetched successfully", { orders }));
});

export const getOrderByIdController = asyncHandler(async (req: Request, res: Response) => {
  const { data } = getOrderByIdSchemaSchema.safeParse({
    userId: req.user._id,
    orderId: req.params.orderId,
  });
  const order = await getOrderByIdService(data);
  return res
    .status(200)
    .json(new ApiResponse(200, "Order with orderId fetched successfull", { order }));
});
