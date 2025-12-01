import { GetAllOrdersByUserDTO, GetOrderByIdDTO } from "../schemas/order.schema.js";

export const getAllOrdersByUserService = async ({ userId }: GetAllOrdersByUserDTO) => {};

export const getOrderByIdService = async ({ userId, orderId }: GetOrderByIdDTO) => {};
