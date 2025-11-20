import z from "zod";

export const addToCartProductSchema = z.object({
  userId: z.string().nonempty("User id is required"),
  productId: z.string().nonempty("Prodcut id is required"),
  quantity: z.number().min(1, "invalid quantity"),
});

export const getAllCartItemsSchema = z.object({
  userId: z.string().nonempty("User id is required"),
});

export const removeCartProductSchema = z.object({
  userId: z.string().nonempty("User id is required"),
  productId: z.string().nonempty("Prodcut id is required"),
});

export const clearCartItemsSchema = z.object({
  userId: z.string().nonempty("User id is required"),
});

export type AddToCartProductDTO = z.infer<typeof addToCartProductSchema>;
export type GetAllCartItemsDTO = z.infer<typeof getAllCartItemsSchema>;
export type RemoveCartProductDTO = z.infer<typeof removeCartProductSchema>;
export type ClearCartItemsDTO = z.infer<typeof clearCartItemsSchema>;
