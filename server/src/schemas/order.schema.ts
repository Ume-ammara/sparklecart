import { z } from "zod";

export const getAllOrdersByUserSchema = z.object({
  userId: z.string().nonempty("User id is required"),
});

export const getOrderByIdSchemaSchema = z.object({
  userId: z.string().nonempty("User id is required"),
  orderId: z.string().nonempty("Order id is required"),
});

export type GetAllOrdersByUserDTO = z.infer<typeof getAllOrdersByUserSchema>;
export type GetOrderByIdDTO = z.infer<typeof getOrderByIdSchemaSchema>;
